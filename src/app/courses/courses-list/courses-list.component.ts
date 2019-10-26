import {
  Component,
  OnInit
} from '@angular/core';

import {
  CourseItem
} from '../../shared/models/course';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public courses: CourseItem[];
  constructor() {}

  public onSearchText(text: string): void {
    console.log('Text for search: ', text);
  }

  public onDeleteCourse(event: CourseItem): void {
    console.log('Course to delete: ', event.id);
  }

  ngOnInit() {
    this.courses = [{
        id: 0,
        title: 'Video Course 1. Name tag',
        creationDate: new Date('07/11/2009'),
        duration: 88,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
				Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
				when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
      },
      {
        id: 1,
        title: 'Video Course 1. Name tag',
        creationDate: new Date('07/11/2009'),
        duration: 55,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
				Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
				when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
      },
      {
        id: 2,
        title: 'Video Course 1. Name tag',
        creationDate: new Date('07/11/2009'),
        duration: 115,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
				Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
				when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
      },
      {
        id: 3,
        title: 'Video Course 1. Name tag',
        creationDate: new Date('07/11/2009'),
        duration: 45,
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
				Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
				when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
      }
    ];
  }

}
