import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { UserItem } from 'src/app/shared/models/user';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoursesAPI } from 'src/app/courses/services/courses.config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isLoggedIn = false;
  public userID = 0;
  private users: UserItem[];

  constructor(
    private http: HttpClient,
    @Inject(CoursesAPI) private coursesBaseUrl: string
  ) {
    this.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  public getUsers() {
    const url = this.coursesBaseUrl + `users`;
    return this.http.get < [] > (url);
  }

  public getUser() {
    const url = this.coursesBaseUrl + `users`;
    return this.http.get < [] > (url);
  }

  async login(userinfo) {
    const currentUser = this.users.find(usr => usr.login === userinfo.login && usr.password === userinfo.password);

    if (currentUser) {
      let token: {};
      this.getUserInfo(userinfo).subscribe(data => {
        token = data;
      });
      setTimeout(() => {
        console.log('Logged in successfully: ', token);
        localStorage.setItem('userinfo', JSON.stringify(token));

        this.isLoggedIn = true;
      }, 500);
      localStorage.setItem('userinfo', JSON.stringify(token));
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

  getUserInfo(userinfo) {
    const url = this.coursesBaseUrl + `auth/login`;
    const body = JSON.stringify(userinfo);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }

}
