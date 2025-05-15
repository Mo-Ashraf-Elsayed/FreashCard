import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isThereToken = authService.myLocalStorage('check', 'authToken');
  let verifyMsg!: string;

  if (!isThereToken) {
    router.navigate(['signIn']);
    return false;
  }
  authService.verifyToken().subscribe({
    next: ({ message }) => {
      verifyMsg = message;
      return true
    },
    error: ({ message }) => {
      verifyMsg = message;
      authService.myLocalStorage('remove', 'authToken');
      router.navigate(['signIn']);
      return false;
    },
  });
  return true;
};
