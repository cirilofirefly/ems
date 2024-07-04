<template>
    <div class="flex">
        <Sidebar :navItems="navItems" />
        <router-view />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Sidebar from '../components/Sidebar.vue'

const navItems = ref([
    { name: 'Dashboard', icon: 'speedometer', route: '/' },
    { name: 'Events', icon: 'calendar', route: null, collapse: false, subRoutes: [
        { name: 'Kape', icon: 'test', route: '/kape' },
        { name: 'Kape2', icon: 'test', route: '/kape2' },
    ] },
    { name: 'Dashboard', icon: 'test', route: '/', },
    { name: 'Dashboard', icon: 'test', route: '/' },
]);
</script>