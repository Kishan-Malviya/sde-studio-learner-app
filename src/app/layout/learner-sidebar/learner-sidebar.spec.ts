import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LearnerSidebar } from './learner-sidebar';

describe('LearnerSidebar', () => {
  let component: LearnerSidebar;
  let fixture: ComponentFixture<LearnerSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnerSidebar, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnerSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
