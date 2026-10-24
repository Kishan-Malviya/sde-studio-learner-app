import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing/landing-page';
import { LearnerLayoutComponent } from './layout/learner-layout/learner-layout';
import { LearnerPageComponent } from './layout/learner-page/learner-page';
import { DashboardComponent } from './features/dashboard/dashboard';
import { CourseCatalogComponent } from './features/courses/course-catalog/course-catalog';
import { CourseDetailsComponent } from './features/courses/course-details/course-details';
import { LessonWorkspaceComponent } from './features/courses/lesson-workspace/lesson-workspace';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: '',
    component: LearnerLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'my-learning',
        component: LearnerPageComponent,
        data: {
          title: 'My Learning',
          description: 'Access your enrolled courses and resume your lessons.',
        },
      },
      {
        path: 'courses',
        component: CourseCatalogComponent,
        data: {
          title: 'Explore Courses',
          description: 'Discover and explore available courses.'
        }
      },
      {
        path: 'courses/:id',
        component: CourseDetailsComponent,
        data: {
          title: 'Course Details',
          description: 'Explore course content and your learning progress.'
        }
      },
      {
        path: 'courses/:id/learn/:lessonId',
        component: LessonWorkspaceComponent,
        data: {
          title: 'Lesson Workspace',
          description: 'Continue learning and track your course progress.'
        }
      },
      {
        path: 'courses/:id/learn',
        component: LessonWorkspaceComponent,
        data: {
          title: 'Course Review',
          description: 'Review your course lessons and progress.'
        }
      },
      {
        path: 'learning-track',
        component: LearnerPageComponent,
        data: {
          title: 'Learning Track',
          description: 'Organize your learning journey and milestones.',
        },
      },
      {
        path: 'notes',
        component: LearnerPageComponent,
        data: {
          title: 'My Notes',
          description: 'Keep your lesson notes organized in one place.',
        },
      },
      {
        path: 'bookmarks',
        component: LearnerPageComponent,
        data: {
          title: 'Bookmarks',
          description: 'Revisit lessons and resources you have saved.',
        },
      },
      {
        path: 'achievements',
        component: LearnerPageComponent,
        data: {
          title: 'Achievements',
          description: 'Celebrate your learning progress and milestones.',
        },
      },
      {
        path: 'owner',
        component: LearnerPageComponent,
        data: {
          title: 'Administation',
          description: 'Manage your learner contents.',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
