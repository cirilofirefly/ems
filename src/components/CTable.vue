<script setup>
import dateFormat from '../helpers/dateFormat';

defineProps({
    options: {
        type: Object,
        required: true
    },
    data: {
        type: Array,
        default: []
    }
});

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

    if(row.type === 'actions') {

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

</script>
<template>
    <table class="table">
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
            <tr v-for="(datum, datumIndex) of data" :key="datumIndex">
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
</template>