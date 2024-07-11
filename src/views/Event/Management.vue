<script setup>
import { ref } from 'vue';
import CButton from '../../components/CButton.vue';
import CInput from '../../components/CInput.vue';

const search = ref('');
const btnValue = ref(false);
</script>
<template>
    <div>
        <div class="flex justify-between items-center mt-4 mb-8">
            <CInput v-model="search" :placeholder="'Search'" id="search" class="w-[20rem]" />
            <CButton class="w-[8rem] btn-primary" @click="btnValue = true"  :title="'Add Event'" />
        </div>
        <div class="overflow-x-auto shadow rounded-xl">
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Participants</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                        <td>Blue</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="join mt-4">
                <button class="join-item btn">1</button>
                <button class="join-item btn btn-active">2</button>
                <button class="join-item btn">3</button>
                <button class="join-item btn">4</button>
            </div>

        <dialog id="modal_create_event" class="modal" :class="{'modal-open' : btnValue }">
            <div class="modal-box">
                <h3 class="text-lg font-bold">Create Event</h3>
                <div class="flex flex-col">
                    <label for="title" class="text-md font-bold mt-4">Title</label>
                    <CInput class="mb-2 mt-1" />
                    
                    <label for="title" class="text-md font-bold">Title</label>
                    <CInput class="mb-2 mt-1" />

                    <label for="title" class="text-md font-bold">Title</label>
                    <CInput class="mb-2 mt-1" />
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn" @click="btnValue = false">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
</template>