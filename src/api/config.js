import { create } from "apisauce";

// define the api
 export const api = create({
   baseURL: "https://apit-bint-atelier-production.up.railway.app",
   headers: { Accept: "application/json" },
 });

// export const api = create({
//  baseURL: "http://192.168.0.124:8000",
//  headers: {
//    Accept: "application/json",
//  },
//});
