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
  localStorage(
    method: 'get' | 'set' | 'check' | 'remove',
    token: string = ''
  ): string | boolean | void | null {
    if (typeof localStorage != 'undefined') {
      if (method === 'set') {
        localStorage.setItem('authToken', token);
        return;
      } else if (method === 'get') {
        return localStorage.getItem('authToken');
      } else if (method === 'check') {
        if (localStorage.getItem('authToken')) {
          return true;
        }
        return false;
      } else if (method === 'remove') {
        localStorage.removeItem('authToken');
        return;
      }
    }
    return null;
  }
  verifyToken(token: any): Observable<any> {
    return this.http.get(environment.baseURL + 'auth/verifyToken', {
      headers: {
        token,
      },
    });
  }
}
