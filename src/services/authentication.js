/* eslint-disable no-unused-vars */
import { BehaviorSubject } from 'rxjs';
import { config } from '../config';

const user = { id: 0 };
localStorage.setItem('currentUser', JSON.stringify(user));

const currentUserSubject = new BehaviorSubject(localStorage.getItem('currentUser'));

export const authenticationService = {
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() { return currentUserSubject.value; },
};
