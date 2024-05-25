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
        alignItems: 'flex-start',
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
        <h2 :style="styleObject.h2">Experience</h2>
        <b :style="styleObject.b">Software Engineering Intern</b>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Company</b>: The Home Depot
        </p>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Location</b>: Atlanta, GA
        </p>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Duration</b>: May 2024 - July 2024
        </p>
        <ul :style="styleObject.ul">
            <li :style="styleObject.li">
                <b :style="styleObject.b">Project</b>: IT End to End Integration Performance Testing
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">Description</b>
                <p :style="styleObject.p">
                    : Worked as the only intern on a team of 10+ 
                    full-time employees and contractors to develop a performance testing framework for the 
                    integration of multiple IT tools.
                </p>
            </li>
        </ul>
        <br/>
        <b :style="styleObject.b">Technology Consultant</b>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Company</b>: Target
        </p>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Location</b>: Atlanta, GA
        </p>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Duration</b>: October 2023 - May 2024
        </p>
        <ul :style="styleObject.ul">
            <li :style="styleObject.li">
                <b :style="styleObject.b">Project</b>: Sales
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">Description</b>
                <p :style="styleObject.p">
                    : Worked as a technology consultant in the electronics department.
                </p>
            </li>
        </ul>
        <br/>
        <b :style="styleObject.b">Programming Intern and Instructor</b>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Company</b>: Kids Next Code
        </p>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Location</b>: Atlanta, GA
        </p>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Duration</b>: April 2023 - August 2023
        </p>
        <ul :style="styleObject.ul">
            <li :style="styleObject.li">
                <b :style="styleObject.b">Project</b>: Mentoring and Teaching Kids Programming
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">Description</b>
                <p :style="styleObject.p">
                    : Worked as a programming intern and instructor for Kids Next Code, 
                    an organization that teaches kids how to code.
                </p>
            </li>
        </ul>
    </div>
</template>

<style scoped>
</style>
