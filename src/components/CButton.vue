<script setup>

defineProps({
    title: {
        type: String,
        default: 'Title'
    },
    loading: {
        type: Boolean,
        default: false
    }
})

</script>
<template>
    <button 
        :disabled="loading" 
        class="flex btn"
    >
        <slot name="icon" />
        <p v-if="title">{{ loading ? 'Loading...' : title }}</p>
    </button>
</template>