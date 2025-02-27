import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts(limit: number, page: number): Observable<any> {
    return this.http.get(
      environment.baseURL + `products?limit=${limit}&page=${page}`
    );
  }
  getProductDetails(id: string | null): Observable<any> {
    return this.http.get(environment.baseURL + `products/${id}`);
  }
}
