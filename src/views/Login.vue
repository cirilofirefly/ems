<template>
    <div class="bg-blue-500">
        <div class="bg-white shadow-lg w-[40rem] h-screen flex flex-col items-center justify-center">
            <form @submit.prevent="login" class="flex flex-col items-start space-y-4">
                <h1 class="font-semibold text-3xl">Admin Login</h1>
                <CInput 
                    :placeholder="'Username or email'" 
                    id="username" 
                    class="w-[20rem]" 
                />
                <CInput 
                    :placeholder="'Password'" 
                    id="password" 
                    :type="'password'" 
                    class="w-[20rem]" 
                />
                <CButton 
                    class="mt-8 w-[5rem] h-[2rem] tracking-wide" 
                    :type="ButtonType.SUBMIT" 
                    :title="'Login'" 
                />
            </form>
        </div>
    </div>
</template>
<script setup>
import { inject } from 'vue';
import CInput from '../components/CInput.vue';
import CButton from '../components/CButton.vue';
import { ButtonType } from '../enums'

const axios = inject('axios');

const login = () => {
    
    axios.post('/login')
        .then((response) => {
            console.log(response);
        })
}

</script>