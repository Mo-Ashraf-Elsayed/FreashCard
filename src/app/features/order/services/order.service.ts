import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  checkOut(cartId: string | null, shippingAddress: object): Observable<any> {
    return this.http.post(
      environment.baseURL +
        `orders/checkout-session/${cartId}?url=https://freash-card.vercel.app`,
      shippingAddress
    );
  }
  getUserOrders(): Observable<any> {
    try {
      const userId = this.authService.decodeToken().id;
      return this.http.get(environment.baseURL + 'orders/user/' + userId);
    } catch (error) {
      return of(false);
    }
  }
}
