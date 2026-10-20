
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

type CourseProgress = Record<string, string[]>;

@Injectable({
  providedIn: 'root'
})
export class LearningProgressService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly storageKey = 'sde-studio-learning-progress';

  private readonly progressState = signal<CourseProgress>(
    this.loadProgress()
  );

  readonly progress = this.progressState.asReadonly();

  
  hasCourseProgress(courseId: string): boolean {
    return Object.prototype.hasOwnProperty.call(
      this.progressState(),
      courseId
    );
  }

  initializeCourseProgress(
    courseId: string,
    initialCompletedLessonIds: string[]
  ): void {
    // Do not overwrite progress that the learner has already saved.
    if (this.hasCourseProgress(courseId)) return;

    this.updateCourseProgress(
      courseId,
      [...new Set(initialCompletedLessonIds)]
    );
  }


  /**
   * Returns completed lesson IDs for a course.
   */
  getCompletedLessonIds(courseId: string): string[] {
    return [...(this.progressState()[courseId] ?? [])];
  }

  /**
   * Checks whether a lesson is completed.
   */
  isLessonCompleted(courseId: string, lessonId: string): boolean {
    return (this.progressState()[courseId] ?? []).includes(lessonId);
  }

  /**
   * Marks a lesson as completed.
   */
  markLessonCompleted(courseId: string, lessonId: string): void {
    const currentIds = this.progressState()[courseId] ?? [];

    if (currentIds.includes(lessonId)) {
      return;
    }

    this.updateCourseProgress(courseId, [...currentIds, lessonId]);
  }

  /**
   * Marks a lesson as incomplete.
   */
  markLessonIncomplete(courseId: string, lessonId: string): void {
    const currentIds = this.progressState()[courseId] ?? [];

    this.updateCourseProgress(
      courseId,
      currentIds.filter(id => id !== lessonId)
    );
  }

  /**
   * Returns the number of completed lessons.
   */
  getCompletedCount(courseId: string): number {
    return (this.progressState()[courseId] ?? []).length;
  }

  /**
   * Calculates progress as a percentage.
   */
  getProgressPercentage(courseId: string, totalLessons: number): number {
    if (totalLessons <= 0) {
      return 0;
    }

    const completed = this.getCompletedCount(courseId);

    return Math.min(100, Math.round((completed / totalLessons) * 100));
  }

  private updateCourseProgress(
    courseId: string,
    completedLessonIds: string[]
  ): void {
    const updatedProgress = {
      ...this.progressState(),
      [courseId]: completedLessonIds
    };

    this.progressState.set(updatedProgress);
    this.saveProgress(updatedProgress);
  }

  private loadProgress(): CourseProgress {
    if (!this.isBrowser) {
      return {};
    }

    try {
      const storedValue = localStorage.getItem(this.storageKey);

      if (!storedValue) {
        return {};
      }

      const parsed: unknown = JSON.parse(storedValue);

      if (
        typeof parsed !== 'object' ||
        parsed === null ||
        Array.isArray(parsed)
      ) {
        return {};
      }

      const result: CourseProgress = {};

      for (const [courseId, lessonIds] of Object.entries(parsed)) {
        if (
          Array.isArray(lessonIds) &&
          lessonIds.every(id => typeof id === 'string')
        ) {
          result[courseId] = [...new Set(lessonIds)];
        }
      }

      return result;
    } catch {
      return {};
    }
  }

  private saveProgress(progress: CourseProgress): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(progress));
    } catch {
      // Progress remains available in memory for this session.
    }
  }
}
