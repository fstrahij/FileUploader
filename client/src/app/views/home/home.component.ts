import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FileUploaderComponent } from '../../shared/components/file-uploader/file-uploader.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    this.dialog.open(FileUploaderComponent);
  }

}
