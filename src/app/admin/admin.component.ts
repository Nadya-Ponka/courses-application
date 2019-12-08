import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/admin/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  public userinfo = {
    login: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public onLogin() {
    this.authService.login(this.userinfo);
    this.router.navigate(['/courses']);
  }

  public ngOnInit() {}
}
