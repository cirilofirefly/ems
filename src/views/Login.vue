<template>
    <div class="bg-blue-500">
        <div class="bg-white shadow-lg w-[40rem] h-screen flex flex-col items-center justify-center">
            <form @submit.prevent="login" class="flex flex-col items-start space-y-4">
                <h1 class="font-semibold text-3xl">Admin Login</h1>
                <CInput id="username" class="w-[20rem]" />
                <CInput id="password" :type="'password'" class="w-[20rem]" />
                <CButton class="mt-8" :type="ButtonType.SUBMIT" />
            </form>
        </div>
    </div>
</template>
<script setup>

import CInput from '../components/CInput.vue';
import CButton from '../components/CButton.vue';
import { ButtonType } from '../enums'

const login = () => {
    console.log('login')
}

</script>