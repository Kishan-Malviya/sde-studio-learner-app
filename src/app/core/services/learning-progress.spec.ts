import { TestBed } from '@angular/core/testing';
import { LearningProgress } from './learning-progress';

describe('LearningProgress', () => {
  let service: LearningProgress;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningProgress);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
