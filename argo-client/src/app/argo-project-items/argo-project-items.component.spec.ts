import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgoProjectItemsComponent } from './argo-project-items.component';

describe('ArgoProjectItemsComponent', () => {
  let component: ArgoProjectItemsComponent;
  let fixture: ComponentFixture<ArgoProjectItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArgoProjectItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgoProjectItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
