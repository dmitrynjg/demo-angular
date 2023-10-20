import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, Signin, Signup, UserResponse } from '../types/services/user.types';
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(public http: HttpClient) { }
  isAuth: boolean = false;
  checkIsAuth(): void {
    const jwt = this.getJwt();
    if (jwt) {
      this.isAuth = true;
    }
  }
  getJwt(): string | null {
    return localStorage.getItem('jwt');
  }
  saveJWT(jwt: string): void {
    localStorage.setItem('jwt', jwt);
    this.isAuth = true;
  }
  logout(): void {
    localStorage.removeItem('jwt')
    this.isAuth = false;
  }
  get() {
    return this.http.get<UserResponse>('/api/v1/user/info', {
      headers: { 'Authorization': `Bearer ${this.getJwt()}` }
    })
  }

  register(user: Signup) {
    return this.http.post<AuthResponse>('/api/v1/auth/register', user);
  }

  login(user: Signin) {
    return this.http.post<AuthResponse>('/api/v1/auth/login', user);
  }
}
