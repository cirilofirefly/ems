<template>
    <div class="flex">
        <Sidebar :navItems="navItems" />
        <div class="flex flex-col w-full">
            <div class="p-4">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Sidebar from '../components/Sidebar.vue'

const navItems = ref([
    { name: 'Dashboard', icon: 'speedometer', route: '/' },
    { 
        name: 'Events', 
        icon: 'calendar', 
        route: null, 
        collapse: false, 
        subRoutes: [
            { name: 'Management', icon: 'kanban', route: '/event/management' },
            { name: 'Registration', icon: 'people-fill', route: '/event/registration' },
        ] 
    },
]);
</script>