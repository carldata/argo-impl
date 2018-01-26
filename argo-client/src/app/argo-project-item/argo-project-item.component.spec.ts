import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgoProjectItemComponent } from './argo-project-item.component';

describe('ArgoProjectItemComponent', () => {
  let component: ArgoProjectItemComponent;
  let fixture: ComponentFixture<ArgoProjectItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArgoProjectItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgoProjectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
