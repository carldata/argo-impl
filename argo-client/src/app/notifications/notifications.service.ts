import { Injectable, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class NotificationsService {
  constructor(private toasterService: ToasterService) { }
  
  public notify(type: "success"|"warning"|"error", message: string) {
    this.toasterService.pop(type, type, message);    
  }
}
