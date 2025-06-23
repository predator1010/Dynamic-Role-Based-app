import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  getRoleBadgeClass(roleName: string): string {
    switch (roleName) {
      case 'Admin': return 'badge-admin';
      case 'Editor': return 'badge-editor';
      case 'Viewer': return 'badge-viewer';
      default: return 'badge-secondary';
    }
  }
} 