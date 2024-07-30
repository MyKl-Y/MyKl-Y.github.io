<template id="typewriter">
    <span>
        <span>{{ title }}</span>
        <span>{{ displayText.join('') }}</span>
    </span>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';

export default defineComponent({
    name: 'Typewriter',
    props: {
        title: {
            type: String,
            required: true
        },
        speed: {
            type: Number,
            default: 500
        },
        deleteSpeed: {
            type: Number,
            default: 166
        },
        words: {
            type: Array as () => string[],
            default: () => []
        }
    },
    setup(props) {
        const displayText = ref<string[]>([]);
        const currentWord = ref<string[]>([]);
        const wordIdx = ref<number>(0);

        const TYPE_SPEED = computed(() => props.speed);
        const DELETE_SPEED = computed(() => props.deleteSpeed);
        let timeoutSpeed = computed(() => TYPE_SPEED.value * 0.8);

        const start = () => {
            if (props.words && props.words.length > 0) {
                currentWord.value = props.words[wordIdx.value].split('');
                wordIdx.value++;
                setTimeout(type, timeoutSpeed.value);
            }
        };

        const type = () => {
            if (currentWord.value.length > 0) {
                displayText.value.push(currentWord.value.shift()!);
            } else if (currentWord.value.length === 0 && displayText.value.length > 0) {
                timeoutSpeed = DELETE_SPEED;
                displayText.value.pop();
            } else if (currentWord.value.length === 0 && displayText.value.length === 0) {
                if (wordIdx.value < props.words.length) {
                    currentWord.value = props.words[wordIdx.value].split('');
                    wordIdx.value++;
                    timeoutSpeed = TYPE_SPEED;
                    displayText.value.push(currentWord.value.shift()!);
                } else {
                    wordIdx.value = 0;
                    currentWord.value = props.words[wordIdx.value].split('');
                    displayText.value.push(currentWord.value.shift()!);
                }
            }
            setTimeout(type, timeoutSpeed.value);
        };

        onMounted(() => {
            start();
        });

        return {
            displayText,
            TYPE_SPEED,
            DELETE_SPEED
        };
    }
});
</script>

<style scoped>
/* Add your styles here if needed */
</style>