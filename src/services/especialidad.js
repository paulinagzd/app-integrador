import { handleResponse } from "../helpers/utility";
import { config } from "../config";

export const especialidadService = {
  getAllEspecialidades,
};

async function getAllEspecialidades() {
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/tema_especialidad`, requestOptions);
  const data = await handleResponse(res);
  return data;
}
