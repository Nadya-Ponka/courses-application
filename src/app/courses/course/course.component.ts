import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterContentInit, DoCheck, AfterContentChecked, AfterViewChecked, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { CourseItem } from 'src/app/shared/models/course';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnChanges, OnInit, AfterContentInit, DoCheck,
AfterContentChecked, AfterViewChecked, OnDestroy {
  @Input() item: CourseItem;
  @Output() deleteCourse = new EventEmitter < CourseItem > ();
  @Output() editCourse = new EventEmitter < CourseItem > ();

  public searchText: string;
  constructor() {}

  public onDelete(): void {
    this.deleteCourse.emit(this.item);
  }

  public onEdit(): void {
    this.editCourse.emit(this.item);
  }

  public ngOnChanges(): void {
    /*     console.log('OnChanges hook: id = ', this.item.id);
     */
  }

  public ngOnInit(): void {
    /*     console.log('OnInit hook');
     */
  }

  public ngAfterContentInit(): void {
    /*     console.log('AfterContentInit hook');
     */
  }

  public ngDoCheck(): void {
    /*     console.log('DoCheck hook');
     */
  }

  public ngAfterContentChecked(): void {
    /*     console.log('AfterContentChecked hook');
     */
  }

  public ngAfterViewChecked(): void {
    /*     console.log('AfterContentChecked hook');
     */
  }

  public ngOnDestroy(): void {
    /*     console.log('OnDestroy hook');
     */
  }
}
