import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
	let loc: Location;

	beforeEach(async(() => {
    TestBed.configureTestingModule({
			declarations: [ PageNotFoundComponent ],
			providers: [
				{ provide: Location, useValue: window.history }
		]
    }).compileComponents();
  }));

  beforeEach(() => {
    loc = jasmine.createSpyObj("Location", ["back"]);
    fixture = TestBed.createComponent(PageNotFoundComponent);
		component = new PageNotFoundComponent(loc);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
	});
	
	it ("It is backToCatalogue() function test", () => {
		component.backToCatalogue();
		expect(loc.back).toHaveBeenCalledTimes(1);
	});
});
