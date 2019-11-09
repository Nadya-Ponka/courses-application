import {
  CourseItem
} from '../models/course';

export const initialCourses: CourseItem[] = [new CourseItem(0, 'Video Course 1. Name tag 1', true, new Date('07/11/2009'), 88,
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
	when an unknown printer took a galley of type and scrambled it to make a type specimen book.`),
  new CourseItem(1, 'Video Course 2. Name tag 2', false, new Date('11/07/2019'), 55,
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
	when an unknown printer took a galley of type and scrambled it to make a type specimen book.`),
  new CourseItem(2, 'Video Course 3. Name tag 3', false, new Date('11/20/2019'), 115,
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
	when an unknown printer took a galley of type and scrambled it to make a type specimen book.`),
  new CourseItem(3, 'Video Course 4. Name tag 4', true, new Date('07/11/2020'), 45,
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
	when an unknown printer took a galley of type and scrambled it to make a type specimen book.`)
];
