
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  rating: number;
  enrolledCount: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  progress: number;
  updatedAt: string;
  instructor: string;
  icon: string;
}

@Component({
  selector: 'app-course-catalog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './course-catalog.html',
  styleUrl: './course-catalog.css'
})
export class CourseCatalogComponent {
  searchTerm = '';
  selectedCategory = 'All Categories';
  selectedDifficulty = 'All Levels';
  selectedStatus = 'All Courses';
  sortBy = 'popular';

  readonly categories = [
    'All Categories',
    'Programming',
    'Web Development',
    'Database',
    'Cloud Computing',
    'Computer Science'
  ];

  readonly difficulties = [
    'All Levels',
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  readonly statuses = [
    'All Courses',
    'Not Started',
    'In Progress',
    'Completed'
  ];

  readonly courses: Course[] = [
    {
      id: 'java-fundamentals',
      title: 'Java Fundamentals',
      description: 'Learn Java syntax, variables, control flow, methods and object-oriented programming.',
      category: 'Programming',
      difficulty: 'Beginner',
      duration: '8h 30m',
      lessons: 24,
      rating: 4.8,
      enrolledCount: 2450,
      status: 'In Progress',
      progress: 65,
      updatedAt: '2026-10-10',
      instructor: 'sde-studio Academy',
      icon: 'code'
    },
    {
      id: 'spring-boot',
      title: 'Spring Boot Essentials',
      description: 'Build REST APIs and backend services with Spring Boot, dependency injection and JPA.',
      category: 'Web Development',
      difficulty: 'Intermediate',
      duration: '12h 15m',
      lessons: 32,
      rating: 4.9,
      enrolledCount: 1980,
      status: 'In Progress',
      progress: 32,
      updatedAt: '2026-10-15',
      instructor: 'sde-studio Academy',
      icon: 'developer_board'
    },
    {
      id: 'sql-database',
      title: 'SQL and Database Design',
      description: 'Master SQL queries, joins, indexes, relationships and relational database design.',
      category: 'Database',
      difficulty: 'Beginner',
      duration: '6h 45m',
      lessons: 20,
      rating: 4.7,
      enrolledCount: 3120,
      status: 'Not Started',
      progress: 0,
      updatedAt: '2026-09-25',
      instructor: 'sde-studio Academy',
      icon: 'storage'
    },
    {
      id: 'data-structures',
      title: 'Data Structures and Algorithms',
      description: 'Understand essential data structures, algorithmic complexity and problem-solving patterns.',
      category: 'Computer Science',
      difficulty: 'Intermediate',
      duration: '16h 20m',
      lessons: 40,
      rating: 4.9,
      enrolledCount: 4250,
      status: 'Not Started',
      progress: 0,
      updatedAt: '2026-10-12',
      instructor: 'sde-studio Academy',
      icon: 'account_tree'
    },
    {
      id: 'web-fundamentals',
      title: 'Modern Web Development',
      description: 'Explore HTML, CSS, TypeScript and modern frontend application fundamentals.',
      category: 'Web Development',
      difficulty: 'Beginner',
      duration: '10h 00m',
      lessons: 28,
      rating: 4.6,
      enrolledCount: 2860,
      status: 'Completed',
      progress: 100,
      updatedAt: '2026-08-30',
      instructor: 'sde-studio Academy',
      icon: 'language'
    },
    {
      id: 'cloud-basics',
      title: 'Cloud Computing Fundamentals',
      description: 'Learn cloud concepts, deployment models, core services and scalability fundamentals.',
      category: 'Cloud Computing',
      difficulty: 'Beginner',
      duration: '7h 40m',
      lessons: 22,
      rating: 4.5,
      enrolledCount: 1540,
      status: 'Not Started',
      progress: 0,
      updatedAt: '2026-10-16',
      instructor: 'sde-studio Academy',
      icon: 'cloud'
    }
  ];

  get filteredCourses(): Course[] {
    const query = this.searchTerm.trim().toLowerCase();

    const result = this.courses.filter(course => {
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query);

      const matchesCategory =
        this.selectedCategory === 'All Categories' ||
        course.category === this.selectedCategory;

      const matchesDifficulty =
        this.selectedDifficulty === 'All Levels' ||
        course.difficulty === this.selectedDifficulty;

      const matchesStatus =
        this.selectedStatus === 'All Courses' ||
        course.status === this.selectedStatus;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty &&
        matchesStatus
      );
    });

    return result.sort((a, b) => {
      switch (this.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
          return (
            new Date(b.updatedAt).getTime() -
            new Date(a.updatedAt).getTime()
          );
        case 'popular':
        default:
          return b.enrolledCount - a.enrolledCount;
      }
    });
  }

  get totalCourses(): number {
    return this.courses.length;
  }

  get inProgressCount(): number {
    return this.courses.filter(
      course => course.status === 'In Progress'
    ).length;
  }

  get completedCount(): number {
    return this.courses.filter(
      course => course.status === 'Completed'
    ).length;
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'All Categories';
    this.selectedDifficulty = 'All Levels';
    this.selectedStatus = 'All Courses';
    this.sortBy = 'popular';
  }
}
