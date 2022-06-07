import { handleResponse, getTokenHeader} from "../helpers/utility";
import { config } from "../config";


async function getAllEspecialidades() {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: getTokenHeader(),

  };

  const res = await fetch(`${config.apiUrl}/tema_especialidad`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

async function getEspecialidadByProfesor(profesorId) {
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
    headers: getTokenHeader(),
  };

  const res = await fetch(`${config.apiUrl}/tema_especialidad_profesor/profesor/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
}

export const especialidadService = {
  getAllEspecialidades,
  getEspecialidadByProfesor,
};
