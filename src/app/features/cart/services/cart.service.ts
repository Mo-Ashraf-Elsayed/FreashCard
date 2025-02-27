import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  cartItems: WritableSignal<number> = signal<number>(0);
  private readonly userToken: string | boolean =
    this.authService.localStorage('get')!;
  addToCart(productId: string): Observable<any> {
    if (typeof this.userToken === 'string') {
      return this.http.post(environment.baseURL + 'cart', { productId });
    }
    return of(false);
  }
  updateProductQuanity(productId: string, count: number): Observable<any> {
    if (typeof this.userToken === 'string') {
      return this.http.put(environment.baseURL + `cart/${productId}`, {
        count,
      });
    }
    return of(false);
  }
  getUserCart(): Observable<any> {
    if (typeof this.userToken === 'string') {
      return this.http.get(environment.baseURL + 'cart');
    }
    return of(false);
  }
  removeProductFromCart(productId: string): Observable<any> {
    if (typeof this.userToken === 'string') {
      return this.http.delete(environment.baseURL + `cart/${productId}`);
    }
    return of(false);
  }
  clearCart(): Observable<any> {
    if (typeof this.userToken === 'string') {
      return this.http.delete(environment.baseURL + `cart`);
    }
    return of(false);
  }
}
