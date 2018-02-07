import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectScreen } from './index';

describe('ScreenComponent', () => {
  let component: ProjectScreen;
  let fixture: ComponentFixture<ProjectScreen>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectScreen ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
