import { generateEncodedBody, getGetParams, getTokenHeader, getUrlEncodedAuthHeaders, handleResponse } from '../helpers/utility';
import { config } from '../config';

export const profesorService = {
    createProfesor,
    /*getAllProfesores,
    editProfesor,
    deleteProfesor,*/
  };

  async function createProfesor(data) {
    const details = data;
  
    const requestOptions = {
      method: 'POST',
      mode: 'no-cors',
      //credentials: 'include',
      headers: getUrlEncodedAuthHeaders(),
      body: generateEncodedBody(details),
    };
    
    return fetch(`${config.apiUrl}/profesor`, requestOptions)
      .then(handleResponse)
      .then(profesorRes => {
        console.log(`Created profesor: ${profesorRes}`);
      });
  }