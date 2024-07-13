import axios from "axios";
import { useToast } from "vue-toastification";
import { getCookie } from '../cookies'

const toast = useToast();

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.interceptors.request.use(
    (config) => {
        const ACCESS_TOKEN = getCookie("access_token")
        ? `Bearer ${getCookie("access_token")}`
        : "";
        config.headers.Authorization = ACCESS_TOKEN;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    (response) => {
        
        if(response.status == 200 && response?.data.message) {
            toast.success(response.data.message);
        }

        return response.data
    },
    (error) => {
        toast.error(error?.message);
        return Promise.reject(error);
   }
);

export default axios;
