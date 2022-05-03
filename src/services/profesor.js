import {
  generateEncodedBody,
  getGetParams,
  getTokenHeader,
  getUrlEncodedAuthHeaders,
  handleResponse,
} from "../helpers/utility";
import { config } from "../config";

export const profesorService = {
  createProfesor,
  getAllProfesores,
  // editProfesor,
  // deleteProfesor,
};

async function createProfesor(data) {
  const details = data;

  const requestOptions = {
    method: "POST",
    mode: "cors",
    //credentials: 'include',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };

  return fetch(`${config.apiUrl}/profesor`, requestOptions)
    .then(handleResponse)
    .then((profesorRes) => {
      console.log(`Created profesor: ${profesorRes}`);
    });
}

async function getAllProfesores() {
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

<<<<<<< HEAD
  async function createProfesor(data) {
    const details = data;
  
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      //credentials: 'include',
      headers: getUrlEncodedAuthHeaders(),
      body: generateEncodedBody(details),
    };
    
    return fetch(`${config.apiUrl}/profesor`, requestOptions)
      .then(handleResponse)
      .then(profesorRes => {
        console.log(`Created profesor: ${profesorRes}`);
      });
  }
=======
  const res = await fetch(`${config.apiUrl}/profesor`, requestOptions);
  const data = await handleResponse(res);
  return data;
}
>>>>>>> main
