<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import type { Project } from '@/types';

const props = defineProps<{project?: Project}>();

const project = ref(props.project);
</script>

<template >
    <span v-if="project">
        <span class="student-dashboard" v-if="project.name==='Student Dashboard'">
            <img src="@/assets/student_dashboard/student-dashboard.png"/>
            <img src="@/assets/student_dashboard/courses.png"/>
            <img src="@/assets/student_dashboard/applications.png"/>
            <img src="@/assets/student_dashboard/calendar.png"/>
            <img src="@/assets/student_dashboard/settings.png"/>
        </span>
        <span class="asteroids" v-if="project.name==='Asteroids Game'">
            <img src="@/assets/asteroids/loading.png"/>
            <img src="@/assets/asteroids/gameplay.png"/>
            <img src="@/assets/asteroids/gameover.png"/>
        </span>
        <span class="wrapped" v-if="project.name==='Wrap it Up'">
            <img src="@/assets/wrapped/login.png"/>
            <img src="@/assets/wrapped/account.png"/>
            <img src="@/assets/wrapped/create.png"/>
            <img src="@/assets/wrapped/createopen.png"/>
            <img src="@/assets/wrapped/summarystart.png"/>
            <img src="@/assets/wrapped/artists.png"/>
            <img src="@/assets/wrapped/songs.png"/>
            <img src="@/assets/wrapped/rec.png"/>
            <img src="@/assets/wrapped/genres.png"/>
            <img src="@/assets/wrapped/ai.png"/>
            <img src="@/assets/wrapped/summary.png"/>
        </span>
        <span class="roguelike" v-if="project.name==='Rogue-Like Game'">
            <img src="@/assets/roguelike/start.png"/>
            <img src="@/assets/roguelike/first.png"/>
            <img src="@/assets/roguelike/explore.png"/>
            <img src="@/assets/roguelike/inventory.png"/>
            <img src="@/assets/roguelike/rangedability.png"/>
        </span>
        <span class="keyboard" v-if="project.name==='Ergonomic Orthodox Keyboard'">
            <img src="@/assets/keyboard/keyboard.png"/>
        </span>
    </span>
</template>

<style scoped>
span {
    display: flex;
    justify-content: center;
    align-items: center;
}
img {
    display: block;
    margin: 0 auto;
}
.student-dashboard img {
    width: 20%;
}
.asteroids img {
    width: 33%;
}
.wrapped img {
    width: 9%;
}
.roguelike img {
    width: 20%;
}
.keyboard img {
    width: 40%;
}
</style>