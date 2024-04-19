import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_ROUTE;

console.log(API)

const veSignApi = axios.create({
    baseURL: API,
})

export default veSignApi;