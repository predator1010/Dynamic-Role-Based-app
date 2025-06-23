import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  hasPermission(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 