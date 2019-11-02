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

  public ngOnChanges(): void {
    console.log('OnChanges hook: id = ', this.item.id);
  }

  public ngOnInit(): void {
    console.log('OnInit hook');
  }

  public ngAfterContentInit(): void {
    console.log('AfterContentInit hook');
  }

  public ngDoCheck(): void {
    console.log('DoCheck hook');
  }

  public ngAfterContentChecked(): void {
    console.log('AfterContentChecked hook');
  }

  public ngAfterViewChecked(): void {
    console.log('AfterContentChecked hook');
  }

  public ngOnDestroy(): void {
    console.log('OnDestroy hook');
  }
}
