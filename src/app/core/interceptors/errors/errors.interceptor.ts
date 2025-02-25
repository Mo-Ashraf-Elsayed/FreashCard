import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toster = inject(ToastrService);
  return next(req).pipe(
    catchError((err) => {
      if (
        err.error.message !==
        'You are not logged in. Please login to get access'
      )
        toster.error(err.error.message, 'Error');
      return throwError(() => err);
    })
  );
};
