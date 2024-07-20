<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    current_page: {
        type: Number,
        required: true
    },
    last_page: {
        type: Number,
        required: true
    },
});

const emit = defineEmits(['pageChanged']);

const changePage = (page) => {
    currentPage.value = page;
    emit('pageChanged', currentPage.value);
}

const currentPage = ref(0);

watch(() => props.current_page, (newValue) => {
    currentPage.value = newValue
})

</script>
<template>
    <div class="join mt-4">
        <button 
            v-for="page in last_page"
            @click="changePage(page)"
            class="join-items btn" 
            :class="{'btn-active' : currentPage == page }" 
            :key="page"
        >
            {{ page }}
        </button>
    </div>
</template>