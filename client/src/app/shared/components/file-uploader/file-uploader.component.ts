import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { FileUploaderService } from '../../../services/file-uploader/file-uploader.service';
import { ProgressInfo } from '../../../interfaces/progress-info';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  cancelUploads$: any[] = [];

  files: File[] = [];
  progressInfos: any[] = [];
  isImportMode = false;
  isAllErrorUploads = false;

  constructor(private fileUploaderService: FileUploaderService) { }

  ngOnInit(): void {
  }

  addFile(data: any){
    const files = data?.target?.files ? data.target.files : data;

    for (let file of files) {
      this.files = [...this.files, file];
    }    

    console.info('Added files', this.files);
  }

  import(){
    if (!this.files.length) { return; }

    console.log('Importing files start');

    for(let i = 0; i < this.files.length; i++){
      this.upload(i, this.files[i]);
    }

    this.isImportMode = true;

    console.log('Importing files done');
  }

  // method retry upload all files or one at index 
  retryUpload(index?: number){
    (index === null || index === undefined) ? this.import() : this.upload(index, this.files[index]);
  }

  cancelUpload(index: number){
    const info =  this.progressInfos[ index ];
    if (info.value === 100 || info.isError === true) { return; }

    console.log(`${this.progressInfos[ index ].fileName} cancel uploading`);

    this.cancelUploads$[ index ].next(null);
    info.isError = true;
  }

  private upload(index: number, file: File){
    this.progressInfos[ index ] = this.fileUploaderService.getNewProgressInfo(0, file.name, file.size);
    this.cancelUploads$[ index ] = new Subject();
    this.isAllErrorUploads = false;
    console.log(`${file.name} start uploading...`);

    this.fileUploaderService.upload(file)
      .pipe(
        takeUntil(this.destroyed$ && this.cancelUploads$[ index ]),
        catchError(error =>{
          console.info('Error response', error);
          this.progressInfos[ index ].isError = true;
          this.setIsAllErrorUploads();
          return throwError(error);
        })
      )
      .subscribe( event => {
        if (event?.type === HttpEventType.UploadProgress) {
          const total = event.total || 1;
          this.progressInfos[ index ].value = Math.round( 100 * event.loaded / total );
        }else if (event instanceof HttpResponse) {
          console.log('file uploaded success ' + file.name);
        }
      }); 

  }

  // checks if all files have errors to set retry all
  private setIsAllErrorUploads(){
    const info = this.progressInfos.find(info=>{ return info.isError === false; });
    if(!info){
      this.isAllErrorUploads = true;
    };
  }

  ngOnDestroy(): void{
    this.destroyed$.next(null);
    this.destroyed$.complete();  

    for(let cancelUpload$ of this.cancelUploads$){
      cancelUpload$.complete();
    }  
  }

}
