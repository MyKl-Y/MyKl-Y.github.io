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
        marginTop: '10px',
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
        <h2 :style="styleObject.h2">Education</h2>
        <b :style="styleObject.b">Georgia Institute of Technology</b>
        <p :style="styleObject.p">
            Bachelor of Science in Computer Science, Expected Graduation: May 2026
        </p>
        <p :style="styleObject.p">
            Concentration: Information Internetworks and Systems Architecture
        </p>
        <p :style="styleObject.p">
            Minors: Robotics for Automation (AI/ML) and Perception (Signal & Information Processing)
        </p>
        <p :style="styleObject.p">
            At Georgia Tech, I am pursuing an ambitious course of study that spans several cutting-edge fields integral to modern computer science.
            My primary focus lies in Intelligence and Devices, equipping me with in-depth knowledge and practical skills in artificial intelligence, 
            machine learning, and digital system design. Additionally, my minors in Robotics and Mathematics provide a strong foundation in advanced 
            algorithms, signal processing, and automation technologies.
        </p>
        <p :style="styleObject.p">
            Key Courses:
        </p>
        <ul :style="styleObject.ul">
            <li :style="styleObject.li">
                <b :style="styleObject.b">CS 1331</b>: Introduction to Object-Oriented Programming
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">CS 1332</b>: Data Structures and Algorithms
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">CS 1372</b>: Program Design for Engineers
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">CS 2110</b>: Computer Organization and Programming
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">CS 2200</b>: Systems and Networks
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">CS 2340</b>: Objects and Design
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">CS 3510</b>: Design and Analysis of Algorithms
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">CS 4400</b>: Introduction to Database Systems 
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">ECE 2026</b>: Introduction to Signal Processing
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">ECON 2105</b>: Principles of Macroeconomics
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">MATH 1554</b>: Linear Algebra
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">MATH 2050</b>: Discrete Mathematics
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">MATH 2550</b>: Multivariate Calculus
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">MATH 3670</b>: Statistics and Probability with Applications
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">PHYS 2211</b>: Introductory Physics I
            </li>
            <li :style="styleObject.li">
                <b :style="styleObject.b">PHYS 2212</b>: Introductory Physics II
            </li>
        </ul>
    </div>
</template>

<style scoped>
</style>
