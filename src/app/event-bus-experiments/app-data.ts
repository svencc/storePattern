import * as _ from 'lodash';
import {Lesson} from '../shared/model/lesson';
import {Observable, BehaviorSubject} from 'rxjs';

class DataStore {
  private lessonsListSubject = new BehaviorSubject([]);
  public lessonsList$: Observable<Lesson[]> = this.lessonsListSubject.asObservable();

  initializeLessonsList(newList: Lesson[]) {
    this.lessonsListSubject.next(_.cloneDeep(newList));
  }

  addLesson(newLesson: Lesson) {
    const state = this.cloneState();
    state.push(_.cloneDeep(newLesson));
    this.lessonsListSubject.next(state);
  }

  deleteLesson(deleted: Lesson) {
    // _.remove(this.lessons,
    const state = this.cloneState();
    _.remove(state, lesson => lesson.id === deleted.id);
    this.lessonsListSubject.next(state);
  }

  toggleLessonViewed(toggled: Lesson) {
    const state = this.cloneState();
    const lesson = _.find(state, lesson => lesson.id === toggled.id);

    lesson.completed = !lesson.completed;
    this.lessonsListSubject.next(state);
  }

  private cloneState() {

    console.log('clone', this.lessonsListSubject.getValue());
    return _.cloneDeep(this.lessonsListSubject.getValue());
  }
}

export const store = new DataStore();







