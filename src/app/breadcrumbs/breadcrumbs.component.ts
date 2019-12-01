import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  public currentRoute;
  constructor(private router: Router) {}

  public ngOnInit(): void {
    console.log('router: ', this.router);
    this.currentRoute = this.router.routerState.snapshot.url;
  }

  public ngDoCheck(): void {
    this.currentRoute = this.router.routerState.snapshot.url;
  }
}
