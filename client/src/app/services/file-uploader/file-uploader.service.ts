import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProgressInfo } from '../../interfaces/progress-info';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    const api = environment.api.files;
    
    formData.append('file', file);

    const request = new HttpRequest('POST', api, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(request);
  }

  getNewProgressInfo(value: number, fileName: string, fileSize: number, isError: boolean = false): ProgressInfo{
    return {
      value,
      fileName,
      fileSize,
      isError
    };
  }
}
