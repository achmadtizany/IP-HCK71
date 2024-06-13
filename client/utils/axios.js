import axios from 'axios';

export const localRequest = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "http://3.147.47.246/"
})