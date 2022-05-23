import { handleResponse } from "../helpers/utility";
import { config } from "../config";

export const contratoService = {
  getAllContratos,
};

async function getAllContratos() {
  const requestOptions = {
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(`${config.apiUrl}/tipo_contrato`, requestOptions);
  const data = await handleResponse(res);
  return data;
}
