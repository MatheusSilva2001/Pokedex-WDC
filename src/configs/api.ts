import axios from "axios";

const envAPI = import.meta.env.VITE_API;

console.log(import.meta.env);
console.log(envAPI);


export const API = axios.create({
    baseURL: envAPI,
})