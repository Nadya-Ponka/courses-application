import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, throwError, of } from 'rxjs';
import { catchError, map, delay } from 'rxjs/operators';

import { CoursesAPI } from 'src/app/courses/services/courses.config';
import { SpinnerService } from 'src/app/widgets';
import { UserItem, IUser } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isLoggedIn = false;
  public userID = 0;
  public userInfo = new Subject();
  private userToken: string = null;

  constructor(
    private http: HttpClient,
		private spinnerService: SpinnerService,
		private router: Router,
    @Inject(CoursesAPI) private coursesBaseUrl: string
  ) {
    this.userInfo.pipe().subscribe({
      next: (text: string) => text
    });
  }

  public getAllUsers() {
    const url = this.coursesBaseUrl + 'users';
    return this.http.get(url);
  }

  public getUser() {
    const url = this.coursesBaseUrl + `users`;
    return this.http.get < [] > (url);
  }

	public login(userinfo) {
    this.spinnerService.show();

    return this.getAllUsers()
		.toPromise()
		.then((users: Array < any > ) => {
        const currentUser = users.find(usr => usr.login === userinfo.login && usr.password === userinfo.password);
        if (currentUser) {
          const info = {
            id: currentUser.id,
            token: currentUser.fakeToken,
            name: {
              firstName: currentUser.name.first,
              lastName: currentUser.name.last
            },
            login: currentUser.login,
            password: currentUser.password
          };

          localStorage.setItem('userinfo', JSON.stringify(info.name.firstName));
          localStorage.setItem('fakeToken', JSON.stringify(info.token));
          this.userInfo.next(info.name.firstName);
          this.isLoggedIn = true;
					this.router.navigate(['/']);
					return info;
			    } else {
						alert('Credentials are wrong');
						this.spinnerService.hide();
						return null;
        }
      })
	}
	
  logout(): void {
    this.isLoggedIn = false;
    this.userInfo.next(null);

    localStorage.removeItem('userinfo');
    console.log('Log Out action');
  }

  isAuthenticated(): any {
    return this.userInfo;
    // return this.isLoggedIn = !!localStorage.getItem('userinfo');
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
