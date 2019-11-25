import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseItem } from 'src/app/shared/models/course';
import { CoursesService } from 'src/app/courses/services/courses-service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  public item: CourseItem;

  constructor(
		private coursesService: CoursesService,
		private router: Router
	) { }

	public onSaveItem() {
		this.coursesService.createCourse(this.item);
		this.onGoBack();
	}

	public onGoBack() {
    this.router.navigate(['/courses']);
  }

  public ngOnInit() {
		this.item = new CourseItem(this.coursesService.getList().length, '', false, new Date(), 0, '', '');
  }

}
