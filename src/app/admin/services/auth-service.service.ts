import { Injectable } from '@angular/core';

import { initialUsers } from 'src/app/shared/data/usersMock';
import { UserItem } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isLoggedIn = false;
  public userID = 0;
  private users: Array < UserItem > = [...initialUsers];

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(userinfo): void {
    const currentUser = this.users.find(usr => usr.login === userinfo.login && usr.password === userinfo.password);
    if (currentUser) {
      console.log('Logged in successfully: ', userinfo);
      localStorage.setItem('userinfo', JSON.stringify(userinfo));
      this.isLoggedIn = true;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('userinfo');
    console.log('Log Out action');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn = !!localStorage.getItem('userinfo');
  }

  getUserInfo(): string {
    console.log('Get userInfo from localStorage: ', localStorage.getItem('userinfo'));
    return this.users.find(el => el.login === localStorage.getItem('userinfo')).login;

  }
}
