import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = false;
  public userID = 0;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(info): void {
    setTimeout(() => {
      console.log('Log In action: ', info);
      this.isLoggedIn = true;
      localStorage.setItem('userinfo', JSON.stringify(info));
    }, 1000);
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('userinfo');
    console.log('Log Out action');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getUserInfo(): void {
    console.log('Get userInfo from localStorage: ', localStorage.getItem('userinfo'));
  }
}
