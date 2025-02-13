import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signUp(data: any): Observable<any> {
    return this.http.post(environment.baseURL + 'auth/signup', data);
  }
  signIn(data: any): Observable<any> {
    return this.http.post(environment.baseURL + 'auth/signin', data);
  }
}
