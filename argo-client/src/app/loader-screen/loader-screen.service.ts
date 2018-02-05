import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class LoaderScreenService {

  @Output() shown: EventEmitter<boolean> = new EventEmitter<boolean>(); 

  constructor() { }

  public show() {
    this.shown.emit(true);
  }

  public hide() {
    this.shown.emit(false);
  }
}
