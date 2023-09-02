import axios from "axios";

// const token = localStorage.getItem('token')

export const api = axios.create({
  baseURL: "https://sosriotcc.azurewebsites.net/v1/",
  // headers: { 'Authorization': token }
});

