import { TestBed } from '@angular/core/testing';

import { CoursesObservableService } from './courses-observable.service';

describe('CoursesObservableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursesObservableService = TestBed.get(CoursesObservableService);
    expect(service).toBeTruthy();
  });
});
