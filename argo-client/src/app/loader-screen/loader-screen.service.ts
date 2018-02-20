import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class LoaderScreenService {
  @Output() shown: EventEmitter<boolean> = new EventEmitter<boolean>(); 

  private shownCounter = 0;

  constructor() { }

  public show() {
    if (this.shownCounter == 0)
      this.shown.emit(true);
    this.shownCounter++;
  }

  public hide() {
    if (this.shownCounter == 1)
      this.shown.emit(false);
    this.shownCounter--;
  }
}
