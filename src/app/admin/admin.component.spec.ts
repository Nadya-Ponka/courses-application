import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture < AdminComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        imports: [
          FormsModule,
          RouterTestingModule.withRoutes([{
            path: 'admin',
            component: AdminComponent
          }])
        ],
        declarations: [AdminComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
