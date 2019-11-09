import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoursesListComponent } from './courses-list.component';
import { CourseComponent } from './../course/course.component';
import { HoursPipe } from './../../shared/pipes/hours-pipe/hours.pipe';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture < CoursesListComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [CoursesListComponent, CourseComponent, HoursPipe]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSearchText() should return result', () => {
    const data = 'Want to find...';
    expect(component.onSearchText(data)).toBe('Want to find...');
  });

  it('function onDeleteCourse() should create', () => {
    expect(component.onDeleteCourse).toBeTruthy();
  });

  it('onDeleteCourse() should return result', () => {
    const data = {
      id: 0,
      title: 'Video Course 1. Name tag',
      topRated: true,
      creationDate: new Date('07/11/2009'),
      duration: 88,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
			Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
			when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
    };
    expect(component.onDeleteCourse(data)).toEqual(data);
  });

  afterEach(() => fixture.destroy());
});
