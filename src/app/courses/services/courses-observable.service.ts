import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, interval } from 'rxjs';
import { catchError, delay, switchMap, map, debounce } from 'rxjs/operators';

import { CoursesAPI } from 'src/app/courses/services/courses.config';
import { CourseItem } from 'src/app/shared/models/course';
import { SpinnerService } from 'src/app/widgets';

@Injectable({
  providedIn: 'root'
})

export class CoursesObservableService {
  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService,
    @Inject(CoursesAPI) private coursesBaseUrl: string
  ) {}

  getFullList() {
    const url = this.coursesBaseUrl + `courses`;
    this.spinnerService.show();
    return this.http.get(url)
      .pipe(
        delay(2000),
        map((courses: Array < any > ) => {
          const c = courses.map(course => {
            const result = new CourseItem(
              course.id,
              course.name,
              course.isTopRated,
              course.date,
              course.length,
              course.description,
              course.authors
            );

            return result;
          });
          return c;
        })
      );
  }

  getList(startIndex: number, amount: number, searchInCourses: string) {
    this.spinnerService.show();

    return this.http.get < [] > (this.coursesBaseUrl + `courses?start=${startIndex}&count=${amount}&textFragment=${searchInCourses}`)
      .pipe(
        delay(2000),
        map((courses: Array < any > ) => {
          const c = courses.map(course => {
            const result = new CourseItem(
              course.id,
              course.name,
              course.isTopRated,
              course.date,
              course.length,
              course.description,
              course.authors
            );
            return result;
          });

          return c;
        })
      );
  }

  getCourseByID(id: number): Observable < CourseItem > {
    this.spinnerService.show();

    const url = `${this.coursesBaseUrl}courses/${id}`;
    return this.http.get(url)
      .pipe(
        map((course: any) => {
          console.log('Ответ в бэкенда: ', course);
          const result = {
            id: course.id,
            title: course.name,
            topRated: course.isTopRated,
            creationDate: course.date,
            duration: course.length,
            description: course.description,
            authors: course.authors
          };
          console.log('RESULT: ', result);
          return result;
        }),
        catchError(this.handleError)
      );
  }

  updateCourse(course: CourseItem): Observable < CourseItem > {
    this.spinnerService.show();

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

    return this.http.put < CourseItem > (url, toBody, options)
      .pipe(catchError(this.handleError));
  }

  createCourse(course: CourseItem) {
    this.spinnerService.show();

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

    return this.http.post(url, body, options)
      .pipe(
        switchMap(() => this.getFullList()),
        catchError(this.handleError)
      );
  }

  removeCourse(course: CourseItem, listLength: number) {
    this.spinnerService.show();

    const url = this.coursesBaseUrl + `courses/${course.id}`;
    return this.http.delete(url)
      .pipe(
        switchMap(() => this.getList(0, listLength - 1, '')),
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
