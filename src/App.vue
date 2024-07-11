<template>
    <GuestLayout v-if="!isAuthenticated" />
    <AuthenticatedLayout v-else />
</template>

<script setup>
import GuestLayout from './layouts/GuestLayout.vue'
import AuthenticatedLayout from './layouts/AuthenticatedLayout.vue'
import { computed } from 'vue';
import { getCookie } from './cookies';

const isAuthenticated = computed(() => getCookie('access_token'));
</script>