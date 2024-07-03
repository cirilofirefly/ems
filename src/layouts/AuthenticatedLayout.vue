<template>
    <div class="flex">
        <Sidebar />
        <router-view />
    </div>
</template>
<script setup>
import Sidebar from '../components/Sidebar.vue'
</script>