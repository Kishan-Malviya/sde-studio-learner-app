
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LearningProgressService } from '../../../core/services/learning-progress';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  preview?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  enrolledCount: number;
  instructor: string;
  icon: string;
  learningOutcomes: string[];
  prerequisites: string[];
  modules: CourseModule[];
}

type EnrollmentStatus = 'Not Started' | 'In Progress' | 'Completed';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css'
})
export class CourseDetailsComponent {
  readonly courseId: string;

  course: CourseDetails | undefined;

  enrollmentStatus: EnrollmentStatus = 'Not Started';

  expandedModules = new Set<string>();

  private readonly progressService = inject(LearningProgressService);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.courseId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadCourse(this.courseId);
  }

  
private loadCourse(id: string): void {
  const course = CourseDetailsComponent.findCourseById(id);

  if (!course) {
    this.course = undefined;
    return;
  }

  this.course = course;

  // Initialize demo progress only when no saved progress exists.
  const initialCompletedIds = course.modules
    .flatMap(module => module.lessons)
    .filter(lesson => lesson.completed)
    .map(lesson => lesson.id);

  this.progressService.initializeCourseProgress(
    course.id,
    initialCompletedIds
  );

  this.enrollmentStatus = this.getInitialStatus(course);

  // Expand the first module by default.
  if (course.modules.length > 0) {
    this.expandedModules.add(course.modules[0].id);
  }
}


  
private getInitialStatus(course: CourseDetails): EnrollmentStatus {
  const totalLessons = course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );

  const completedLessons = course.modules
    .flatMap(module => module.lessons)
    .filter(lesson =>
      this.progressService.isLessonCompleted(course.id, lesson.id)
    ).length;

  if (totalLessons > 0 && completedLessons === totalLessons) {
    return 'Completed';
  }

  if (completedLessons > 0) {
    return 'In Progress';
  }

  return 'Not Started';
}


  private static readonly courseData: CourseDetails[] = [
    {
      id: 'java-fundamentals',
      title: 'Java Fundamentals',
      description:
        'Build a strong foundation in Java programming. Learn the language syntax, control flow, object-oriented principles, collections, and exception handling through structured lessons.',
      category: 'Programming',
      difficulty: 'Beginner',
      duration: '8h 30m',
      rating: 4.8,
      enrolledCount: 2450,
      instructor: 'sde-studio Academy',
      icon: 'code',
      learningOutcomes: [
        'Understand Java syntax, variables, data types, and operators.',
        'Use conditions, loops, methods, and arrays to solve problems.',
        'Apply object-oriented programming principles.',
        'Work with collections and handle exceptions.',
        'Write and organize maintainable Java programs.'
      ],
      prerequisites: [
        'Basic computer literacy.',
        'A computer with a Java development environment for coding practice.',
        'No prior Java experience is required.'
      ],
      modules: [
        {
          id: 'java-module-1',
          title: 'Getting Started with Java',
          description: 'Understand Java and prepare your development environment.',
          lessons: [
            {
              id: 'java-lesson-1',
              title: 'Introduction to Java',
              duration: '12 min',
              completed: true,
              preview: true
            },
            {
              id: 'java-lesson-2',
              title: 'How Java Executes Code',
              duration: '18 min',
              completed: true
            },
            {
              id: 'java-lesson-3',
              title: 'JDK, JRE, and JVM',
              duration: '16 min',
              completed: false
            },
            {
              id: 'java-lesson-4',
              title: 'Your First Java Program',
              duration: '20 min',
              completed: false
            }
          ]
        },
        {
          id: 'java-module-2',
          title: 'Java Language Fundamentals',
          description: 'Learn the building blocks of Java programs.',
          lessons: [
            {
              id: 'java-lesson-5',
              title: 'Variables and Data Types',
              duration: '22 min',
              completed: false
            },
            {
              id: 'java-lesson-6',
              title: 'Operators and Expressions',
              duration: '18 min',
              completed: false
            },
            {
              id: 'java-lesson-7',
              title: 'Conditions and Loops',
              duration: '28 min',
              completed: false
            },
            {
              id: 'java-lesson-8',
              title: 'Methods and Parameters',
              duration: '24 min',
              completed: false
            }
          ]
        },
        {
          id: 'java-module-3',
          title: 'Object-Oriented Programming',
          description: 'Explore classes, objects, inheritance, and polymorphism.',
          lessons: [
            {
              id: 'java-lesson-9',
              title: 'Classes and Objects',
              duration: '25 min',
              completed: false
            },
            {
              id: 'java-lesson-10',
              title: 'Encapsulation and Abstraction',
              duration: '30 min',
              completed: false
            },
            {
              id: 'java-lesson-11',
              title: 'Inheritance and Polymorphism',
              duration: '32 min',
              completed: false
            }
          ]
        },
        {
          id: 'java-module-4',
          title: 'Collections and Exception Handling',
          description: 'Manage groups of data and handle runtime failures.',
          lessons: [
            {
              id: 'java-lesson-12',
              title: 'Collections Overview',
              duration: '20 min',
              completed: false
            },
            {
              id: 'java-lesson-13',
              title: 'Lists, Sets, and Maps',
              duration: '30 min',
              completed: false
            },
            {
              id: 'java-lesson-14',
              title: 'Exception Handling',
              duration: '25 min',
              completed: false
            }
          ]
        }
      ]
    },
    {
      id: 'spring-boot',
      title: 'Spring Boot Essentials',
      description:
        'Learn how to build backend applications and REST APIs with Spring Boot. Explore dependency injection, application configuration, controllers, services, and data access.',
      category: 'Web Development',
      difficulty: 'Intermediate',
      duration: '12h 15m',
      rating: 4.9,
      enrolledCount: 1980,
      instructor: 'sde-studio Academy',
      icon: 'developer_board',
      learningOutcomes: [
        'Understand Spring Boot application structure and auto-configuration.',
        'Use dependency injection and the Spring application context.',
        'Build REST endpoints using controllers and services.',
        'Integrate persistence using Spring Data JPA.',
        'Validate API inputs and handle errors appropriately.'
      ],
      prerequisites: [
        'Basic Java programming knowledge.',
        'Familiarity with classes, interfaces, and exceptions.',
        'Basic understanding of HTTP and REST is helpful.'
      ],
      modules: [
        {
          id: 'spring-module-1',
          title: 'Spring Boot Foundations',
          description: 'Understand the framework and create an application.',
          lessons: [
            {
              id: 'spring-lesson-1',
              title: 'Introduction to Spring Boot',
              duration: '15 min',
              completed: true,
              preview: true
            },
            {
              id: 'spring-lesson-2',
              title: 'Project Structure and Configuration',
              duration: '22 min',
              completed: true
            },
            {
              id: 'spring-lesson-3',
              title: 'Dependency Injection',
              duration: '28 min',
              completed: false
            }
          ]
        },
        {
          id: 'spring-module-2',
          title: 'Building REST APIs',
          description: 'Create controllers and implement REST endpoints.',
          lessons: [
            {
              id: 'spring-lesson-4',
              title: 'Controllers and Request Mapping',
              duration: '25 min',
              completed: false
            },
            {
              id: 'spring-lesson-5',
              title: 'Request and Response DTOs',
              duration: '30 min',
              completed: false
            },
            {
              id: 'spring-lesson-6',
              title: 'Validation and Error Handling',
              duration: '35 min',
              completed: false
            }
          ]
        },
        {
          id: 'spring-module-3',
          title: 'Persistence with JPA',
          description: 'Connect application services to a relational database.',
          lessons: [
            {
              id: 'spring-lesson-7',
              title: 'Entities and Repositories',
              duration: '30 min',
              completed: false
            },
            {
              id: 'spring-lesson-8',
              title: 'Transactions and Relationships',
              duration: '35 min',
              completed: false
            }
          ]
        }
      ]
    },
    {
      id: 'sql-database',
      title: 'SQL and Database Design',
      description:
        'Learn to query relational data and design well-structured databases using SQL, joins, constraints, and indexing fundamentals.',
      category: 'Database',
      difficulty: 'Beginner',
      duration: '6h 45m',
      rating: 4.7,
      enrolledCount: 3120,
      instructor: 'sde-studio Academy',
      icon: 'storage',
      learningOutcomes: [
        'Write SELECT queries with filtering and sorting.',
        'Combine data using joins and aggregate functions.',
        'Design tables with appropriate keys and constraints.',
        'Understand indexes and basic query performance.'
      ],
      prerequisites: [
        'Basic computer literacy.',
        'No previous database experience is required.'
      ],
      modules: [
        {
          id: 'sql-module-1',
          title: 'SQL Fundamentals',
          description: 'Learn to retrieve and filter relational data.',
          lessons: [
            {
              id: 'sql-lesson-1',
              title: 'Introduction to Relational Databases',
              duration: '15 min',
              completed: false,
              preview: true
            },
            {
              id: 'sql-lesson-2',
              title: 'SELECT, WHERE, and ORDER BY',
              duration: '25 min',
              completed: false
            },
            {
              id: 'sql-lesson-3',
              title: 'Joins and Aggregations',
              duration: '35 min',
              completed: false
            }
          ]
        },
        {
          id: 'sql-module-2',
          title: 'Database Design',
          description: 'Understand relationships, constraints, and indexes.',
          lessons: [
            {
              id: 'sql-lesson-4',
              title: 'Keys and Relationships',
              duration: '25 min',
              completed: false
            },
            {
              id: 'sql-lesson-5',
              title: 'Normalization and Indexes',
              duration: '30 min',
              completed: false
            }
          ]
        }
      ]
    },
    {
      id: 'data-structures',
      title: 'Data Structures and Algorithms',
      description:
        'Build problem-solving skills through core data structures, algorithm analysis, and common coding interview patterns.',
      category: 'Computer Science',
      difficulty: 'Intermediate',
      duration: '16h 20m',
      rating: 4.9,
      enrolledCount: 4250,
      instructor: 'sde-studio Academy',
      icon: 'account_tree',
      learningOutcomes: [
        'Analyze time and space complexity.',
        'Work with arrays, linked lists, stacks, queues, and hash maps.',
        'Apply searching, sorting, and common problem-solving patterns.',
        'Develop a structured approach to coding problems.'
      ],
      prerequisites: [
        'Basic programming knowledge in any language.',
        'Familiarity with variables, loops, methods, and functions.'
      ],
      modules: [
        {
          id: 'dsa-module-1',
          title: 'Complexity and Arrays',
          description: 'Learn complexity analysis and array operations.',
          lessons: [
            {
              id: 'dsa-lesson-1',
              title: 'Introduction to Big-O',
              duration: '20 min',
              completed: false,
              preview: true
            },
            {
              id: 'dsa-lesson-2',
              title: 'Array Traversal and Searching',
              duration: '30 min',
              completed: false
            },
            {
              id: 'dsa-lesson-3',
              title: 'Two Pointer Pattern',
              duration: '35 min',
              completed: false
            }
          ]
        },
        {
          id: 'dsa-module-2',
          title: 'Linear Data Structures',
          description: 'Explore linked lists, stacks, queues, and hash maps.',
          lessons: [
            {
              id: 'dsa-lesson-4',
              title: 'Linked Lists',
              duration: '35 min',
              completed: false
            },
            {
              id: 'dsa-lesson-5',
              title: 'Stacks and Queues',
              duration: '30 min',
              completed: false
            },
            {
              id: 'dsa-lesson-6',
              title: 'Hash Maps and Sets',
              duration: '35 min',
              completed: false
            }
          ]
        }
      ]
    },
    {
      id: 'web-fundamentals',
      title: 'Modern Web Development',
      description:
        'Explore frontend development fundamentals and learn how HTML, CSS, and TypeScript work together to create interactive web applications.',
      category: 'Web Development',
      difficulty: 'Beginner',
      duration: '10h 00m',
      rating: 4.6,
      enrolledCount: 2860,
      instructor: 'sde-studio Academy',
      icon: 'language',
      learningOutcomes: [
        'Structure pages with semantic HTML.',
        'Style responsive layouts using CSS.',
        'Understand TypeScript fundamentals.',
        'Build interactive user interfaces.'
      ],
      prerequisites: [
        'Basic computer literacy.',
        'No prior web development experience is required.'
      ],
      modules: [
        {
          id: 'web-module-1',
          title: 'HTML and CSS Foundations',
          description: 'Create and style web pages.',
          lessons: [
            {
              id: 'web-lesson-1',
              title: 'Semantic HTML',
              duration: '20 min',
              completed: true,
              preview: true
            },
            {
              id: 'web-lesson-2',
              title: 'CSS Layouts and Flexbox',
              duration: '30 min',
              completed: true
            },
            {
              id: 'web-lesson-3',
              title: 'Responsive Design',
              duration: '25 min',
              completed: true
            }
          ]
        },
        {
          id: 'web-module-2',
          title: 'TypeScript Basics',
          description: 'Learn types and core language features.',
          lessons: [
            {
              id: 'web-lesson-4',
              title: 'Types, Functions, and Interfaces',
              duration: '35 min',
              completed: true
            },
            {
              id: 'web-lesson-5',
              title: 'Working with Arrays and Objects',
              duration: '30 min',
              completed: true
            }
          ]
        }
      ]
    },
    {
      id: 'cloud-basics',
      title: 'Cloud Computing Fundamentals',
      description:
        'Explore cloud computing concepts, service models, deployment options, scalability, and core cloud architecture principles.',
      category: 'Cloud Computing',
      difficulty: 'Beginner',
      duration: '7h 40m',
      rating: 4.5,
      enrolledCount: 1540,
      instructor: 'sde-studio Academy',
      icon: 'cloud',
      learningOutcomes: [
        'Explain the main cloud service and deployment models.',
        'Understand scalability, availability, and elasticity.',
        'Recognize common cloud infrastructure components.',
        'Identify foundational cloud security concepts.'
      ],
      prerequisites: [
        'Basic computer and internet knowledge.',
        'No cloud platform experience is required.'
      ],
      modules: [
        {
          id: 'cloud-module-1',
          title: 'Cloud Foundations',
          description: 'Learn the basic concepts behind cloud computing.',
          lessons: [
            {
              id: 'cloud-lesson-1',
              title: 'What Is Cloud Computing?',
              duration: '18 min',
              completed: false,
              preview: true
            },
            {
              id: 'cloud-lesson-2',
              title: 'Service and Deployment Models',
              duration: '25 min',
              completed: false
            },
            {
              id: 'cloud-lesson-3',
              title: 'Availability and Scalability',
              duration: '30 min',
              completed: false
            }
          ]
        },
        {
          id: 'cloud-module-2',
          title: 'Cloud Architecture Basics',
          description: 'Understand common infrastructure and security concepts.',
          lessons: [
            {
              id: 'cloud-lesson-4',
              title: 'Compute, Storage, and Networking',
              duration: '35 min',
              completed: false
            },
            {
              id: 'cloud-lesson-5',
              title: 'Cloud Security Fundamentals',
              duration: '30 min',
              completed: false
            }
          ]
        }
      ]
    }
  ];

  static findCourseById(id: string): CourseDetails | undefined {
    return this.courseData.find(course => course.id === id);
  }

  get totalLessons(): number {
    return this.course?.modules.reduce(
      (total, module) => total + module.lessons.length,
      0
    ) ?? 0;
  }

  
get completedLessons(): number {
  if (!this.course) return 0;

  return this.course.modules
    .flatMap(module => module.lessons)
    .filter(lesson =>
      this.progressService.isLessonCompleted(this.course!.id, lesson.id)
    ).length;
}

get progressPercentage(): number {
  if (this.totalLessons === 0) return 0;

  return Math.round(
    (this.completedLessons / this.totalLessons) * 100
  );
}

isLessonCompleted(lessonId: string): boolean {
  if (!this.course) return false;

  return this.progressService.isLessonCompleted(
    this.course.id,
    lessonId
  );
}


  get totalModuleCount(): number {
    return this.course?.modules.length ?? 0;
  }

  get totalDuration(): string {
    return this.course?.duration ?? '';
  }

  isModuleExpanded(moduleId: string): boolean {
    return this.expandedModules.has(moduleId);
  }

  toggleModule(moduleId: string): void {
    if (this.expandedModules.has(moduleId)) {
      this.expandedModules.delete(moduleId);
    } else {
      this.expandedModules.add(moduleId);
    }
  }

  enrollOrContinue(): void {
    if (!this.course) {
      return;
    }

    if (this.enrollmentStatus === 'Not Started') {
      this.enrollmentStatus = 'In Progress';
    }

    if (this.enrollmentStatus === 'Completed') {
      this.router.navigate(['/courses', this.course.id, 'learn']);
      return;
    }

    const firstIncompleteLesson = this.course.modules
  .flatMap(module => module.lessons)
  .find(lesson => !this.isLessonCompleted(lesson.id));

    if (firstIncompleteLesson) {
      this.router.navigate([
        '/courses',
        this.course.id,
        'learn',
        firstIncompleteLesson.id
      ]);
    }
  }

  openLesson(lesson: Lesson): void {
    if (!this.course) {
      return;
    }

    this.router.navigate([
      '/courses',
      this.course.id,
      'learn',
      lesson.id
    ]);
  }

  getActionLabel(): string {
    switch (this.enrollmentStatus) {
      case 'Not Started':
        return 'Enroll in Course';
      case 'In Progress':
        return 'Continue Learning';
      case 'Completed':
        return 'Review Course';
    }
  }
}
