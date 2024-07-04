<script setup>
const props = defineProps(({
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: 'Enter your input'
    }
}))
</script>
<template>
    <input 
        :type="props.type"
        :placeholder="props.placeholder" 
        class="input-style"
    >
</template>
<style>
.input-style {
    @apply border-blue-500 border-2 focus:border-2 focus:border-blue-500 rounded px-2 py-1 placeholder:text-sm;
}
</style>