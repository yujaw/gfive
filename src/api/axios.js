import axios from 'axios';
// const BASE_URL = 'http://192.168.1.74:4000';
const BASE_URL = 'https://backend-g56l.onrender.com/';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});