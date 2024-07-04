<script setup>

defineProps({
    title: {
        type: String,
        default: 'Title'
    }
})

</script>
<template>
    <button class="btn-style">{{ title }}</button>
</template>
<style>
.btn-style {
    @apply rounded-md bg-blue-500 shadow-md px-2 py-1 text-white text-sm hover:ring-2;
}
</style>