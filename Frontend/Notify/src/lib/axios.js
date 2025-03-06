// import axios from 'axios';

// export const axiosInstance = axios.create({
//     baseURL: 'http://localhost:5001/api/',
//     withCredentials: true,
// })

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials: true, // Ensure cookies are sent with requests
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export { axiosInstance };