import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { AuthService } from 'src/app/admin/services/auth-service.service';
import { SpinnerService } from 'src/app/widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public title = 'courses-application';
  public showSpinner: boolean;
  public showBreadcrumbs: boolean;

  constructor(
    public authService: AuthService,
    public spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.spinnerService.isVisible().subscribe((info: boolean) => this.showSpinner = info);
    this.authService.isAuthenticated().subscribe((info: boolean) => this.showBreadcrumbs = info);
  }
}
