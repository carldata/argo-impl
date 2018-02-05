import { Component, OnInit } from '@angular/core';
import { LoaderScreenService } from './loader-screen.service';

@Component({
  selector: 'app-loader-screen',
  templateUrl: './loader-screen.component.html',
  styleUrls: ['./loader-screen.component.css']
})
export class LoaderScreenComponent implements OnInit {
  private showLoaderDiv: boolean = false;

  constructor(private loaderScreenService: LoaderScreenService) { 
    this.loaderScreenService.shown.subscribe(show => this.showLoaderDiv = show);
  }

  ngOnInit() {
  }
}
