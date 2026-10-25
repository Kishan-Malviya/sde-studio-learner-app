import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-learner-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './learner-header.html',
  styleUrl: './learner-header.css',
})
export class LearnerHeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();
}

export { LearnerHeaderComponent as LearnerHeader };