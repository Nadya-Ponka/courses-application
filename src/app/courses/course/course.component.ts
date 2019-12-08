import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { CourseItem } from 'src/app/shared/models/course';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
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

/*   public ngOnChanges(): void {
  } */

  public ngOnInit(): void {
  }

/*   public ngAfterContentInit(): void {
  }

  public ngDoCheck(): void {
  }

  public ngAfterContentChecked(): void {
  }

  public ngAfterViewChecked(): void {
  }

  public ngOnDestroy(): void {
  } */
}
