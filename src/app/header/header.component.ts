import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable, Subject, interval } from 'rxjs';

import { AuthService } from 'src/app/admin/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLogged: boolean;
	public userInfo;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
		// this.userInfo = localStorage.getItem('userinfo');
		this.userInfo = new Subject();
		this.userInfo.pipe(
		 ).subscribe({
			next: () => {
				localStorage.getItem('userinfo')
			}
		});

	}

  public ngDoCheck(): void {
		this.userInfo = localStorage.getItem('userinfo');
  }

	public onLogin() {
		this.router.navigate(['/admin']);
  }

  public onLogout() {
    this.authService.logout();
    this.router.navigate(['/admin']);
  }
}
