import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);
  checkOut(cartId: string | null, shippingAddress: object): Observable<any> {
    return this.http.post(
      environment.baseURL +
        `orders/checkout-session/${cartId}?url=https://freash-card.vercel.app/#/`,
      shippingAddress
    );
  }
}
