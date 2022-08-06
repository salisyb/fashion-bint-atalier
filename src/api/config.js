import { create } from "apisauce";

// define the api
export const api = create({
  baseURL: "https://api-bint-atelier.herokuapp.com",
  headers: { Accept: "application/json" },
});

// export const api = create({
//   baseURL: "http://192.168.0.124:8000",
//   headers: { Accept: "application/json" },
// });
