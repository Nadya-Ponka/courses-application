import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  AfterContentInit,
  DoCheck,
  AfterContentChecked,
  AfterViewChecked,
  OnDestroy
} from '@angular/core';

import { CourseItem } from '../../shared/models/course';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnChanges, OnInit, AfterContentInit, DoCheck,
AfterContentChecked, AfterViewChecked, OnDestroy {
  @Input() item: CourseItem;
  @Output() deleteCourse = new EventEmitter < CourseItem > ();

  public searchText: string;
  constructor() {}

  public onDeleteCourse(): void {
    this.deleteCourse.emit(this.item);
  }

  ngOnChanges() {
    console.log('OnChanges hook: id = ', this.item.id);
  }

  ngOnInit() {
    console.log('OnInit hook');
  }

  ngAfterContentInit() {
    console.log('AfterContentInit hook');
  }

  ngDoCheck() {
    console.log('DoCheck hook');
  }

  ngAfterContentChecked() {
    console.log('AfterContentChecked hook');
  }

  ngAfterViewChecked() {
    console.log('AfterContentChecked hook');
  }

  ngOnDestroy() {
    console.log('OnDestroy hook');
  }
}
