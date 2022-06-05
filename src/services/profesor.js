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
  getProfesorIdByMateriaId,
  getProfesorIdByEspecialidadId,
  getProfesorById,
  getMateriasBloqueadasById,
  getProfesorIdByTipoContrato,
  getMateriasImpartidasById,
  // editProfesor,
  editProfesor,
  // deleteProfesor,
};


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
    headers: getTokenHeader(),
        //credentials: 'include',
  };
  const res = await fetch(`${config.apiUrl}/profesor`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getProfesorIdByMateriaId(materiaId){
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),
  };

  const res = await fetch(`${config.apiUrl}/materia_impartida/materia/${materiaId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getProfesorIdByEspecialidadId(especialidadId){
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),
  };

  const res = await fetch(`${config.apiUrl}/tema_especialidad_profesor/${especialidadId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getProfesorIdByTipoContrato(tipoContrato){
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),

  };

  const res = await fetch(`${config.apiUrl}/profesor/porContrato/${tipoContrato}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getProfesorById(profesorId){
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),

  };

  const res = await fetch(`${config.apiUrl}/profesor/id/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}


async function getMateriasBloqueadasById(profesorId){
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),

  };

  const res = await fetch(`${config.apiUrl}/materia_bloqueada/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getMateriasImpartidasById(profesorId){
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),

  };

  const res = await fetch(`${config.apiUrl}/materia_impartida/profesor/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}



