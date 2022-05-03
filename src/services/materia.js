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
