import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { INCREMENT, DECREMENT, RESET, RESET_START } from './reducer';
import { IAppState } from '../../model/app-state';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  count$: Observable<number>;
  
    constructor(private store: Store<IAppState>, private http: HttpClient) {
      this.count$ = store.pipe(select((store) => store.count));
    }
  
    increment() {
      this.store.dispatch({ type: INCREMENT });
    }
  
    decrement(){
      this.store.dispatch({ type: DECREMENT });
    }
  
    resetAsync(){
      this.store.dispatch({ type: RESET_START });
    }

  ngOnInit() {
  }

}
