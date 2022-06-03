import { BehaviorSubject } from 'rxjs';
import { generateEncodedBody, getUrlEncodedAuthHeaders, handleResponse } from '../helpers/utility';
import { config } from '../config';

const user = {'id' : 0}
localStorage.setItem('currentUser', JSON.stringify(user));

const currentUserSubject = new BehaviorSubject(localStorage.getItem('currentUser'));

export const authenticationServices = {
    authenticateUser,
  };
export const authenticationService = {
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};
async function authenticateUser(data) {
    const email = data['email'];
    const pwd = data['password'];
    const requestOptions = {
      method: "GET",
      mode: "cors",
      //headers: getUrlEncodedAuthHeaders(),
      //body: generateEncodedBody(details),
    };
    //console.log(requestOptions);
    
    return fetch(`${config.apiUrl}/user/login?email=${email}&password=${pwd}`, requestOptions)
      .then(handleResponse);
}
  /*
const user = {'id' : 0}
localStorage.setItem('currentUser', JSON.stringify(user));

const currentUserSubject = new BehaviorSubject(localStorage.getItem('currentUser'));

export const authenticationService = {
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

*/
