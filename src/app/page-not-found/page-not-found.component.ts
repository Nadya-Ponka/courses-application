import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ReflectiveInjector, InjectionToken, inject } from '@angular/core';

export const LOCATION_TOKEN = new InjectionToken<Location>('Window location object');

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(readonly location: Location) {}

  public ngOnInit(): void {}

  public backToCatalogue(): void {
    this.location.back();
  }

}
