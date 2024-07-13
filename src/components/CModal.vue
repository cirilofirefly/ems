<script setup>
defineProps({
    open: {
        type: Boolean,
        default: false,
        required: true
    },
    title: {
        type: String,
        default: 'Modal Title'
    },
})
const emit = defineEmits(['toggle', 'submitCallback']);
</script>
<template>
    <dialog class="modal" :class="{ 'modal-open': open }">
        <div class="modal-box">
            <form @submit.prevent="$emit('submitCallback')">
                <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
                <slot name="modal-body">
                    <p>Custom Modal Body</p>
                </slot>
                <div class="modal-action" v-if="$slots.action">
                    <slot name="action">
                        <button class="btn" @click="$emit('toggle', false)">Close</button>
                    </slot>
                </div>
            </form>
        </div>
    </dialog>
</template>