import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  public sidebarItems = [
    { label: 'List', icon: 'label', url: './list' },
    { label: 'Add', icon: 'add', url: './new-hero' },
    { label: 'Search', icon: 'search', url: './search' },
  ];

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  get user(): User | undefined {
    return this.authService.currectUser;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
