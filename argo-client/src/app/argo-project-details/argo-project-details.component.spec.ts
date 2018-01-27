import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgoProjectDetailsComponent } from './argo-project-details.component';

describe('ArgoProjectDetailsComponent', () => {
  let component: ArgoProjectDetailsComponent;
  let fixture: ComponentFixture<ArgoProjectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArgoProjectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgoProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
