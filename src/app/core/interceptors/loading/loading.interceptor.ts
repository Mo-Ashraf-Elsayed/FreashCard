import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize, tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(NgxSpinnerService);
  const toastr = inject(ToastrService);
  if (req.method === 'GET' || req.url.includes('verifyResetCode')) {
    spinnerService.show();
  }
  return next(req).pipe(
    tap((event: any) => {
      if (
        event.body &&
        event.body.message &&
        event.body.message !== 'verified'
      ) {
        if (req.method === 'DELETE' || req.method === 'PUT') {
          toastr.warning(event.body.message);
        } else {
          toastr.success(event.body.message);
        }
      } else if (event.body && event.body.status && req.url.includes('cart')) {
        if (req.method === 'DELETE' || req.method === 'PUT')
          toastr.success(event.body.status);
      }
    }),
    finalize(() => {
      if (req.method === 'GET' || req.url.includes('verifyResetCode')) {
        spinnerService.hide();
      }
    })
  );
};
