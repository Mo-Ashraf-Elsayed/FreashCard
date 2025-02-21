import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor() {}
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly userToken: string | boolean =
    this.authService.localStorage('get')!;

  addProductToWishList(productId: string): Observable<any> {
    if (typeof this.userToken === 'string') {
      return this.http.post(
        environment.baseURL + 'wishlist',
        { productId },
        { headers: { token: this.userToken } }
      );
    }
    return of(false);
  }

  removeProductFromWishList(productId: string): Observable<any> {
    if (typeof this.userToken === 'string') {
      return this.http.delete(environment.baseURL + `wishlist/${productId}`, {
        headers: { token: this.userToken },
      });
    }
    return of(false);
  }

  getUserWishList(): Observable<any> {
    if (typeof this.userToken === 'string') {
      return this.http.delete(environment.baseURL + `wishlist`, {
        headers: { token: this.userToken },
      });
    }
    return of(false);
  }
}
