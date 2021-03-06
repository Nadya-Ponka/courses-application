import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable < boolean | UrlTree > | Promise < boolean | UrlTree > | boolean | UrlTree {
    console.log('CanActivate Guard is called');
    const {
      url
    } = state;
    if (this.checkLogin(url)) {
      return of(true);
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }

  private checkLogin(url: string): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      console.log('Guard is passed');
      return true;
    }

    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;

    // Navigate to the login page, return UrlTree
    // return this.router.parseUrl('/login');
    this.router.navigate(['/admin']);
    return false;
  }
}
