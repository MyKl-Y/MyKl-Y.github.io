<template>
    <table>
        <tbody>
            <tr v-for="(row, rowIndex) in commandRows" :key="rowIndex">
                <td v-for="(command, colIndex) in row" :key="colIndex">
                    <strong>{{ command.name }}</strong>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

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
    name: 'HelpTable',
    props: {
        commands: {
            type: Map<string, CommandDetails>,
            required: true
        }
    },
    setup(props) {
        const sortedCommands = computed(() => {
            return Array.from(props.commands.entries()).sort(([a], [b]) => a.localeCompare(b));
        });

        const commandRows = computed(() => {
            const rows = [];
            const colCount = 3;
            for (let i = 0; i < sortedCommands.value.length; i += colCount) {
                rows.push(sortedCommands.value.slice(i, i + colCount).map(([name, desc]) => ({ name, desc })));
            }
            return rows;
        });

        return {
            commandRows
        };
    }
});
</script>


<style scoped>
table {
    border-collapse: collapse;
    margin-top: 0 !important;
}

tbody {
    display: block;
    width: 100%;
    overflow: auto;
}

th, td {
    width: 40%;
    text-align: left;
}
</style>
