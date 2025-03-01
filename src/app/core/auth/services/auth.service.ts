import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

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
  decodeToken() {
    const token: unknown = this.myLocalStorage('get', 'authToken');
    if (typeof token === 'string') {
      const decoded = jwtDecode(token);
      const decodedToString = JSON.stringify(decoded);
      const decodedToObj = JSON.parse(decodedToString);
      return decodedToObj;
    }
    return;
  }
  myLocalStorage(
    method: 'get' | 'set' | 'check' | 'remove' | 'clear',
    key: string = '',
    value: string = ''
  ): string | boolean | void | null {
    if (typeof localStorage != 'undefined') {
      if (method === 'set') {
        localStorage.setItem(key, value);
        return;
      } else if (method === 'get') {
        return localStorage.getItem(key);
      } else if (method === 'check') {
        if (localStorage.getItem(key)) {
          return true;
        }
        return false;
      } else if (method === 'remove') {
        localStorage.removeItem(key);
        return;
      } else if (method === 'clear') {
        localStorage.clear();
      }
    }
    return null;
  }
  verifyToken(): Observable<any> {
    return this.http.get(environment.baseURL + 'auth/verifyToken');
  }
  forgotPassword(email: any): Observable<any> {
    return this.http.post(environment.baseURL + 'auth/forgotPasswords', email);
  }
  verifyResetCode(code: any): Observable<any> {
    return this.http.post(environment.baseURL + 'auth/verifyResetCode', code);
  }
  resetPassword(data: any): Observable<any> {
    return this.http.put(environment.baseURL + 'auth/resetPassword', data);
  }
}
