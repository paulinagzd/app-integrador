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
  // editProfesor,
  // deleteProfesor,
};


async function getAllProfesores() {
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/profesor`, requestOptions);
  const data = await handleResponse(res);
  return data;
}
