import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() layout!: string;
  authService = inject(AuthService);
  router = inject(Router);
  logOut(): void {
    this.authService.localStorage('remove');
    this.router.navigate(['signIn']);
  }
}
