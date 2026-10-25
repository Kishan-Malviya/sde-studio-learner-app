import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-learner-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatListModule],
  templateUrl: './learner-sidebar.html',
  styleUrl: './learner-sidebar.css',
})
export class LearnerSidebarComponent {
  @Output() navigate = new EventEmitter<void>();

  readonly navigationGroups = [
    {
      title: '',
      items: [
        { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
      ]
    },
    {
      title: 'LEARNING',
      items: [
        { label: 'Explore Courses', icon: 'explore', route: '/courses' },
        { label: 'My Learning', icon: 'school', route: '/my-learning' },
        { label: 'Learning Track', icon: 'route', route: '/learning-track' },
      ],
    },
    {
      title: 'MY STUDY SPACE',
      items: [
        { label: 'My Notes', icon: 'edit_note', route: '/notes' },
        { label: 'Bookmarks', icon: 'bookmarks', route: '/bookmarks' },
        { label: 'Achievements', icon: 'emoji_events', route: '/achievements' },
      ],
    },
    {
      title: 'ACCOUNT',
      items: [
        { label: 'My Profile', icon: 'account_circle', route: '/profile' },
        { label: 'Settings', icon: 'settings', route: '/settings' },
      ],
    },
  ];
}

export { LearnerSidebarComponent as LearnerSidebar };