<script setup>
import { ref, inject, onMounted } from 'vue';
import dateFormat from '../../helpers/dateFormat'
const props = defineProps({
    slug: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['eventFetched']);
const event = ref(null);
const loading = ref(false);
const axios = inject('axios');

const fetchEvent = (slug) => {
    loading.value = true
    axios.get(`/event/${slug}`)
        .then((response) => {
            event.value = response;
            emit('eventFetched', event.value.id);
            loading.value = false
        })
        .catch((error) => {
            console.log(error);
        })
}

onMounted(() => {
    fetchEvent(props.slug);
});

</script>
<template>
    <div class="relative w-full h-screen px-4 overflow-y-scroll" v-if="event && !loading">
        <div class="sticky top-0 bg-white">
            <h1 class="text-2xl font-bold mt-8 mb-2">{{ event.title }}</h1>
            <p class="text-base font-semibold mb-8">{{ `${dateFormat(event.date)} @ ${event.time}` }}</p>
        </div>
        <div v-html="event.content"></div>
    </div>
    <div v-else class="w-full h-screen flex items-center justify-center space-x-2">
        <span class="loading loading-spinner loading-md"></span>
        <p class="text-2xl font-medium">Fetching event. Please wait</p>
    </div>
</template>
