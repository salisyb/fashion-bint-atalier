import { create } from "apisauce";

// define the api
export const api = create({
  baseURL: "https://api-bint-atelier.herokuapp.com",
  headers: { Accept: "application/json" },
});
