<script setup>
import { RouterView } from 'vue-router'

defineProps({
    title: {
        type: String,
        required: true
    },
    change: {
        type: Function,
        required: true
    }
})
</script>

<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink to="/home"><img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="20" height="20" /></RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/skills">Skills</RouterLink>
                <RouterLink to="/experience">Experience</RouterLink>
                <RouterLink to="/education">Education</RouterLink>
                <RouterLink to="/projects">Projects</RouterLink>
                <RouterLink to="/contact">Contact</RouterLink>
            </nav>
        </div>
    </header>
    <div :class="'window ' + title.replaceAll(/\s/g,'')">
        <div class="window-header">
            <div class="window-controls">
                <h1 class="window-title">{{ title }}</h1>
                <button aria-label="Minimize">-</button>
                <button aria-label="Maximize">+</button>
                <button aria-label="Close" @click="change('')">x</button>
            </div>
        </div>
        <RouterView />
    </div>
</template>

<style scoped>

.window {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 100;
    display: flex;
    flex-direction: column;
}

.window-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: lightgray;
    color: black;
}

.window-controls {
    display: flex;
    align-items: center;
}

.window-title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
    color: black;
}

button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    padding: 0.5rem;
    margin-left: 0.5rem;
    color: black;
}

button:hover {
    background-color: gray;
}

button:active {
    background-color: blue;
}

button[aria-label="Close"] {
    color: black;
}

button[aria-label="Close"]:hover {
    background-color: red;
}

button[aria-label="Close"]:active {
    background-color: darkred;
}

button[aria-label="Minimize"] {
    color: black;
}

button[aria-label="Minimize"]:hover {
    background-color: yellow;
}

button[aria-label="Minimize"]:active {
    background-color: darkgoldenrod;
}

button[aria-label="Maximize"] {
    color: black;
}

button[aria-label="Maximize"]:hover {
    background-color: green;
}

button[aria-label="Maximize"]:active {
    background-color: darkgreen;
}

@media (min-width: 1024px) {
    .window {
        width: 50%;
        height: 50%;
        top: 25%;
        left: 25%;
    }
}

</style>