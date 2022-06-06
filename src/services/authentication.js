import { BehaviorSubject } from 'rxjs';
import { generateEncodedBody, getUrlEncodedAuthHeaders, handleResponse } from '../helpers/utility';
import { config } from '../config';


//const currentUserSubject = new BehaviorSubject(localStorage.getItem('token'));

export const authenticationServices = {
    authenticateUser,
    get currentUserValue () { return localStorage.getItem('token') },
    get currentUserName () { return localStorage.getItem('user') },
    authenticatePassword,
    changePassword,
    logout,
  };



async function authenticateUser(data) {
    const email = data['email'];
    const pwd = data['password'];
    const requestOptions = {
      method: "GET",
      mode: "cors",

    };
    
    return fetch(`${config.apiUrl}/user/login?email=${email}&password=${pwd}`, requestOptions)
      .then(handleResponse);
}

async function authenticatePassword(data) {
  const email = localStorage.getItem('user');
  const pwd = data
  const requestOptions = {
    method: "GET",
    mode: "cors",

  };
  
  return fetch(`${config.apiUrl}/user/checkPwd?email=${email}&password=${pwd}`, requestOptions)
    .then(handleResponse);
}

async function changePassword(data) {
  const email = localStorage.getItem('user');
  const pwd = data;
  const details = {email : email, password : pwd}
  console.log(details);

  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };
  console.log(requestOptions);
  return fetch(`${config.apiUrl}/user/changePwd`, requestOptions)
    .then(handleResponse);
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

}
