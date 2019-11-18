import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture < PageNotFoundComponent > ;
  const loc = jasmine.createSpyObj('Location', ['back']);

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
      providers: [{
        provide: Location,
        useValue: loc
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('It is backToCatalogue() function test', () => {
    component.backToCatalogue();
    expect(loc.back).toHaveBeenCalledTimes(1);
  });

  afterEach(() => fixture.destroy());
});
