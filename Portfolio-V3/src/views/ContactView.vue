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
        backgroundColor: 'white',
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
    <div :style="styleObject.container">
        <h2 :style="styleObject.h2">Contact</h2>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Email</b>: 
            <a href="mailto:michaelyyim@gmail.com" style="color: black;">
                Email me on Gmail
            </a>
        </p>
        <p :style="styleObject.p">
            <b :style="styleObject.b">LinkedIn</b>: 
            <a href="https://www.linkedin.com/in/michaelyyim/" style="color: black;">
                Connect with Michael Yim-Olmos on LinkedIn
            </a>
        </p>
        <p :style="styleObject.p">
            <b :style="styleObject.b">GitHub</b>: 
            <a href="https://github.com/MyKl-Y" style="color: black;">
                View MyKl-Y's GitHub profile
            </a>
        </p>
    </div>
</template>

<style scoped>
</style>
