<template>
    <div>
        <h1>NAME</h1>
        <code>{{ command.name }}</code> - {{ command.desc }}
        <h1>SYNTAX</h1>
        <code>{{ command.syntax }}</code>
        <h1>USAGE</h1>
        <code>{{ command.usage }}</code>
        <h1 v-if="command.aliases.length > 0">ALIASES</h1>
        <span v-if="command.aliases.length > 0" v-for="(alias, index) in command.aliases" :key="index">
            <code>{{ alias }}</code>
            <span v-if="index < command.aliases.length - 1">, </span>
        </span>
        <h1 v-if="command.arguments.length > 0">ARGUMENTS</h1>
        <span v-if="command.arguments.length > 0" v-for="arg in command.arguments" :key="arg.arg">
            <code>{{ arg.arg }}</code>
            <p>{{ arg.desc }}</p>
        </span>
        <h1 v-if="command.options.length > 0">OPTIONS</h1>
        <span v-for="opt in command.options" :key="opt.opt">
            <code>{{ opt.opt }}</code>
            <p>{{ opt.desc }}</p>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface CommandDetails {
    name: string;
    desc: string;
    syntax: string;
    usage: string;
    aliases: string[];
    arguments: { arg: string, desc: string }[];
    options: { opt: string, desc: string }[];
}

export default defineComponent({
    name: 'ManualPage',
    props: {
        command: {
            type: Object as () => CommandDetails,
            required: true
        }
    }
});
</script>

<style scoped>
h1 {
    color: var(--header-color);
    font-size: 1rem;
    font-weight: bolder;
    margin: 1rem 0;
}
h1:first-child {
    margin-top: 0 !important;
}

:not(h1, div, span) {
    margin-left: 1rem;
}

code {
    font-weight: bold;
}

div:last-child {
    margin-bottom: 1rem;
}
</style>
