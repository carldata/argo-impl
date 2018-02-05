import { Component, OnInit } from '@angular/core';
import { ToasterConfig  } from 'angular2-toaster';
import { ToasterModule, ToasterService } from 'angular2-toaster';
 
@Component({
  selector: 'app-notifications',
  template: '<toaster-container [toasterconfig]="config"></toaster-container>']
})
export class NotificationsComponent implements OnInit {
  
  public config: ToasterConfig = new ToasterConfig({
    animation: 'fade',
    newestOnTop: true,
    limit: 1,
    preventDuplicates: true,
    mouseoverTimerStop: true,
    tapToDismiss: true,
    timeout: 5000,
    positionClass: "toast-top-center"
  });

  constructor() { }

  ngOnInit() {
  }
}
