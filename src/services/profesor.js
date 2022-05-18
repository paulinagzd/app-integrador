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
  getProfesorIdByMateriaId,
  getProfesorIdByEspecialidadId,
  getProfesorById,
  getMateriasBloqueadasById,
  getProfesorIdByTipoContrato
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

  const res = await fetch(`${config.apiUrl}/profesor`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getProfesorIdByMateriaId(materiaId){
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/materia_impartida/materia/${materiaId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getProfesorIdByEspecialidadId(especialidadId){
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/tema_especialidad_profesor/${especialidadId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getProfesorIdByTipoContrato(tipoContrato){
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/profesor/porContrato/${tipoContrato}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getProfesorById(profesorId){
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/profesor/id/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}


async function getMateriasBloqueadasById(profesorId){
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/materia_bloqueada/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}
