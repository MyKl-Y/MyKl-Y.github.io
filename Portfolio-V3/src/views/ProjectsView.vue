<script setup>
import { defineProps, reactive } from 'vue';

const props = defineProps({
    type: {
        type: String,
        required: true
    }
});

const styleType = props.type;
const windows98StyleObject = reactive({
    container: {
        backgroundColor: 'black',
        padding: '5px',
    },
    h2: {
        color: 'black',
    },
    p: {
        color: 'black',
    },
    ul: {
        color: 'black',
    },
    li: {
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    b: {
        color: 'black',
        fontWeight: 'bold',
    },
});
const macOSXStyleObject = reactive({
    h2: {
        color: 'white'
    },
});
const myOSStyleObject = reactive({
    h2: {
        color: 'black'
    },
});
const styleObject = styleType === 'windows-98' ? windows98StyleObject : styleType === 'mac-os-x' ? macOSXStyleObject : myOSStyleObject;
</script>

<template>
    <div :style="styleObject.container"></div>
</template>

<style scoped>
</style>
