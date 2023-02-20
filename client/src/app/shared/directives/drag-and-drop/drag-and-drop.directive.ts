import { Directive, Output, EventEmitter, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {
  @Output() filesDropped = new EventEmitter<any>();

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('dragover', ['$event']) dragover(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.renderer.setStyle(this.elRef.nativeElement, 'opacity', '0.1');
  }

  @HostListener('dragleave', ['$event']) dragleave(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.renderer.setStyle(this.elRef.nativeElement, 'opacity', '1');
  }

  @HostListener('drop', ['$event']) drop(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.renderer.setStyle(this.elRef.nativeElement, 'opacity', '1');
    let files = event?.dataTransfer?.files;
    if (files?.length) {
      this.filesDropped.emit(files);
    }
  }

}
