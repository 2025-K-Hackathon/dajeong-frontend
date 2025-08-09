import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
    baseURL: 'https://www.dajeong.shop',
    withCredentials: true,
});

export default axiosInstance;