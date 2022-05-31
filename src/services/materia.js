import {
  generateEncodedBody,
  getGetParams,
  getTokenHeader,
  getUrlEncodedAuthHeaders,
  handleResponse,
} from "../helpers/utility";
import { config } from "../config";

export const materiaService = {
  createMateria,
  getAllMaterias,
  getMateriaIdByCodigo,
  getMaestriasAceptadas,
  getMateriaCodigoById,
  getMateriaCIPById,
  getMateriasImpartidasByProfesor,
  editMateria,
};

async function createMateria(data) {
  const details = data;

  const requestOptions = {
    method: "POST",
    mode: "no-cors",
    //credentials: 'include',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };

  return fetch(`${config.apiUrl}/materia`, requestOptions)
    .then(handleResponse)
    .then((materiaRes) => {
      console.log(`Created materia: ${materiaRes}`);
    });
}

async function editMateria(data, id) {
  const details = data;

  const requestOptions = {
    method: "PUT",
    // mode: "cors",
    //credentials: 'include',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };

  return fetch(`${config.apiUrl}/materia/${id}`, requestOptions)
    .then(handleResponse)
    .then(materiaRes => console.log(`Edited materia: ${materiaRes}`)
    );
}

async function getAllMaterias() {
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/materia`, requestOptions);
  const data = await handleResponse(res);

  return data;
}

async function getMateriaIdByCodigo(codigo) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/materia/${codigo}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getMateriaCodigoById(materiaId) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/materia/id/${materiaId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getMateriaCIPById(profesorId){
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/materia/id/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getMaestriasAceptadas(materiaId) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/maestria_aceptada/${materiaId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getMateriasImpartidasByProfesor(profesorId) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/materia_impartida/profesor/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}
