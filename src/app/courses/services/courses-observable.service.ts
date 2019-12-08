import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';

import { CoursesAPI } from 'src/app/courses/services/courses.config';
import { CourseItem } from 'src/app/shared/models/course';
import { CoursesService } from 'src/app/courses/services/courses-service';

@Injectable({
  providedIn: 'root'
})

export class CoursesObservableService {
  constructor(
    private coursesService: CoursesService,
    private http: HttpClient,
    @Inject(CoursesAPI) private coursesBaseUrl: string
  ) {}

  getList(startIndex: number, amount: number, searchInCourses: string): Observable < [] > {
    return this.http.get < [] > (this.coursesBaseUrl + `courses?start=${startIndex}&count=${amount}&textFragment=${searchInCourses}`);
  }

  getCourse(id: number): Observable < CourseItem > {
    const url = `${this.coursesBaseUrl}/${id}`;
    return this.http.get < CourseItem > (url)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  updateCourse(course: CourseItem): Observable < CourseItem > {
    const url = `${this.coursesBaseUrl}courses/${course.id}`;
    const toBody = {
      id: course.id,
      name: course.title,
      date: course.creationDate,
      length: course.duration,
      authors: course.authors,
      isTopRated: course.topRated,
      description: course.description
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http
      .put < CourseItem > (url, toBody, options)
      .pipe(catchError(this.handleError));
  }

  createCourse(course: CourseItem) {
    const url = this.coursesBaseUrl + 'courses';
    const toBody = {
      id: course.id,
      name: course.title,
      date: course.creationDate,
      length: course.duration,
      authors: course.authors,
      isTopRated: course.topRated,
      description: course.description
    };
    const body: any = JSON.stringify(toBody);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http
      .post(url, body, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  removeCourse(course: CourseItem) {
    const url = this.coursesBaseUrl + `courses/${course.id}`;
    return this.http.delete(url)
      .pipe(
        switchMap(() => this.getList(0, this.coursesService.getList().length - 1, '')),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }
}
