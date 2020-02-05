import Axios from "axios";
import service from '../service/service';

 export const API_ROOT = 'http://localhost:8000/api';
const responseBody  = response => response.data;

export const request ={
    get: (url)=> Axios.get(`${API_ROOT}${url}`, service.getAuthHeader()).then(responseBody),
    post: (url, data = null)=> Axios.post(`${API_ROOT}${url}`, data, service.getAuthHeader()).then(responseBody)
}