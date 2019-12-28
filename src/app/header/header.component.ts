import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/admin/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLogged: boolean;
  public userName: string;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((info: string) => this.userName = info);
  }

  public onLogin() {
    this.router.navigate(['/admin']);
  }

  public onLogout() {
    this.authService.logout();
    this.router.navigate(['/admin']);
  }
}
