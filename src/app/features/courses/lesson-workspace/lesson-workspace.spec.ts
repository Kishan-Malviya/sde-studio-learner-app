import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonWorkspace } from './lesson-workspace';

describe('LessonWorkspace', () => {
  let component: LessonWorkspace;
  let fixture: ComponentFixture<LessonWorkspace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonWorkspace],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonWorkspace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
