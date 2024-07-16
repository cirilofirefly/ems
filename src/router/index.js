import { createWebHistory, createRouter } from "vue-router";
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Event from '../views/Event/Event.vue'
import Management from '../views/Event/Management.vue'
import EventIndex from '../views/Event/Index.vue'
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
            requiresAuth: true
        }
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/event',
        name: 'Event',
        component: Event,
        children: [
            { 
                path: 'management', 
                name: 'Event Management', 
                component: Management,
                meta: {
                    requiresAuth: true
                },
            },
            { 
                path: 'registration/:slug', 
                name: 'Event Registration',
                component: Registration, 
                meta: {
                    requiresAuth: false
                },
            },
            {
                path: '/:slug',
                name: 'Event Index',
                component: EventIndex,
                meta: {
                    requiresAuth: false
                }
            }
        ]
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = `${import.meta.env.VITE_APP_TITLE} - ${to.name}`;
    if(to.meta.requiresAuth && !getCookie('access_token')  && to.name != 'Login') {
        logoutUser();
    } else if(!to.meta.requiresAuth && getCookie('access_token')  && to.name != 'Login') {
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