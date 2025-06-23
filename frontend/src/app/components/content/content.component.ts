import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  content = 'This is sample content that can be viewed by all users.';
  isEditing = false;
  tempContent = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.tempContent = this.content;
  }

  hasPermission(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }

  startEditing(): void {
    this.isEditing = true;
    this.tempContent = this.content;
  }

  saveContent(): void {
    this.content = this.tempContent;
    this.isEditing = false;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.tempContent = this.content;
  }

  deleteContent(): void {
    if (confirm('Are you sure you want to delete this content?')) {
      this.content = '';
      this.tempContent = '';
    }
  }
} 