import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomaliesComponent } from './index';

describe('AnomaliesComponent', () => {
  let component: AnomaliesComponent;
  let fixture: ComponentFixture<AnomaliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnomaliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnomaliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
