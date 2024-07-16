<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import EventIndex from '../../components/Event/Index.vue';
import EventRegistration from '../../components/Event/Registration.vue';

const route = useRoute();
const eventId = ref(0);

const getEventId = (event_id) => eventId.value = event_id

</script>
<template>
    <div class="flex">
        <EventRegistration :eventId="eventId" />
        <EventIndex 
            :slug="route.params.slug"
            @event-fetched="getEventId($event)" 
        />
    </div>
</template>