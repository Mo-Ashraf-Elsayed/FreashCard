import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { inject } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const userToken = authService.localStorage('get');
  if (typeof userToken === 'string') {
    if (
      req.url.includes('cart') ||
      req.url.includes('orders') ||
      req.url.includes('wishlist')
    ) {
      req = req.clone({
        setHeaders: {
          token: userToken,
        },
      });
    }
  }
  return next(req);
};
