import {
  generateEncodedBody,
  getGetParams,
  getTokenHeader,
  getUrlEncodedAuthHeaders,
  handleResponse,
} from "../helpers/utility";
import { config } from "../config";

export const materiaService = {
  getAllMaterias,
  getMateriaIdByCodigo,
  getMateriaCodigoById,
};

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




