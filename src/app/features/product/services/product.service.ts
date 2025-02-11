import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any> {
    return this.http.get(environment.baseURL + 'products');
  }
  getProductDetails(id: string | null): Observable<any> {
    return this.http.get(environment.baseURL + `products/${id}`);
  }
}
