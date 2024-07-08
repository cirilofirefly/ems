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
        class="flex btn btn-primary"
    >
        <span v-if="loading" class="loading loading-spinner loading-md"></span>
        <p>{{ loading ? 'Loading...' : title }}</p>
    </button>
</template>