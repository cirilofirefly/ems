import { createWebHistory, createRouter } from "vue-router";
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import { getCookie, removeCookie } from '../cookies';
import { useToast } from "vue-toastification";

const toast = useToast();

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuthenticated: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresAuthenticated: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = `${import.meta.env.VITE_APP_TITLE} - ${to.name}`;
    if(to.meta.requiresAuthenticated && !getCookie('access_token')  && to.name != 'Login') {
        logoutUser();
        next({ name: 'Login' });
    } else if(!to.meta.requiresAuthenticated && getCookie('access_token')  && to.name != 'Login') {
        logoutUser();
        next({ name: 'Login' });
    } else next();
})

const logoutUser = () => {
    toast.warning('Session expired. Logged out.');
    removeCookie('user');
    removeCookie('access_token');
}

export default router;