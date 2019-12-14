import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Route } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, switchMap, map, tap } from 'rxjs/operators';

import { CourseItem } from 'src/app/shared/models/course';
import { CoursesObservableService } from 'src/app/courses/services/courses-observable.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit, OnDestroy {
  public item: CourseItem;
  private sub: Subscription;

  constructor(
    private router: Router,
		private route: ActivatedRoute,
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
        .subscribe((elem: CourseItem) => {
          this.onGoBack();
        }),
        error => console.log(error);
    }
  }

  public onGoBack() {
    this.router.navigate(['/courses']);
  }

  public ngOnInit() {
		this.item = new CourseItem(undefined, '', false, new Date(), 0, '', []);
		
		let url = this.router.routerState.snapshot.url;
		const navigatedForEdit = /\/courses\/add/.test(url);
    let id: number;
    if (!navigatedForEdit) {
      url = url.slice(9);
      id = +url;
    }

    // it is not necessary to save subscription to route.paramMap
    // when router destroys this component, it handles subscriptions automatically
    if (id !== undefined) this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
					return this.coursesObservableService.getCourseByID(+params.get('id'))
				}))
      .subscribe(
        course => this.item = course,
        err => console.log(err)
    );
  }

  public ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
