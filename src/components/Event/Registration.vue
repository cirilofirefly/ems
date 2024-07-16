<script setup>
import { inject, ref } from 'vue';
import CButton from '../CButton.vue';
import CInput from '../CInput.vue';
import CError from '../CError.vue';

const axios = inject('axios');
const props = defineProps({
    eventId: {
        type: Number,
        required: true
    }
});

const user = ref({
    name: '',
    email: '',
    event_id: ''
});

const error = ref({});

const loading = ref(false);

const registerEvent = () => {
    loading.value = true;
    user.value.event_id = props.eventId;
    axios.post('register-user-event', user.value)
        .then(() => {
            loading.value = false;
            window.location.href = '/login'
        })
        .catch(({response}) => {
            loading.value = false;
            if(response?.data.errors) {
                error.value = response?.data.errors
            }

        });
};

</script>
<template>
    <div class="w-full flex flex-col" v-if="props.eventId">
        <h1 class="font-bold text-3xl mt-4 ml-8 mb-8">Register Event</h1>
        <form 
            @submit.prevent="registerEvent" 
            class="w-full flex flex-col items-center justify-center space-y-4"
        >
            <CInput class="w-3/4" v-model="user.name" placeholder="Enter your name" />
            <CError v-for="(error, index) in error['name']" :key="index" :message="error"/>
            <CInput type="email" class="w-3/4" v-model="user.email" placeholder="Enter your email" />
            <CError v-for="(error, index) in error['email']" :key="index" :message="error"/>
            <CButton class="btn-primary" title="Register Event" :loading="loading">
                <template #icon>
                    <span v-if="loading" class="loading loading-spinner loading-xs"></span>
                    <i v-else class="bi bi-calendar"></i>
                </template>
            </CButton>
        </form>
    </div>
</template>