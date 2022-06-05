
import {
  generateEncodedBody,
  getGetParams,
  getTokenHeader,
  getUrlEncodedAuthHeaders,
  handleResponse,
} from "../helpers/utility";
import { config } from "../config";

export const maestriaAceptadaService = {
  createMaestriaAceptada,
  getAllMaestriasAceptadas,
  getMaestriasByMateria,
};

async function createMaestriaAceptada(data) {
  const details = data;

  const requestOptions = {
    method: 'POST',
    mode: 'no-cors',
    //credentials: 'include',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };
  
  return fetch(`${config.apiUrl}/maestria_aceptada`, requestOptions)
    .then(handleResponse)
    .then(maestriaAceptadaRes => {
      console.log(`Created maestria aceptaada: ${maestriaAceptadaRes}`);
    });
}

async function getAllMaestriasAceptadas() {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),

  };

  const res = await fetch(`${config.apiUrl}/maestria_aceptada`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getMaestriasByMateria(id) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),

  };

  const res = await fetch(`${config.apiUrl}/maestria_aceptada/${id}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}