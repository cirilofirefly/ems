<script setup>
import { inject, onMounted, ref } from 'vue';
import CButton from '../../components/CButton.vue';
import CTable from '../../components/CTable.vue';
import CInput from '../../components/CInput.vue';
import CModal from '../../components/CModal.vue';
import { useToast } from 'vue-toastification';
import dateFormat from '../../helpers/dateFormat';
import debounce from '../../helpers/debounce';

const search = ref('');
const events = ref([]);
const axios = inject('axios');
const toast = useToast();

const loadingTable = ref(false);

const modalList = ref({
    create: {
        open: false,
        processing: false,
        title: 'Create Event',
        fields: {
            title: '',
            date: '',
            time: '',
            content: ''
        },
        errors: {}
    },
    update: {
        open: false,
        processing: false,
        title: 'Update Event',
        fields: {},
        errors: {}
    },
    delete: {
        open: false,
        title: 'Delete Event',
        fields: {
            id: 0,
            
        }
    },
    content: {
        open: false,
        title: 'Event Content',
        content: ''
    }
});

const getEvents = () => {
    loadingTable.value = true;
    axios.get(`event?search=${search.value}`)
        .then((response) => {
            events.value = response.data;
            loadingTable.value = false;
        })
}

const createEvent = () => {
    resetErrorValues('create');
    modalList.value['create'].processing = true;
    axios.post('event', modalList.value['create'].fields)
        .then((response) => {
            toast.success('Event successfully created!');
            events.value.unshift({...response, total_participant: 0});
            modalList.value['create'].processing = false
            resetFormValues('create');
            toggleModal('create', false);
        })
        .catch(({response}) => {
            modalList.value['create'].processing = false
            if(response?.data?.errors) {
                modalList.value['create'].errors = response.data.errors;
            }
        })
}

const updateEvent = () => {
    resetErrorValues('update');
    modalList.value['update'].processing = true;
    axios.put(`event/${modalList.value['update'].fields?.id}`, modalList.value['update'].fields)
        .then((response) => {
            toast.success('Event successfully updated!');
            modalList.value['update'].processing = false
            
            events.value = events.value.map(event => {
                let updateEvent = { ... modalList.value['update'].fields }
                return event.id == modalList.value['update'].fields?.id ? 
                    updateEvent : 
                    event;
            })

            resetFormValues('update');
            toggleModal('update', false);
        })
        .catch((error) => {
            modalList.value['update'].processing = false;
        })
}

const deleteEvent = (id) => {
    modalList.value['delete'].processing = true;
    axios.delete(`event/${id}`)
        .then((response) => {
            toast.success('Event successfully deleted!');
            events.value = events.value.filter((event) => event.id != id);
            modalList.value['delete'].processing = false;
            resetFormValues('delete');
            toggleModal('delete', false);
        })
        .catch((error) => {
            modalList.value['delete'].processing = false;

        })
}

const resetFormValues = (formType) => {
    Object.entries(modalList.value[formType].fields).forEach(([key, _]) => {
        modalList.value[formType].fields[key] = ''; 
    });
}

const resetErrorValues = (formType) => {
    Object.entries(modalList.value[formType].errors).forEach(([key, _]) => {
        modalList.value[formType].errors[key] = []; 
    });
}

const toggleModal = (formType, state) => {
    modalList.value[formType].open = state
}

const options = {
    columns: [
        {
            name: '#',
            
        },
        {
            name: 'Title'
        },
        {
            name: 'Date and Time'
        },
        {
            name: 'Participants',
            centered: true
        },
        {
            name: 'Status',
            centered: true
        },
        {
            name: 'Actions',
            centered: true
        },
    ],
    rows: [
        {
            columns: [
                {
                   key: 'id',
                }
            ],
            type: 'text',
            colspan: 1,
            bold: true
        },
        {
            columns: [
                {
                   key: 'title',
                }
            ],
            type: 'text',
        },
        {
            columns: [
                {
                    key: 'date',
                    format: 'date'
                },
                {
                    key: 'time',
                    format: 'time'
                }
            ],
            type: 'combined-columns'
        },
        {
            columns: [
                {
                   key: 'total_participant',
                }
            ],
            type: 'text',
            centered: true,
            bold: true
        },
        {
            columns: [
                {
                   key: 'status',
                   format: 'status'
                }
            ],
            type: 'text',
            centered: true,
        },
        {
            columns: [
                {
                   key: 'action',
                }
            ],
            type: 'action',
            centered: true,
        },
    ],
}

onMounted(() => {
    getEvents();
});

</script>
<template>
    <div>
        <div class="flex justify-between items-center mt-4 mb-8">
            <CInput v-model="search" @keypress="getEvents" :placeholder="'Search'" id="search" class="w-[20rem]" />
            <CButton class="w-[8rem] btn-primary" @click="toggleModal('create', true)" :title="'Add Event'">
                <template #icon>
                    <i class="bi bi-calendar-event"></i>
                </template>
            </CButton>
        </div>

        <CTable 
            :options="options" 
            :data="events" 
            class="overflow-x-auto shadow rounded-xl mb-4"
        >
            <template #status="{ datum }">
                <div class="capitalize badge badge-primary badge-outline">
                    {{ datum.status }}
                </div>
            </template>
            <template #action="{ datum }">
                <div class="flex justify-center items-center space-x-2">
                    <CButton 
                        :title="''" 
                        class="btn btn-info text-white btn-sm items-center tooltip" 
                        data-tip="View Content"
                        @click="
                            modalList.content.content = datum.content;
                        toggleModal('content', true);
                        ">
                        <template #icon>
                            <i class="bi bi-eye"></i>
                        </template>
                    </CButton>
                    <CButton 
                        :title="''" 
                        class="btn btn-primary btn-sm items-center tooltip" 
                        data-tip="Edit" 
                        @click="
                            toggleModal('update', true);
                            modalList.update.fields = { ...datum };
                    ">
                        <template #icon>
                            <i class="bi bi-pencil-square"></i>
                        </template>
                    </CButton>
                    <CButton 
                        :title="''" 
                        class="btn btn-error btn-sm items-center tooltip" 
                        data-tip="Delete" 
                        @click="
                            toggleModal('delete', true);
                            modalList.delete.fields.id = datum.id;
                    ">
                        <template #icon>
                            <i class="bi bi-trash"></i>
                        </template>
                    </CButton>
                </div>
            </template>
        </CTable>

        <div class="join mt-4">
            <button class="join-item btn">1</button>
            <button class="join-item btn btn-active">2</button>
            <button class="join-item btn">3</button>
            <button class="join-item btn">4</button>
        </div>

        <CModal 
            :open="modalList.create.open" 
            :title="modalList.create.title" 
            @toggle="toggleModal('create', $event)"
            @submit-callback="createEvent"
        >

            <template #modal-body>

                <label class="form-control w-full max-w-full">
                    <div class="label">
                        <span class="label-text">Title</span>
                    </div>
                    <input v-model="modalList['create'].fields.title" type="text" placeholder="Enter your title"
                        class="input input-bordered w-full max-w-full" />
                    <div class="label" v-if="modalList['create'].errors['title']">
                        <span class="label-text text-error"
                            v-for="(error, index) in modalList['create'].errors['title']" :key="index">
                            {{ error }}
                        </span>
                    </div>
                </label>

                <div class="flex flex-row my-2 space-x-2">
                    <label class="form-control w-full max-w-full">
                        <div class="label">
                            <span class="label-text">Date</span>
                        </div>
                        <input v-model="modalList['create'].fields.date" type="date" placeholder="Type here"
                            class="input input-bordered w-full max-w-full" />
                        <div class="label" v-if="modalList['create'].errors['date']">
                            <span class="label-text text-error"
                                v-for="(error, index) in modalList['create'].errors['date']" :key="index">
                                {{ error }}
                            </span>
                        </div>
                    </label>
                    <label class="form-control w-full max-w-full">
                        <div class="label">
                            <span class="label-text">Time</span>
                        </div>
                        <input v-model="modalList['create'].fields.time" type="time" placeholder="Type here"
                            class="input input-bordered w-full max-w-full" />
                        <div class="label" v-if="modalList['create'].errors['time']">
                            <span class="label-text text-error"
                                v-for="(error, index) in modalList['create'].errors['time']" :key="index">
                                {{ error }}
                            </span>
                        </div>
                    </label>
                </div>

                <label class="form-control">
                    <div class="label">
                        <span class="label-text">Content</span>
                    </div>
                    <QuillEditor placeholder="Enter your content" class="!h-36" contentType="html"
                        v-model:content="modalList['create'].fields.content" theme="snow" />
                    <div class="label" v-if="modalList['create'].errors['content']">
                        <span class="label-text text-error"
                            v-for="(error, index) in modalList['create'].errors['content']" :key="index">
                            {{ error }}
                        </span>
                    </div>
                </label>

            </template>

            <template #action>
                <CButton class="btn btn-primary" type="submit" :title="'Save'" :loading="modalList.create.processing">
                    <template #icon>
                        <span v-if="modalList.create.processing" class="loading loading-spinner loading-xs"></span>
                        <i v-else class="bi bi-floppy"></i>
                    </template>
                </CButton>
                <CButton type="button" @click="
                        resetFormValues('create');
                        resetErrorValues('create');
                        toggleModal('create', false);
                    " :title="'Close'" />
            </template>
        </CModal>

        <CModal 
            :open="modalList.delete.open" 
            :title="modalList.delete.title" 
            @toggle="toggleModal('delete', $event)"
            @submit-callback="deleteEvent(modalList.delete.fields.id)"
        >
            <template #modal-body>
                Are you sure you want to delete this event?
            </template>

            <template #action>
                <CButton class="btn btn-primary" type="submit" :title="'Delete'" :loading="modalList.delete.processing">
                    <template #icon>
                        <span v-if="modalList.delete.processing" class="loading loading-spinner loading-xs"></span>
                        <i v-else class="bi bi-trash"></i>
                    </template>
                </CButton>
                <CButton type="button" @click="
                        resetFormValues('delete');
                        toggleModal('delete', false);
                    " :title="'Cancel'" />
            </template>
        </CModal>

        <CModal :open="modalList.update.open" :title="modalList.update.title" @toggle="toggleModal('update', $event)"
            @submit-callback="updateEvent">

            <template #modal-body>

                <label class="form-control w-full max-w-full">
                    <div class="label">
                        <span class="label-text">Title</span>
                    </div>
                    <input v-model="modalList['update'].fields.title" type="text" placeholder="Enter your title"
                        class="input input-bordered w-full max-w-full" />
                    <div class="label" v-if="modalList['update'].errors['title']">
                        <span class="label-text text-error"
                            v-for="(error, index) in modalList['update'].errors['title']" :key="index">
                            {{ error }}
                        </span>
                    </div>
                </label>

                <div class="flex flex-row my-2 space-x-2">
                    <label class="form-control w-full max-w-full">
                        <div class="label">
                            <span class="label-text">Date</span>
                        </div>
                        <input v-model="modalList['update'].fields.date" type="date" placeholder="Type here"
                            class="input input-bordered w-full max-w-full" />
                        <div class="label" v-if="modalList['update'].errors['date']">
                            <span class="label-text text-error"
                                v-for="(error, index) in modalList['update'].errors['date']" :key="index">
                                {{ error }}
                            </span>
                        </div>
                    </label>
                    <label class="form-control w-full max-w-full">
                        <div class="label">
                            <span class="label-text">Time</span>
                        </div>
                        <input v-model="modalList['update'].fields.time" type="time" placeholder="Type here"
                            class="input input-bordered w-full max-w-full" />
                        <div class="label" v-if="modalList['update'].errors['time']">
                            <span class="label-text text-error"
                                v-for="(error, index) in modalList['update'].errors['time']" :key="index">
                                {{ error }}
                            </span>
                        </div>
                    </label>
                </div>

                <label class="form-control">
                    <div class="label">
                        <span class="label-text">Content</span>
                    </div>
                    <textarea v-model="modalList['update'].fields.content" class="textarea textarea-bordered h-24"
                        placeholder="Enter your content"></textarea>
                    <div class="label" v-if="modalList['update'].errors['content']">
                        <span class="label-text text-error"
                            v-for="(error, index) in modalList['update'].errors['content']" :key="index">
                            {{ error }}
                        </span>
                    </div>
                </label>

            </template>

            <template #action>
                <CButton class="btn btn-primary" type="submit" :title="'Update'" :loading="modalList.update.processing">
                    <template #icon>
                        <span v-if="modalList.update.processing" class="loading loading-spinner loading-xs"></span>
                        <i v-else class="bi bi-floppy"></i>
                    </template>
                </CButton>
                <CButton type="button" @click="
                        resetFormValues('update');
                        resetErrorValues('update');
                        toggleModal('update', false);
                    " :title="'Close'" />
            </template>
        </CModal>

        <CModal :open="modalList.content.open" :title="modalList.content.title" @toggle="toggleModal('content', $event)"
            @submit-callback="false">
            <template #modal-body>
                <div class="max-h-[30rem]">
                    <div v-html="modalList.content.content"></div>
                </div>
            </template>
            <template #action />
        </CModal>
    </div>
</template>