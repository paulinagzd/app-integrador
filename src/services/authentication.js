import { BehaviorSubject } from 'rxjs';
import { generateEncodedBody, getUrlEncodedAuthHeaders, handleResponse } from '../helpers/utility';
import { config } from '../config';


//const currentUserSubject = new BehaviorSubject(localStorage.getItem('token'));

export const authenticationServices = {
    authenticateUser,
    get currentUserValue () { console.log("curruser ", localStorage.getItem('token')); return localStorage.getItem('token') },
    logout,
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

function logout() {
  console.log("pre remove");
  console.log(localStorage);
  localStorage.removeItem('token');
  console.log("post remove");
  console.log(localStorage);
}
