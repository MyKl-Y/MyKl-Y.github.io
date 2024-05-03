<script setup>
import { ref, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import Windows98OS from '@/components/Windows98OS.vue';

defineProps({
    title: {
        type: String,
        required: true
    }
})

const route = useRoute();

const type = ref(route.params.type);
</script>

<template>
    <Windows98OS v-if="type=='Windows-98'"></Windows98OS>
</template>

<style>
.desktopContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

}

.desktopBody {
    width: 100%;
    height: 100%;
}

.desktopTaskbar {
    width: 100%;
    height: 100%;
}


.desktopAppBar {
    width: 100%;
    height: 100%;
}

.desktopDateTime {
    width: 100%;
    height: 100%;
}
</style>