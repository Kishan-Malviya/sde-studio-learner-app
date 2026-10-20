import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-learner-page',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './learner-page.html',
  styleUrl: './learner-page.css',
})
export class LearnerPageComponent {
  private readonly route = inject(ActivatedRoute);

  get title(): string {
    return this.route.snapshot.data['title'] ?? 'Learning Space';
  }

  get description(): string {
    return (
      this.route.snapshot.data['description'] ??
      'Your learning journey starts here.'
    );
  }
}