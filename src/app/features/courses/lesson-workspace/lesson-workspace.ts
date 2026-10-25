
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {
  CourseDetailsComponent,
  CourseModule
} from '../course-details/course-details';
import { LearningProgressService } from '../../../core/services/learning-progress';

@Component({
  selector: 'app-lesson-workspace',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './lesson-workspace.html',
  styleUrl: './lesson-workspace.css'
})
export class LessonWorkspaceComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly progressService = inject(LearningProgressService);

  // Triggers recalculation when the course or lesson route parameters change.
  private readonly routeVersion = signal(0);

  courseId = '';
  lessonId = '';

  course = CourseDetailsComponent.findCourseById('');
  lessons: Array<{
    id: string;
    title: string;
    duration: string;
    completed: boolean;
    preview?: boolean;
    moduleId: string;
    moduleTitle: string;
  }> = [];

  currentIndex = -1;
  currentLesson: (typeof this.lessons)[number] | undefined;
  previousLesson: (typeof this.lessons)[number] | undefined;
  nextLesson: (typeof this.lessons)[number] | undefined;

  readonly completedLessonIds = computed(() => {
    this.routeVersion();
    return this.progressService.getCompletedLessonIds(this.courseId);
  });

  readonly completedLessons = computed(() => {
    this.routeVersion();

    return this.lessons.filter(lesson =>
      this.progressService.isLessonCompleted(this.courseId, lesson.id)
    ).length;
  });

  get totalLessons(): number {
    this.routeVersion();
    return this.lessons.length;
  }

  readonly progressPercentage = computed(() => {
    this.routeVersion();

    return this.progressService.getProgressPercentage(
      this.courseId,
      this.lessons.length
    );
  });

  readonly isCurrentLessonCompleted = computed(() => {
    this.routeVersion();

    return this.currentLesson
      ? this.progressService.isLessonCompleted(
          this.courseId,
          this.currentLesson.id
        )
      : false;
  });

  readonly nextIncompleteLesson = computed(() => {
    this.routeVersion();

    return this.lessons.find(lesson =>
      !this.progressService.isLessonCompleted(this.courseId, lesson.id)
    );
  });

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe(params => {
        this.courseId = params.get('id') ?? '';
        this.lessonId = params.get('lessonId') ?? '';
        this.refreshRouteState();
      });
  }

private refreshRouteState(): void {
  this.course = CourseDetailsComponent.findCourseById(this.courseId);

  if (!this.course) {
    void this.router.navigate(['/courses']);
    return;
  }

  // Initialize demo progress only when no saved progress exists.
  const initialCompletedIds = this.course.modules
    .flatMap(module => module.lessons)
    .filter(lesson => lesson.completed)
    .map(lesson => lesson.id);

  this.progressService.initializeCourseProgress(
    this.courseId,
    initialCompletedIds
  );

  this.lessons = this.course.modules.flatMap(module =>
    module.lessons.map(lesson => ({
      ...lesson,
      moduleId: module.id,
      moduleTitle: module.title
    }))
  );

  this.currentIndex = this.lessons.findIndex(
    lesson => lesson.id === this.lessonId
  );

  // /courses/:id/learn opens the first incomplete lesson.
  if (!this.lessonId) {
    const firstIncomplete = this.lessons.find(
      lesson => !this.progressService.isLessonCompleted(
        this.courseId,
        lesson.id
      )
    );

    const targetLesson = firstIncomplete ?? this.lessons[0];

    if (targetLesson) {
      this.navigateToLesson(targetLesson.id);
    } else {
      void this.router.navigate(['/courses', this.courseId]);
    }

    return;
  }

  if (this.currentIndex < 0) {
    void this.router.navigate(['/courses', this.courseId]);
    return;
  }

  this.currentLesson = this.lessons[this.currentIndex];

  this.previousLesson = this.currentIndex > 0
    ? this.lessons[this.currentIndex - 1]
    : undefined;

  this.nextLesson = this.currentIndex < this.lessons.length - 1
    ? this.lessons[this.currentIndex + 1]
    : undefined;

  this.routeVersion.update(version => version + 1);
}


  isLessonCompleted(lessonId: string): boolean {
    return this.progressService.isLessonCompleted(this.courseId, lessonId);
  }

  markCurrentLessonComplete(): void {
    if (!this.currentLesson) return;

    this.progressService.markLessonCompleted(
      this.courseId,
      this.currentLesson.id
    );
  }

  markCurrentLessonIncomplete(): void {
    if (!this.currentLesson) return;

    this.progressService.markLessonIncomplete(
      this.courseId,
      this.currentLesson.id
    );
  }

  toggleCurrentLessonCompletion(): void {
    if (!this.currentLesson) return;

    if (this.isCurrentLessonCompleted()) {
      this.markCurrentLessonIncomplete();
    } else {
      this.markCurrentLessonComplete();
    }
  }

  goToPreviousLesson(): void {
    if (this.previousLesson) {
      this.navigateToLesson(this.previousLesson.id);
    }
  }

  goToNextLesson(): void {
    if (this.nextLesson) {
      this.navigateToLesson(this.nextLesson.id);
    }
  }

  continueLearning(): void {
    const lesson = this.nextIncompleteLesson();

    if (lesson) {
      this.navigateToLesson(lesson.id);
    } else {
      void this.router.navigate(['/courses', this.courseId]);
    }
  }

  navigateToLesson(lessonId: string): void {
    void this.router.navigate([
      '/courses',
      this.courseId,
      'learn',
      lessonId
    ]);
  }

  getModuleLessonCount(moduleId: string): number {
    return this.lessons.filter(
      lesson => lesson.moduleId === moduleId
    ).length;
  }

  getModuleCompletedCount(moduleId: string): number {
    return this.lessons.filter(
      lesson =>
        lesson.moduleId === moduleId &&
        this.isLessonCompleted(lesson.id)
    ).length;
  }

  get courseModules(): CourseModule[] {
    return this.course?.modules ?? [];
  }

  get currentModuleTitle(): string {
    return this.currentLesson?.moduleTitle ?? '';
  }

  get lessonPositionLabel(): string {
    if (!this.currentLesson || this.totalLessons === 0) return '';

    return `Lesson ${this.currentIndex + 1} of ${this.totalLessons}`;
  }
}

export { LessonWorkspaceComponent as LessonWorkspace };
