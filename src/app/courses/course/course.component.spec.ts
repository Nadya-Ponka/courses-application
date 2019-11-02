import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseComponent } from './course.component';
import { CourseItem } from '../../shared/models/course';
import { HoursPipe } from './../../shared/pipes/hours-pipe/hours.pipe';

const item: CourseItem = {
	id: 0,
	title: 'Video Course 1. Name tag',
	creationDate: new Date('07/11/2009'),
	duration: 88,
	description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
	when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
};

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseComponent, HoursPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
		component = fixture.componentInstance;
		component.item = item;
    fixture.detectChanges();
  });

  it('should create', () => {
		expect(component).toBeTruthy();
	});
	
	it('raises the deleteCourse event when clicked', (done: DoneFn) => {
    component.deleteCourse.subscribe(d => {
      expect(d).toBe(item);
      done();
    });
    component.onDeleteCourse();
  });
});
