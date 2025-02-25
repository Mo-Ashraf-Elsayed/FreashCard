import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product } from '../../product/models/product';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor() {}
  private readonly http = inject(HttpClient);
  wishListLength: BehaviorSubject<number> = new BehaviorSubject(0);
  wishListArr = new BehaviorSubject<Product[]>([]);
  addProductToWishList(productId: string): Observable<any> {
    return this.http.post(environment.baseURL + 'wishlist', { productId });
  }

  removeProductFromWishList(productId: string): Observable<any> {
    return this.http.delete(environment.baseURL + `wishlist/${productId}`);
  }

  getUserWishList(): Observable<any> {
    return this.http.get(environment.baseURL + `wishlist`);
  }
}
