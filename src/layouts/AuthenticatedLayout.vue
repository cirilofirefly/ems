<template>
    <div class="flex">
        <Sidebar :navItems="navItems" />
        <div class="flex flex-col w-full">
            <div class="p-4 mt-1">
                <h1 class="ml-4 font-bold text-3xl">{{ route.name }}</h1>
                <router-view class="mt-16" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from '../components/Sidebar.vue'

const route = useRoute();

const navItems = ref([
    { name: 'Dashboard', icon: 'speedometer', route: '/' },
    { 
        name: 'Events', 
        icon: 'calendar', 
        route: null, 
        collapse: true, 
        subRoutes: [
            { name: 'Management', icon: 'kanban', route: '/event/management' },
            { name: 'Registration', icon: 'people', route: '/event/registration' },
        ] 
    },
]);
</script>