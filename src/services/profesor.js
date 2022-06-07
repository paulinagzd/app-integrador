/* eslint-disable no-console */
import {
  generateEncodedBody,
  getUrlEncodedAuthHeaders,
  handleResponse,
} from '../helpers/utility';
import { config } from '../config';

async function editProfesor(data, id) {
  const details = data;

  const requestOptions = {
    method: 'PUT',
    mode: 'cors',
    // credentials: 'include',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };

  return fetch(`${config.apiUrl}/profesor/${id}`, requestOptions)
    .then(handleResponse)
    .then((profesorRes) => console.log(`Edited profesor: ${profesorRes}`));
}

async function getAllProfesores() {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),
        //credentials: 'include',
  };
  const res = await fetch(`${config.apiUrl}/profesor`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getProfesorIdByMateriaId(materiaId) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),
  };

  const res = await fetch(`${config.apiUrl}/materia_impartida/materia/${materiaId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getProfesorIdByEspecialidadId(especialidadId) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),
  };

  const res = await fetch(`${config.apiUrl}/tema_especialidad_profesor/${especialidadId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getProfesorIdByTipoContrato(tipoContrato) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),

  };

  const res = await fetch(`${config.apiUrl}/profesor/porContrato/${tipoContrato}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getProfesorByNomina(nomina) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),

  };
  const res = await fetch(`${config.apiUrl}/profesor/id/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getProfesorById(profesorId) {
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
  };

  const res = await fetch(`${config.apiUrl}/profesor/id/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getMateriasBloqueadasById(profesorId) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),

  };

  const res = await fetch(`${config.apiUrl}/materia_bloqueada/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getMateriasImpartidasById(profesorId) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),

  };

  const res = await fetch(`${config.apiUrl}/materia_impartida/profesor/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

export const profesorService = {
  getAllProfesores,
  getProfesorIdByMateriaId,
  getProfesorIdByEspecialidadId,
  getProfesorById,
  getProfesorByNomina,
  getMateriasBloqueadasById,
  getProfesorIdByTipoContrato,
  getMateriasImpartidasById,
  editProfesor,
};
