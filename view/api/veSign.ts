import axios from 'axios';

const veSignApi = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export default veSignApi;