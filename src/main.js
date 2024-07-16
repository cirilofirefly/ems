import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios';
import axios from './axios';
import Toast from "vue-toastification";
import { QuillEditor } from '@vueup/vue-quill';
import "vue-toastification/dist/index.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const options = {
    // You can set your default options here
};

const app = createApp(App);
app.use(router);
app.use(Toast, options);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);
app.component('QuillEditor', QuillEditor)
app.mount('#app');
