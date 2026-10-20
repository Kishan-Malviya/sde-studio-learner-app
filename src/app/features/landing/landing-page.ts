import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface LandingFeature {
  number: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  route: string;
  tone: string;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPageComponent {
  readonly features: LandingFeature[] = [
    { number: '01', icon: 'terminal', title: 'DSA & problem solving', description: 'Build a repeatable approach to coding questions, from first principles to efficient solutions.', tags: ['Patterns', 'Practice', 'Complexity'], route: '/courses/data-structures', tone: 'violet' },
    { number: '02', icon: 'coffee', title: 'Java & backend', description: 'Strengthen Java fundamentals, Spring Boot, REST APIs, and the skills behind production services.', tags: ['Core Java', 'Spring Boot', 'APIs'], route: '/courses/java-fundamentals', tone: 'amber' },
    { number: '03', icon: 'database', title: 'SQL & databases', description: 'Learn queries, data modeling, indexes, and the database concepts interviewers look for.', tags: ['SQL', 'Modeling', 'Indexes'], route: '/courses/sql-database', tone: 'teal' },
    { number: '04', icon: 'hub', title: 'System design', description: 'Connect the building blocks—caching, queues, storage, and trade-offs—into a clear design process.', tags: ['LLD', 'HLD', 'Architecture'], route: '/learning-track', tone: 'blue' },
  ];

  readonly steps = [
    { number: '01', title: 'Choose a path', description: 'Pick a topic or course that fits your next goal.' },
    { number: '02', title: 'Learn in small steps', description: 'Follow a clear curriculum, lesson by lesson.' },
    { number: '03', title: 'Keep your momentum', description: 'Save notes, bookmark lessons, and see your progress.' },
  ];
}
