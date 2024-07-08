<template>
    <GuestLayout v-if="!isAuthenticated" />
    <AuthenticatedLayout v-else />
</template>

<script setup>
import GuestLayout from './layouts/GuestLayout.vue'
import AuthenticatedLayout from './layouts/AuthenticatedLayout.vue'
import { ref, computed } from 'vue';

const isAuthenticated = computed(() => false);
</script>