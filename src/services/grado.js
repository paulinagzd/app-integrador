import { handleResponse } from '../helpers/utility';
import { config } from '../config';

async function getGradosByProfesor(profesorId) {
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
  };

  const res = await fetch(`${config.apiUrl}/grado_academico/profesor/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

export const gradoService = {
  getGradosByProfesor,
};
