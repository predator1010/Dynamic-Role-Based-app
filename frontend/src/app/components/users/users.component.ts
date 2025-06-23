import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { User, Role } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  roles: Role[] = [];
  loading = false;
  error = '';

  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
        console.log('Users loaded:', users);
      },
      error: (error) => {
        this.error = 'Failed to load users: ' + (error.error?.message || error.message);
        this.loading = false;
        console.error('Error loading users:', error);
      }
    });
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        console.log('Roles loaded:', roles);
      },
      error: (error) => {
        this.error = 'Failed to load roles: ' + (error.error?.message || error.message);
        console.error('Error loading roles:', error);
      }
    });
  }

  onRoleChange(event: Event, userId: string): void {
    const newRole = (event.target as HTMLSelectElement).value;
    this.updateUserRole(userId, newRole);
  }

  updateUserRole(userId: string, newRole: string): void {
    this.userService.updateUserRole(userId, { role: newRole }).subscribe({
      next: () => {
        this.loadUsers(); // Reload users to get updated data
      },
      error: (error) => {
        this.error = 'Failed to update user role: ' + (error.error?.message || error.message);
        console.error('Error updating user role:', error);
      }
    });
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.loadUsers(); // Reload users after deletion
        },
        error: (error) => {
          this.error = 'Failed to delete user: ' + (error.error?.message || error.message);
          console.error('Error deleting user:', error);
        }
      });
    }
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
