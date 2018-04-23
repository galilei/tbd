import { Component, ElementRef, ViewChild, OnInit, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  private config = {
    charCounterCount: false,
    placeholderText: '',
    heightMin: 100,
    heightMax: 100,
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', '|', 'undo', 'redo'],
    // toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo'],
  };

  @HostBinding('style.height')
  private height: number;

  private content;

  constructor(private el: ElementRef) { }

  @HostListener('window:resize', ['$event.target'])
  onResize() {
    this._configureSize();
  }

  ngOnInit() {
    this.config.heightMax = this.el.nativeElement.offsetHeight;
    this.config.heightMin = this.el.nativeElement.offsetHeight;
  }

  _configureSize() {
    this.config.heightMax = this.el.nativeElement.offsetHeight;
    this.config.heightMin = this.el.nativeElement.offsetHeight;
  }

}
