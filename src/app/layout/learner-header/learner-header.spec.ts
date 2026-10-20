import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearnerHeader } from './learner-header';

describe('LearnerHeader', () => {
  let component: LearnerHeader;
  let fixture: ComponentFixture<LearnerHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnerHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnerHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
