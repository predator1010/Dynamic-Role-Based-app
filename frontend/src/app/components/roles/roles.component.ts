import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/user.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  loading = false;
  error = '';

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.loading = true;
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load roles';
        this.loading = false;
      }
    });
  }

  deleteRole(roleId: string): void {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roleService.deleteRole(roleId).subscribe({
        next: () => {
          this.loadRoles(); // Reload roles after deletion
        },
        error: (error) => {
          this.error = 'Failed to delete role';
        }
      });
    }
  }

  getPermissionBadgeClass(permission: string): string {
    switch (permission) {
      case 'read': return 'badge bg-primary';
      case 'write': return 'badge bg-success';
      case 'delete': return 'badge bg-danger';
      case 'manage_users': return 'badge bg-warning';
      case 'manage_roles': return 'badge bg-info';
      default: return 'badge bg-secondary';
    }
  }
} 