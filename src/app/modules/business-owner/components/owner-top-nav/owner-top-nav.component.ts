import { Component, output } from '@angular/core';

@Component({
  selector: 'app-owner-top-nav',
  standalone: true,
  imports: [],
  templateUrl: './owner-top-nav.component.html',
  styleUrl: './owner-top-nav.component.css'
})
export class OwnerTopNavComponent {
  toggleSidebar = output<void>();
  isOpen: boolean = false;
  
  toggle() {
    this.toggleSidebar.emit();
    this.isOpen = !this.isOpen;
  }
}