
import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../app.component.css']  // reuse app-level styles for layout
})
export class NavBarComponent {
  isCollapsed = false;
  isMobile = window.innerWidth <= 768;
  private routerSub: Subscription | null = null;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  closeSidebar(): void {
    this.isCollapsed = true;
  }

  get showBackdrop(): boolean {
    return this.isMobile && !this.isCollapsed;
  }

  get floatingLeft(): string {
    if (this.isMobile) return this.isCollapsed ? '17%' : '38%';
    return this.isCollapsed ? '90px' : '270px';
  }

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) this.isCollapsed = true;
  }

  constructor(private router: Router) {
    this.routerSub = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        if (this.isMobile) this.isCollapsed = true; // auto-hide on navigation for mobile
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub) this.routerSub.unsubscribe();
  }
}