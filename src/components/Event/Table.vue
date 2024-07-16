<script setup>
defineProps({
    events: {
        type: Array,
        default: []
    },
    loading: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
    <div class="overflow-x-auto shadow rounded-xl">
        <table class="table">
            <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Participants</th>
                    <th>Content</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!loading" v-for="(event, index) in events" :key="index" class="hover:bg-slate-100">
                    <th>{{ event.id }}</th>
                    <td>{{ event.title }}</td>
                    <td>View Participants</td>
                    <td>
                        <div v-html="event.content"></div>
                    </td>
                    <slot name="action" >

                    </slot>
                    <td v-if="$slots.action" class="flex justify-center items-center space-x-2">
                        <slot name="action" />
                    </td>
                </tr>
                <tr v-else>
                    <td colspan="8" class="py-8 text-center">
                        <div class="flex justify-center items-center space-x-2">
                            <span class="loading loading-spinner"></span>
                            <p>Fetching data...</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>