import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface LearningCourse {
  id: number;
  title: string;
  category: string;
  instructor: string;
  icon: string;
  iconBackground: string;
  iconColor: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  currentLesson: string;
  lastAccessed: string;
}

interface LearningActivity {
  title: string;
  course: string;
  time: string;
  icon: string;
  completed: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  readonly stats = [
    {
      label: 'Enrolled Courses',
      value: 4,
      icon: 'menu_book',
      background: '#f5f7f8',
      color: '#4f46e5',
      caption: 'Courses in progress',
    },
    {
      label: 'Completed Lessons',
      value: 28,
      icon: 'task_alt',
      background: '#f5f7f8',
      color: '#15803d',
      caption: 'Keep it going!',
    },
    {
      label: 'Learning Hours',
      value: 36,
      icon: 'schedule',
      background: '#f5f7f8',
      color: '#b45309',
      caption: 'Total study time',
    },
    {
      label: 'Day Streak',
      value: 7,
      icon: 'local_fire_department',
      background: '#f5f7f8',
      color: '#ea580c',
      caption: 'Days of consistent learning',
    },
  ];

  readonly courses: LearningCourse[] = [
    {
      id: 1,
      title: 'Java Fundamentals',
      category: 'BACKEND DEVELOPMENT',
      instructor: 'sde-studio Academy',
      icon: 'code',
      iconBackground: '#f5f7f8',
      iconColor: '#4f46e5',
      progress: 68,
      completedLessons: 17,
      totalLessons: 25,
      currentLesson: 'Java Collections Framework',
      lastAccessed: 'Continue where you left off',
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      category: 'PROBLEM SOLVING',
      instructor: 'sde-studio Academy',
      icon: 'account_tree',
      iconBackground: '#f5f7f8',
      iconColor: '#15803d',
      progress: 42,
      completedLessons: 10,
      totalLessons: 24,
      currentLesson: 'Two Pointer Technique',
      lastAccessed: 'Pick up your practice',
    },
    {
      id: 3,
      title: 'Spring Boot Essentials',
      category: 'BACKEND DEVELOPMENT',
      instructor: 'sde-studio Academy',
      icon: 'layers',
      iconBackground: '#f5f7f8',
      iconColor: '#b45309',
      progress: 25,
      completedLessons: 5,
      totalLessons: 20,
      currentLesson: 'Building REST APIs',
      lastAccessed: 'Continue your course',
    },
  ];

  readonly weeklyGoal = {
    completedHours: 5.5,
    targetHours: 8,
  };

  readonly activities: LearningActivity[] = [
    {
      title: 'Completed: HashMap Internals',
      course: 'Java Fundamentals',
      time: 'Today',
      icon: 'check_circle',
      completed: true,
    },
    {
      title: 'Studied: Two Pointer Technique',
      course: 'Data Structures & Algorithms',
      time: 'Yesterday',
      icon: 'menu_book',
      completed: false,
    },
    {
      title: 'Completed: Dependency Injection',
      course: 'Spring Boot Essentials',
      time: '2 days ago',
      icon: 'check_circle',
      completed: true,
    },
  ];

  get weeklyGoalProgress(): number {
    return Math.min(
      100,
      (this.weeklyGoal.completedHours / this.weeklyGoal.targetHours) * 100,
    );
  }

  trackCourse(_: number, course: LearningCourse): number {
    return course.id;
  }
}