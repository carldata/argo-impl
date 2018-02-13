import { Component } from '@angular/core';
import * as styles from '../sass/styles.scss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}

console.log(styles.greeting);