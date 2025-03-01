import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { inject } from '@angular/core';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.myLocalStorage('check', 'authToken')) {
    router.navigate(['home']);
    return false;
  }
  return true;
};
