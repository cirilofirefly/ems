<template>
    <div class="bg-indigo-700">
        <div class="bg-white shadow-lg w-[40rem] h-screen flex flex-col items-center justify-center">
            <form @submit.prevent="login" class="flex flex-col items-start space-y-4">
                <h1 class="font-semibold text-3xl">Login</h1>
                <CInput v-model="credentials.email" :placeholder="'Email'" id="email" class="w-[20rem]" />
                <CError v-if="error.email" :message="error.email" />
                <CInput v-model="credentials.password" :placeholder="'Password'" id="password" :type="'password'"
                    class="w-[20rem]" />
                <CError v-if="error.password" :message="error.password" />
                <CButton 
                    class="w-[8rem] btn btn-primary" 
                    :type="ButtonType.SUBMIT" 
                    :title="'Login'" 
                    :loading="isLoading"
                >
                    <template #icon>
                        <span v-if="isLoading" class="loading loading-spinner loading-xs"></span>
                        <i v-else class="bi bi-box-arrow-in-left"></i>
                    </template>
                </CButton>
            </form>
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { setCookie } from '../cookies';
import CInput from '../components/CInput.vue';
import CButton from '../components/CButton.vue';
import CError from '../components/CError.vue';
import { ButtonType } from '../enums'

const axios = inject('axios');
const isLoading = ref(false);

const credentials = ref({
    email: '',
    password: ''
});

const error = ref({
    email: '',
    password: ''
});

const login = () => {
    resetLoginValues();
    axios.post('/login', credentials.value)
        .then((res) => {
            isLoading.value = false
            setLoginValues(res)
        })
        .catch(({ response }) => {
            isLoading.value = false
            setErrorValues(response?.data.errors)
        })
}

const resetLoginValues = () => {
    isLoading.value = true
    error.value = {
        email: '',
        password: ''
    }
}

const setLoginValues = (res) => {
    setCookie('user', res.data.user, '30min')
    setCookie('access_token', res.data.access_token, '30min');
    setTimeout(() => window.location.href = '/', 2000)
}

const setErrorValues = (errors) => {
    if (errors) {
        error.value = {
            email: errors.email[0] ?? '',
            password: errors.password[0] ?? '',
        }
    }
}

</script>