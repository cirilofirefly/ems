<script setup>
const model = defineModel();
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
        v-model="model"
        :type="props.type"
        :placeholder="props.placeholder" 
        class="input input-bordered input-primary"
    >
</template>