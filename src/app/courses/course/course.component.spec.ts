import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BorderDirective } from 'src/app/shared/directives/border.directive';
import { CourseComponent } from './course.component';
import { CourseItem } from 'src/app/shared/models/course';
import { CoursesListComponent } from 'src/app/courses/courses-list/courses-list.component';
import { HoursPipe } from 'src/app/shared/pipes/hours-pipe/hours.pipe';

const example: CourseItem = {
  id: 0,
  title: 'Video Course 1. Name tag',
  topRated: true,
  creationDate: new Date('07/11/2009'),
  duration: 88,
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
	when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
};

describe('Test CourseComponent when inside a test host', () => {
  let courcesList: CoursesListComponent;
  let fixture: ComponentFixture < CoursesListComponent > ;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule], // for ngModel recognition
      declarations: [CoursesListComponent, CourseComponent, BorderDirective, HoursPipe],
    });
    fixture = TestBed.createComponent(CoursesListComponent);
    courcesList = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('border color should be right', () => {
    fixture.detectChanges();
    let el = fixture.nativeElement.querySelectorAll('course')[1];
    expect(el.style.borderColor).toBe('green');

    el = fixture.nativeElement.querySelectorAll('course')[2];
    expect(el.style.borderColor).toBe('blue');
  });

  it('should display right amount of cources after deleting', () => {
    const initialCourcesLength = fixture.nativeElement.querySelectorAll('.course').length;

    const deletebutton = fixture.debugElement.queryAll(By.css('button.delete'));
    // --------course-list.component.ts--------
    // addded handler to the onDeleteCourse() method
    // this.courses = this.courses.filter(el => el.id !== event.id);
    deletebutton[0].triggerEventHandler('click', null);

    expect(courcesList.courses.length).toEqual(initialCourcesLength - 1);
  });

  afterEach(() => fixture.destroy());
});

describe('Test CourseComponent as a class', () => {
  const component: CourseComponent = new CourseComponent();

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('raises the deleteCourse event when clicked', (done: DoneFn) => {
    component.item = example;
    component.deleteCourse.subscribe(d => {
      expect(d).toBe(example);
      done();
    });
    component.onDelete();
  });
});
