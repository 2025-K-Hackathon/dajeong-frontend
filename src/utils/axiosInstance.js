import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://www.dajeong.shop',
    withCredentials: true,
});

export default axiosInstance;