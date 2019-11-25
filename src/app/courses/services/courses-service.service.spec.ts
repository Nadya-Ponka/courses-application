import { CoursesService } from 'src/app/courses/services/courses-service';
import { initialCourses } from 'src/app/shared/data/courses';

describe('CoursesService', () => {
  const data = {
    id: 0,
    title: 'Video Course 1. Name tag',
    topRated: true,
    creationDate: new Date('07/11/2009'),
    duration: 88,
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
		Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,
		when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
  };

  let service: CoursesService;

  beforeEach(() => {
    service = new CoursesService();
  });

  it('CoursesService.getList should return initial courses list', () => {
    expect(service.getList()).toEqual(initialCourses);
  });

  it('CoursesService.getCourseByID should return courses by id', () => {
    expect(service.getCourseByID(1)).toEqual(initialCourses[0]);
  });

  it('CoursesService.createCourse should create course', () => {
    initialCourses.push(data);
    expect(service.createCourse(data)).toEqual(initialCourses);
  });

  it('CoursesService.removeCourse should remove course', () => {
    expect(service.removeCourse(data)).toEqual(initialCourses.filter(el => el.id !== data.id));
  });

});
