import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.interceptors.request.use(
    (config) => {
        const ACCESS_TOKEN = localStorage.getItem("access_token")
        ? `Bearer ${localStorage.getItem("access_token")}`
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
        console.log(error)
        toast.error(error?.message);
        return Promise.reject(error);
   }
);

export default axios;
