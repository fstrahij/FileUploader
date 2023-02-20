import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { FileUploaderComponent } from './shared/components/file-uploader/file-uploader.component';
import { FileUploaderService } from './services/file-uploader/file-uploader.service';
import { DragAndDropDirective } from './shared/directives/drag-and-drop/drag-and-drop.directive';
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
