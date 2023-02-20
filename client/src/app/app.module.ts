import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './views/home/home.component';
import { FileUploaderComponent } from './shared/components/file-uploader/file-uploader.component';
import { FileUploaderService } from './services/file-uploader/file-uploader.service';
import { DragAndDropDirective } from './shared/directives/drag-and-drop/drag-and-drop.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormatBytesPipe } from './shared/pipes/format-bytes/format-bytes.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FileUploaderComponent,
    DragAndDropDirective,
    FormatBytesPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
