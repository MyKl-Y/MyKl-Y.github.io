<script setup lang="ts">
import type { Resume, Project } from '@/types';
import ProjectImages from './ProjectImages.vue';
import { ref, inject } from 'vue';

const resumes = inject<Resume[]>('resumes');

// TODO: Add project images to each project in the SQLite database
</script>

<template>
    <div v-if="resumes && resumes.length > 0" class="projects">
        <span v-for="(project, index) in resumes[0].projects.sort((a, b) => {
            if (a.date === 'Ongoing') return -1;
            if (b.date === 'Ongoing') return 1;
            let computed = new Date(b.date).getTime() - new Date(a.date).getTime();
            if (computed !== 0) return computed;
            return a.name.localeCompare(b.name);
        })">
            <h3 class="headers">
                <b class="user">({{ project.date }}) </b>
                <a style="font-weight: bold;" v-if="project.link.length > 0" :href="project.link" target="_blank">{{ project.name }}</a>
                <strong v-else>{{ project.name }}</strong>
                <i>{{ project.type }}</i>
            </h3>
            <span class="skills-container">
                &lt;
                <span class="skills">
                    <span class="skill" v-for="(skill, index) in project.skills">
                        <span class="path">{{ skill }}</span><span v-if="index !== project.skills.length - 1 && project.skills.length > 1">|</span>
                    </span>
                </span>
                &gt;
            </span>
            <ProjectImages :project="project" />
            <p class="details" v-for="detail in project.description">
                {{ detail }}
            </p>
            <span class="line"></span>
        </span>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ProjectsContent'
};
</script>

<style scoped>
.projects {
    font-size: 1rem;
}
.skills-container, .skills, .skill {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.skills {
    flex-wrap: wrap;
}
strong, b {
    font-weight: bold;
}
h2, h3, h4 {
    font-size: 1rem;
}
.user {
    font-weight: bold;
    color: var(--user-color);
}
.headers{
    color: var(--header-color);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.headers > * {
    width: 100%;
}
.headers strong, .headers a {
    text-align: center;
}
.headers i {
    text-align: right;
}
a {
    color: var(--header-color);
}
.path {
    color: var(--path-color);
    text-align: center;
    margin: 0 0.5rem;
}
.details {
    text-align: center;
}
.line {
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--header-color);
    margin: calc(.5rem - .5px) 0;
}
</style>