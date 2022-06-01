import {
  generateEncodedBody,
  getUrlEncodedAuthHeaders,
  handleResponse,
} from '../helpers/utility';
import { config } from '../config';

async function createMaestriaAceptada(data) {
  const details = data;

  const requestOptions = {
    method: 'POST',
    mode: 'no-cors',
    // credentials: 'include',
    headers: getUrlEncodedAuthHeaders(),
    body: generateEncodedBody(details),
  };

  return fetch(`${config.apiUrl}/maestria_aceptada`, requestOptions)
    .then(handleResponse)
    .then((maestriaAceptadaRes) => {
      // eslint-disable-next-line no-console
      console.log(`Created maestria aceptaada: ${maestriaAceptadaRes}`);
    });
}

async function getAllMaestriasAceptadas() {
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
  };

  const res = await fetch(`${config.apiUrl}/maestria_aceptada`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getMaestriasByMateria(id) {
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
  };

  const res = await fetch(`${config.apiUrl}/maestria_aceptada/${id}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

export const maestriaAceptadaService = {
  createMaestriaAceptada,
  getAllMaestriasAceptadas,
  getMaestriasByMateria,
};
