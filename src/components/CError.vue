<script setup>
defineProps({
    message: {
        type: String,
        default: 'Error Message'
    }
})
</script>
<template>
    <p class="text-sm text-error my-2">{{ message }}</p>
</template>