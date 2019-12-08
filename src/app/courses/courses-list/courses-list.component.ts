import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { CourseItem } from 'src/app/shared/models/course';
import { CoursesService } from 'src/app/courses/services/courses-service';
import { CoursesObservableService } from 'src/app/courses/services/courses-observable.service';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy/order-by.pipe';
import { SearchByPipe } from 'src/app/shared/pipes/searchBy/search-by.pipe';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  providers: [OrderByPipe, SearchByPipe],
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public searchText = '';
  public courses: CourseItem[];
  private data: any = [];
  public coursesError$: Observable < Error | string > ;

  constructor(
    private orderByPipe: OrderByPipe,
    private router: Router,
    private searchByPipe: SearchByPipe,
    private coursesService: CoursesService,
    private coursesObservableService: CoursesObservableService
  ) {}

  public onSearchText(text: string) {
    // this.courses = this.searchByPipe.transform(this.courses, text);

    this.coursesObservableService.getList(this.courses.length, 100, text).subscribe(data => {
      this.data = data;
      this.courses = [...this.data.map(elem => ({
        id: elem.id,
        title: elem.name,
        topRated: elem.isTopRated,
        creationDate: elem.date,
        duration: elem.length,
        description: elem.description,
        authors: elem.authors
      }))];
      this.coursesService.setList(this.courses);

    });
  }

  public onDeleteCourse(event: CourseItem) {
    if (confirm('Do you really want to delete this course? Yes/No')) {
      this.coursesObservableService.removeCourse(event).subscribe(data => {
        this.data = data;
        this.data = this.data.map(elem => ({
          id: elem.id,
          title: elem.name,
          topRated: elem.isTopRated,
          creationDate: elem.date,
          duration: elem.length,
          description: elem.description,
          authors: elem.authors
        }));

        setTimeout(() => {
          this.courses = this.orderByPipe.transform(this.data, 'creationDate');
          this.coursesService.setList(this.courses);
        });

      });
    }
  }

  public onCreateCourse() {
    const link = ['/courses/add'];
    this.router.navigate(link);
  }

  public onEditCourse(item: CourseItem) {
    const link = [`/courses/${item.id}`];
    this.router.navigate(link);
  }

  public onShowMore(): void {
    this.coursesObservableService.getList(this.courses.length, 5, '').subscribe(data => {
      this.data = data;
      this.courses.push(...this.data.map(elem => ({
        id: elem.id,
        title: elem.name,
        topRated: elem.isTopRated,
        creationDate: elem.date,
        duration: elem.length,
        description: elem.description,
        authors: elem.authors
      })));
      this.coursesService.setList(this.courses);
    });
  }

  public ngOnInit(): void {
    this.coursesObservableService.getList(0, 5, '').subscribe(response => {
      this.data = response;
      this.data = this.data.map(elem => ({
        id: elem.id,
        title: elem.name,
        topRated: elem.isTopRated,
        creationDate: elem.date,
        duration: elem.length,
        description: elem.description,
        authors: elem.authors
      }));

      setTimeout(() => {
        this.courses = this.orderByPipe.transform(this.data, 'creationDate');
        this.coursesService.setList(this.courses);
      });

    });
    // this.courses = this.orderByPipe.transform(this.coursesService.getList(), 'creationDate');
  }
}
