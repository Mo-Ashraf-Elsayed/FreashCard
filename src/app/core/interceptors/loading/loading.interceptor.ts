import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(NgxSpinnerService);
  const toastr = inject(ToastrService);
  req = req.clone();
  if (req.url.includes('cart')) {
    if (req.method === 'GET') {
      spinnerService.show();
    }
  } else {
    spinnerService.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (req.url.includes('cart') && req.method !== 'GET') {
        toastr.success('success');
      }
      spinnerService.hide();
    })
  );
};
