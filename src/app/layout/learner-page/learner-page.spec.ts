import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearnerPage } from './learner-page';

describe('LearnerPage', () => {
  let component: LearnerPage;
  let fixture: ComponentFixture<LearnerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnerPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnerPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
