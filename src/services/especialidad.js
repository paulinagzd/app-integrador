import { handleResponse } from "../helpers/utility";
import { config } from "../config";

export const especialidadService = {
  getAllEspecialidades,
  getEspecialidadByProfesor,
};

async function getAllEspecialidades() {
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/tema_especialidad`, requestOptions);
  const data = await handleResponse(res);
  return data;
};

async function getEspecialidadByProfesor(profesorId) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/tema_especialidad_profesor/profesor/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
};
