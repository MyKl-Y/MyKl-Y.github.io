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
        <h2 :style="styleObject.h2">Skills</h2>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Languages</b>: 
            Python, JavaScript, Java, C, C++, HTML, CSS, SQL, Kotlin, C#, MATLAB, Swift, TypeScript, Assembly, Shell, Bash
        </p>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Frameworks and Libraries</b>: 
            <ul :style="styleObject.ul">
                <li :style="styleObject.li">
                    <b :style="styleObject.b">Web Development</b>:
                    React, Vue, Angular, Node.js, Express, Flask, Django, Spring, GraphQL, Bootstrap, Tailwind CSS, Material-UI
                </li>
                <li :style="styleObject.li">
                    <b :style="styleObject.b">ML, AI, and Data Science</b>:
                    TensorFlow, PyTorch, OpenCV, NumPy, Pandas, Matplotlib
                </li>
                <li :style="styleObject.li">
                    <b :style="styleObject.b">Game Development</b>:
                    Unity, Unreal Engine, OpenGL
                </li>
                <li :style="styleObject.li">
                    <b :style="styleObject.b">Desktop Development</b>:
                    JavaFX, Electron, Tkinter
                </li>
            </ul>
        </p>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Tools and Utilities</b>:
            <ul :style="styleObject.ul">
                <li :style="styleObject.li">
                    <b :style="styleObject.b">Version Control</b>:
                    Git, GitHub Actions
                </li>
                <li :style="styleObject.li">
                    <b :style="styleObject.b">Containerization and DevOps</b>:
                    Docker
                </li>
                <li :style="styleObject.li">
                    <b :style="styleObject.b">Electronics and Hardware</b>:
                    KiCAD, QMK, Arduino, Raspberry Pi, ESP32
                </li>
                <li :style="styleObject.li">
                    <b :style="styleObject.b">Design</b>:
                    Adobe Creative Cloud, Figma
                </li>
                <li :style="styleObject.li">
                    <b :style="styleObject.b">Text Editors and IDEs</b>:
                    Emacs, Vim, Visual Studio Code, JetBrains, Eclipse
                </li>
                <li :style="styleObject.li">
                    <b :style="styleObject.b">Automation and Testing</b>:
                    Jupyter, Grafana, NeoLoad GUI
                </li>
                <li :style="styleObject.li">
                    <b :style="styleObject.b">Documentation and Typesetting</b>:
                    LaTeX, Microsoft Office
                </li>
            </ul>
        </p>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Databases</b>: MySQL, MongoDB, SQLite, Prometheus
        </p>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Cloud Platforms</b>: AWS, Azure, Heroku, Vercel, Netlify, Firebase
        </p>
        <p :style="styleObject.p">
            <b :style="styleObject.b">Operating Systems</b>: Windows, macOS, Linux, iOS, Android, Raspberry Pi OS, Unix
        </p>
    </div>
</template>

<style scoped>
</style>
