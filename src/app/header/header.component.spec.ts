import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RouterLinkStubDirective, RouterOutletStubComponent } from './../testing-helpers';
import { AdminModule } from 'src/app/admin/admin.module';
import { HeaderComponent } from 'src/app/header/header.component';
import { LogoComponent } from 'src/app/header/logo/logo.component';
import { AdminComponent } from 'src/app/admin/admin.component';

let links: RouterLinkStubDirective[];
let linkDes: DebugElement[];

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture < HeaderComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          FormsModule,
          AdminModule,
          RouterTestingModule.withRoutes([{
            path: 'admin',
            component: AdminComponent
          }])
        ],
        declarations: [
          HeaderComponent,
          LogoComponent,
          RouterLinkStubDirective,
          RouterOutletStubComponent
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Находим DebugElements с помощью директивы RouterLinkStubDirective
    // Для поиска можно использовать не только By.css, но и By.directive
    // Также искать можно не только по директиве, но и по компоненту,
    // используя его класс
    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    );

    // Получаем экземплры директив с помощью DebugElement инжектора
    // Ангуляр всегда добавляет директивы к инжектору компонента
    links = linkDes.map(
      d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(2, 'should have 1 links');
    expect(links[1].linkParams).toBe(
      '/admin',
      '1st link should go to AdminComponent'
    );
  });

  it('can click Admin link in template', () => {
    const adminLinkDe = linkDes[1];
    const adminLink = links[1];

    expect(adminLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    adminLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(adminLink.navigatedTo).toBe('/admin');
  });
});
