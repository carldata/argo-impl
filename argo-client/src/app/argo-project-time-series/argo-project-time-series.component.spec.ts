import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgoProjectTimeSeriesComponent } from './argo-project-time-series.component';

describe('ArgoProjectTimeSeriesComponent', () => {
  let component: ArgoProjectTimeSeriesComponent;
  let fixture: ComponentFixture<ArgoProjectTimeSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArgoProjectTimeSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgoProjectTimeSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
