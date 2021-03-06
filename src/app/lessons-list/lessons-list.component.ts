import {Component, OnInit} from '@angular/core';
import {Lesson} from '../shared/model/lesson';
import {store} from '../event-bus-experiments/app-data';
import {Observer} from 'rxjs';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer<Lesson[]>, OnInit {

  lessons: Lesson[] = [];

  ngOnInit() {
    store.lessonsList$.subscribe(this);
  }

  toggleLessonViewed(lesson: Lesson) {
    console.log('toggling lesson ...');
    store.toggleLessonViewed(lesson);
  }

  delete(deleted: Lesson) {
    store.deleteLesson(deleted);
  }

  // RxJS:
  next = (data: Lesson[]) => {
    console.log('Lessons list component received data ..');
    console.log(data);
    this.lessons = data;
  };

  error = (err: any) => {
    console.log(err);
  };

  complete = () => {
    console.log('completed');
  };
}



