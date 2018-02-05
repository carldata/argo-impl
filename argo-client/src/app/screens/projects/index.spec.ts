import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsScreen } from './index';

describe('ProjectsScreen', () => {
  let component: ProjectsScreen;
  let fixture: ComponentFixture<ProjectsScreen>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsScreen ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
