import {
  generateEncodedBody,
  getGetParams,
  getTokenHeader,
  getUrlEncodedAuthHeaders,
  handleResponse,
} from "../helpers/utility";
import { config } from "../config";

export const profesorService = {
  getAllProfesores,
  editProfesor,
  // deleteProfesor,
};

async function createProfesor(data) {
  const details = data;

  const requestOptions = {
    method: "POST",
    mode: "no-cors",
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

async function editProfesor(data, id) {
  const details = data;

  const requestOptions = {
    method: "PUT",
    mode: "cors",
    //credentials: 'include',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };

  return fetch(`${config.apiUrl}/profesor/${id}`, requestOptions)
    .then(handleResponse)
    .then((profesorRes) => {
      console.log(`Edited profesor: ${profesorRes}`);
    });
}

async function getAllProfesores() {
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/profesor`, requestOptions);
  const data = await handleResponse(res);
  return data;
}
