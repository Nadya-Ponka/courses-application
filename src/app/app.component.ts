import { Component, ViewEncapsulation } from '@angular/core';

import { AuthService } from 'src/app/admin/services/auth-service.service';
import { SpinnerService } from 'src/app/widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public title = 'courses-application';

  constructor(
    public authService: AuthService,
    public spinnerService: SpinnerService
  ) {}

  ngOnInit() {}
}
