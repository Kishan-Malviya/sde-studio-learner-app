import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { LearnerPage } from './learner-page';

describe('LearnerPage', () => {
  let component: LearnerPage;
  let fixture: ComponentFixture<LearnerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnerPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: {} },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnerPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
