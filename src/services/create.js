import {
  generateEncodedBody,
  getUrlEncodedAuthHeaders,
  handleResponse,
} from '../helpers/utility';
import { config } from '../config';

async function createProfesor(data) {
  const details = data;

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };

  return fetch(`${config.apiUrl}/profesor`, requestOptions)
    .then(handleResponse);
}

async function createGradosAcademicos(data) {
  const details = data;

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };

  return fetch(`${config.apiUrl}/grado_academico`, requestOptions)
    .then(handleResponse);
}

async function createTemasEspecialidad(data) {
  const details = data;

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };

  return fetch(`${config.apiUrl}/tema_especialidad`, requestOptions)
    .then(handleResponse);
}

async function createTemasEspecialidadProf(data) {
  const details = data;

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };

  return fetch(`${config.apiUrl}/tema_especialidad_profesor`, requestOptions)
    .then(handleResponse);
}

async function createMaterias(data) {
  const details = data;

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };

  return fetch(`${config.apiUrl}/materia`, requestOptions)
    .then(handleResponse);
}

async function createMaestriasAceptadas(data) {
  const details = data;

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };

  return fetch(`${config.apiUrl}/maestria_aceptada`, requestOptions)
    .then(handleResponse);
}

async function createMateriasImpartidas(data) {
  const details = data;

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };

  return fetch(`${config.apiUrl}/materia_impartida`, requestOptions)
    .then(handleResponse);
}


async function createMateriasBloqueadas(data) {
  const details = data;

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };

  return fetch(`${config.apiUrl}/materia_bloqueada`, requestOptions)
    .then(handleResponse);
}

export const createService = {
  createProfesor,
  createGradosAcademicos,
  createTemasEspecialidad,
  createTemasEspecialidadProf,
  createMaterias,
  createMaestriasAceptadas,
  createMateriasImpartidas,
  createECOA,
  createMateriasBloqueadas,
};
