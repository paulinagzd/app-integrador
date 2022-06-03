import { useContext } from "react";
import { authenticationService } from "../services/authentication";

export function generateEncodedBody(details) {
  let formBody = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  return formBody.join("&");
}

export function handleResponse(response) {
  if (response.ok) {
      return response.json();
  }
  
  return response.json().then(( code, message) => {
    // Got valid JSON with error response, use it
    throw new Error(`${code}: ${message}`);
  });
}

export function getToken() {
  return authenticationService.currentUserValue.token;
}

export function getTokenHeader() {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
}

export function getUrlEncodedAuthHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": `Bearer: ${getToken()}`,
  //  " Access-Control-Allow-Credentials": true
  };
}

export function getGetParams(details) {
  let keyValues = [];
  for (const property in details) {
    keyValues.push(`${property}=${details[property]}`);
  }
  return keyValues.join("&");
}

export function createErrorOptions(error) {
  return {
    title: error.name,
    text: error.message,
    icon: "error",
    confirmButtonText: "Ok",
  };
}


export function openSection(id, section){
  if (section === "editar") {
    console.log("abrir editar");
  } else {
    console.log("abrir detalles");
  }
  console.log(id);
};