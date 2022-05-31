import { handleResponse } from "../helpers/utility";
import { config } from "../config";

export const gradoService = {
  getGradosByProfesor,
};

async function getGradosByProfesor(profesorId) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/grado_academico/profesor/${profesorId}`, requestOptions);
  const data = await handleResponse(res);
  return data;
};
