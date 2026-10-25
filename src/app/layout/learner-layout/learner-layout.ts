import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LearnerSidebarComponent } from '../learner-sidebar/learner-sidebar';
import { LearnerHeaderComponent } from '../learner-header/learner-header';

@Component({
  selector: 'app-learner-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    LearnerSidebarComponent,
    LearnerHeaderComponent,
  ],
  templateUrl: './learner-layout.html',
  styleUrl: './learner-layout.css',
})
export class LearnerLayoutComponent implements OnInit {
  private readonly breakpointObserver = inject(BreakpointObserver);

  isMobile = false;
  mobileMenuOpen = false;

  ngOnInit(): void {
    this.breakpointObserver
      .observe('(max-width: 767px)')
      .subscribe(({ matches }) => {
        this.isMobile = matches;
        this.mobileMenuOpen = false;
      });
  }

  toggleMenu(): void {
    if (this.isMobile) {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    }
  }

  closeMobileMenu(): void {
    if (this.isMobile) {
      this.mobileMenuOpen = false;
    }
  }
}

export { LearnerLayoutComponent as LearnerLayout };