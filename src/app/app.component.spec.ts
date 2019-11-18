import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from 'src/app/app.component';

let fixture: ComponentFixture < AppComponent > ;

@Component({
  selector: 'app-header',
  template: ''
})
class HeaderComponent {}

@Component({
  selector: 'breadcrumbs',
  template: ''
})
class BreadcrumbsComponent {}

@Component({
  selector: 'app-footer',
  template: ''
})
class FooterComponent {}

let app: AppComponent;

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        FooterComponent
      ],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(AppComponent);
    // Запускаем первоначальную инициализацию и получаем экземпляры директив навигации
    fixture.detectChanges();
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  afterEach(() => fixture.destroy());
});
