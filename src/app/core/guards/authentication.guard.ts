import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isThereToken = authService.localStorage('check');
  let verifyMsg!: string;

  if (!isThereToken) {
    router.navigate(['signIn']);
    return false;
  }
  authService.verifyToken(authService.localStorage('get')).subscribe({
    next: ({ message }) => {
      verifyMsg = message;
      router.navigate(['home']);
    },
    error: ({ message }) => {
      verifyMsg = message;
      authService.localStorage('remove');
      router.navigate(['signIn']);
      return false;
    },
  });
  return true;
};
