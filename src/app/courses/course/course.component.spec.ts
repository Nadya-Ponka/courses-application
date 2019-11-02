import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CourseComponent } from './course.component';
import { CourseItem } from '../../shared/models/course';
import { HoursPipe } from './../../shared/pipes/hours-pipe/hours.pipe';

const example: CourseItem = {
  id: 0,
  title: 'Video Course 1. Name tag',
  creationDate: new Date('07/11/2009'),
  duration: 88,
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
	when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
};

describe('Test CourseComponent as a class', () => {

  it('should create', () => {
    const component: CourseComponent = new CourseComponent();
    expect(component).toBeTruthy();
  });

  it('raises the deleteCourse event when clicked', (done: DoneFn) => {
    const component: CourseComponent = new CourseComponent();
    component.item = example;

    component.deleteCourse.subscribe(d => {
      expect(d).toBe(example);
      done();
    });
    component.onDelete();
  });
});

@Component({
  template: `
	<course [item]="item" (deleteCourse)="onDeleteCourse($event)"></course>
  `
})

class TestHostComponent {
  item = example;
  deleteCourse: CourseItem;
  onDeleteCourse(item: CourseItem): CourseItem {
    this.deleteCourse = item;
    return this.deleteCourse;
  }
}

describe('Test CourseComponent when inside a test host', () => {
  let testHost: TestHostComponent;
  let  fixture: ComponentFixture < TestHostComponent >;
  let  taskEl: DebugElement;
  let  taskClickEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent, TestHostComponent, HoursPipe]
    });

    // Создаем TestHostComponent вместо CourseComponent
    // Такой подход имеет сайд эффект - CourseComponent тоже будет создан
    // так как он находится в темплейте TestHostComponent
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;

    // Ищем элемент с классом .title
    taskEl = fixture.debugElement.query(By.css('.title'));
    // Ищем элемент с классом .delete
    taskClickEl = fixture.debugElement.query(By.css('.delete'));

    // Запускаем инициализацию данных
    fixture.detectChanges();
  });

  it('should display item.title', () => {
    expect(taskEl.nativeElement.textContent).toContain(testHost.item.title);
  });

  it('should raise selected event when clicked', () => {
    // DebugElement.triggerEventHandler может сгенерить любое связанное
    // с данными событие по имени события.
    // Второй параметр - это объект события, переданный обработчику.
    // В этом примере тест запускает событие «click»
    // с нулевым объектом события.
    taskClickEl.triggerEventHandler('click', null);

    expect(testHost.deleteCourse).toBe(testHost.item);
  });
});
