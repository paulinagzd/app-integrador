import { useContext } from "react";
import { authenticationServices } from "../services/authentication";
import { useNavigate } from "react-router-dom";

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
  } else {
    if (response.status == 403){
      authenticationServices.logout();
    }
    return response.json().then(function(error){
      throw new Error(`${error.errors[0].message} at ${error.errors[0].value}`)
      //throw new Error(`${error.original.code}: ${JSON.stringify(error.errors[0])}`)
      //throw new Error(error);
    });
  }
}

export function getToken() {
  return authenticationServices.currentUserValue;
}

export function getTokenHeader() {
  return {
    Authorization: `${getToken()}`,
  };
}

export function getUrlEncodedAuthHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": `${getToken()}`,
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