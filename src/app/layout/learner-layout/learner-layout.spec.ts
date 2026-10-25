import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { LearnerLayout } from './learner-layout';

describe('LearnerLayout', () => {
  let component: LearnerLayout;
  let fixture: ComponentFixture<LearnerLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnerLayout, RouterTestingModule],
      providers: [
        {
          provide: BreakpointObserver,
          useValue: {
            observe: () => of({ matches: false }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnerLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
