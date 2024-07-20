<script setup>
import { inject, onMounted, ref } from 'vue';
import CPagination from './CPagination.vue';
import dateFormat from '../helpers/dateFormat';

const props = defineProps({
    options: {
        type: Object,
        required: true,
    },
});

const axios = inject('axios');
const loading = ref(false);

const displayDatum = (datum, row) => {

    if(row.type === 'text') {
        return formatDatum(datum[row.columns[0].key], row.columns[0]?.format);
    }

    if(row.type === 'combined-columns') {

        let combinedColumns = '';

        row.columns.forEach((column) => {
            combinedColumns += `${formatDatum(datum[column.key], column?.format)} `
        });

        return combinedColumns
    }

    return datum[row.columns[0].key];
}

const formatDatum = (columnData, type = 'text') => {

    if(type === 'text') {
        return columnData;
    }

    if(type === 'date') {
        return  dateFormat(columnData);
    }

    if(type === 'time') {

        const [hours, minutes, seconds] = columnData.split(':');
        let hourTo12 = parseInt(hours) > 12 ? (parseInt(hours) - 12) : hours;

        return `${hourTo12}:${minutes} ${parseInt(hours) >= 12 ? 'PM' : 'AM'}`;

    }

    return columnData;
}

const apiData = ref({
    current_page: 0,
    last_page: 0,
    data: []
});

const getData = (page = 1) => {
    toggleLoading(true);
    axios.get(`${props.options?.endpoint}?page=${page}`)
        .then((response) => {
            apiData.value.data = response.data
            apiData.value.current_page = response.current_page
            apiData.value.last_page = response.last_page
            toggleLoading(false);
        });
}

const toggleLoading = (state) => {
    if(props.options?.loading) {
        loading.value = state
        return
    }

    loading.value = false
}

defineExpose({ getData });

onMounted(() => {
    getData();
});

</script>
<template>
    <div>
        <table class="table overflow-x-auto shadow rounded-xl">
            <thead>
                <tr>
                    <th 
                        v-for="(column, columnIndex) in options.columns" 
                        :key="columnIndex" 
                        :class="{ 'text-center' : column.centered }"
                    >
                        {{ column.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="loading">
                    <td colspan="8">
                        <div class="w-full flex items-center justify-center space-x-2 py-8">
                            <span class="loading loading-spinner loading-md"></span>
                            <p class="text-md font-semibold">Fetching data. Please wait...</p>
                        </div>
                    </td>
                </tr>
                <tr v-else v-for="(datum, datumIndex) of apiData.data" :key="datumIndex">
                    <td
                        v-for="row in options.rows" 
                        :colspan="row?.colspan" 
                        :class="{ 
                            'text-center' : row?.centered, 
                            'font-bold' : row?.bold 
                        }"
                    >
                        <slot :name="row.columns[0].key" :datum="datum">
                            {{ displayDatum(datum, row) }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>

        <CPagination 
            v-if="options?.pagination" 
            :current_page="apiData.current_page" 
            :last_page="apiData.last_page"
            @page-changed="getData($event)"
        />
    </div>
</template>