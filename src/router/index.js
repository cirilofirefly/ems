import { createWebHistory, createRouter } from "vue-router";
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Event from '../views/Event/Event.vue'
import Management from '../views/Event/Management.vue'
import Registration from '../views/Event/Registration.vue'

import { getCookie, removeCookie } from '../cookies';
import { useToast } from "vue-toastification";

const toast = useToast();

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresAuthenticated: true
        }
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Home,
        meta: {
            requiresAuthenticated: true
        }
    },
    {
        path: '/event',
        name: 'Event',
        component: Event,
        meta: {
            requiresAuthenticated: true
        },
        children: [
            { path: 'management', component: Management, name: 'Event Management' },
            { path: 'registration', component: Registration, name: 'Event Registration' },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = `${import.meta.env.VITE_APP_TITLE} - ${to.name}`;
    if(to.meta.requiresAuthenticated && !getCookie('access_token')  && to.name != 'Login') {
        logoutUser();
    } else if(!to.meta.requiresAuthenticated && getCookie('access_token')  && to.name != 'Login') {
        logoutUser();
    } else next();
})

const logoutUser = () => {
    removeCookie('user');
    removeCookie('access_token');
    toast.warning('Session expired. Logged out.');
    setTimeout(() => window.location.href = '/login', 2000)
}

export default router;