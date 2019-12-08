import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CourseItem } from 'src/app/shared/models/course';
import { CoursesService } from 'src/app/courses/services/courses-service';
import { CoursesObservableService } from 'src/app/courses/services/courses-observable.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit, OnDestroy {
  public item: CourseItem;
  private sub: Subscription;
  public originalUser: CourseItem;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private coursesObservableService: CoursesObservableService
  ) {}

  public onSaveItem() {
    if (this.item.id === undefined) {
      this.item.id = Math.random() * 1000;
      this.sub = this.coursesObservableService.createCourse(this.item)
        .subscribe((elem: any) => {
          this.onGoBack();
        }),

        error => console.log(error);
    } else {
      this.sub = this.coursesObservableService.updateCourse(this.item)
        .subscribe((elem: any) => {
          this.onGoBack();
        }),
        error => console.log(error);
    }
  }

  public onGoBack() {
    this.router.navigate(['/courses']);
  }

  public ngOnInit() {
    let url = this.router.routerState.snapshot.url;

    const navigatedForEdit = /\/courses\/add/.test(url);
    let id: number;
    if (!navigatedForEdit) {
      url = url.slice(9);
      id = +url;
    }

    if (id != undefined) {
      this.item = this.coursesService.getCourseByID(id);
    } else {
      this.item = new CourseItem(undefined, '', false, new Date(), 0, '', []);
    }
    this.originalUser = this.item;
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
