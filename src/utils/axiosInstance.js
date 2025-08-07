import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
    baseURL: 'https://www.dajeong.shop',
});

axiosInstance.interceptors.request.use(
    async (config) => {
            const token = await AsyncStorage.getItem('token');
            console.log("token: ", token);
            if (token) {
                config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;