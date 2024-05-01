<script setup>
import { ref } from 'vue'

const progress1 = ref(0)
const progress2 = ref(0)
const progress3 = ref(0)
const progress4 = ref(0)

let interval = setInterval(() => {
    progress1.value += 1
    if (progress1.value >= 100) {
        clearInterval(interval)
    }
}, 50)

setTimeout(() => {
    clearInterval(interval)
    progress1.value = 100
    interval = setInterval(() => {
        progress2.value += 1
        if (progress2.value >= 100) {
            clearInterval(interval)
        }
    }, 50)
}, 5000)

setTimeout(() => {
    clearInterval(interval)
    progress2.value = 100
    interval = setInterval(() => {
        progress3.value += 1
        if (progress3.value >= 100) {
            clearInterval(interval)
        }
    }, 50)
}, 10000)

setTimeout(() => {
    clearInterval(interval)
    progress3.value = 100
    interval = setInterval(() => {
        progress4.value += 1
        if (progress4.value >= 100) {
            clearInterval(interval)
        }
    }, 50)
}, 15000)

setTimeout(() => {
    clearInterval(interval)
    progress4.value = 100
}, 20000)

setTimeout(() => {
    window.location.href = '/launch'
}, 21000)

function progressBar(progress) {
    // [................................................] = 0%
    // [===================>............................] = 42%
    // [================================================] = 100%
    const barLength = Math.ceil(progress / 2)
    let bar = ''
    if (barLength < 48) {
        bar = '='.repeat(barLength - 1) + '>'.repeat(1) + '.'.repeat(50 - barLength - 2)
    } else {
        bar = '='.repeat(48)
    }
    return `[${bar}]`
}
</script>

<template>
    <div class="loading">
        <div class="console">
            <p>MYKL-Y. Personal Portfolio v3.0</p>
            <p>Copyright (C) 2024, MY Co.</p>
            <p>Brain Processing Unit (BPU) loaded at 200 Hz , 17 Processor(s) , 200 Billion Cores</p>
            <p>Memory: 200 TB , Storage: 200 PB</p>
            <p>Running diagnostics...</p>
            <p>{{ progressBar(progress1) }} {{ progress1 }}%</p>
            <p v-if="progress1 >= 100">Checking sensors...</p>
            <p v-if="progress1 >= 100">+------------------------------------------------+</p>
            <p v-if="progress1 >= 100">| ID : Register : Active : Register ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</p>
            <p v-if="progress1 >= 100">+------------------------------------------------+</p>
            <p v-if="progress1 >= 100">| 0&nbsp;&nbsp;: Sight&nbsp;&nbsp;&nbsp;&nbsp;: {{ progress2 >= 20 ? "Yes&nbsp;&nbsp;&nbsp;&nbsp;" : "No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" }}: x45 BF 6C 79 1A 65 73 |</p>
            <p v-if="progress1 >= 100">| 1&nbsp;&nbsp;: Hearing&nbsp;&nbsp;: {{ progress2 >= 40 ? "Yes&nbsp;&nbsp;&nbsp;&nbsp;" : "No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" }}: x45 BF 6C 79 1A 65 83 |</p>
            <p v-if="progress1 >= 100">| 2&nbsp;&nbsp;: Touch&nbsp;&nbsp;&nbsp;&nbsp;: {{ progress2 >= 60 ? "Yes&nbsp;&nbsp;&nbsp;&nbsp;" : "No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" }}: x45 BF 6C 79 1A 65 93 |</p>
            <p v-if="progress1 >= 100">| 3&nbsp;&nbsp;: Smell&nbsp;&nbsp;&nbsp;&nbsp;: {{ progress2 >= 80 ? "Yes&nbsp;&nbsp;&nbsp;&nbsp;" : "No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" }}: x45 BF 6C 79 1A 65 A3 |</p>
            <p v-if="progress1 >= 100">| 4&nbsp;&nbsp;: Taste&nbsp;&nbsp;&nbsp;&nbsp;: {{ progress2 >= 100 ? "Yes&nbsp;&nbsp;&nbsp;&nbsp;" : "No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" }}: x45 BF 6C 79 1A 65 B3 |</p>
            <p v-if="progress1 >= 100">+------------------------------------------------+</p>
            <p v-if="progress1 >= 100">{{ progressBar(progress2) }} {{ progress2 }}%</p>
            <p v-if="progress2 >= 100">Initializing...</p>
            <p v-if="progress2 >= 100">{{ progressBar(progress3) }} {{ progress3 }}%</p>
            <p v-if="progress3 >= 100">Booting up...</p>
            <p v-if="progress3 >= 100">{{ progressBar(progress4) }} {{ progress4 }}%</p>
            <p v-if="progress4 >= 100">Ready.</p>
        </div>
        <div class="logo">
            <img alt="Vue logo" src="@/assets/logo.svg" width="100" height="100" />
        </div>
    </div>
</template>

<style>
.loading {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 100vh;
    padding: 2rem;
}

.console {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    font-family: "Lucida Console", "Courier New", monospace;
    font-size: 1rem;
}
</style>