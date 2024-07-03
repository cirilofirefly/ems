<script setup>
const props = defineProps(({
    type: {
        type: String,
        default: 'text'
    }
}))
</script>
<template>
    <input 
        :type="props.type" 
        class="border-blue-500 border-2 focus:border-2 focus:border-blue-500 rounded-md px-2 py-1"
    >
</template>