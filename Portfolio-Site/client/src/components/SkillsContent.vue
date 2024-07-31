<template>
    <div v-if="resumes && resumes.length > 0" class="skills">
        <span class="root">.</span>
        <span v-for="(skill_set, set_index) in resumes[0].skills.hard_skills">
            <p>
                <span v-if="set_index === 'tools'">└── </span>
                <span v-else>├── </span>
                <strong class="headers">{{ set_index.charAt(0).toUpperCase() + set_index.slice(1).replace("_", " ") }}:</strong>
            </p>
            <p v-for="(skill, index) in skill_set">
                <span v-if="set_index !== 'tools' && index === skill_set.length - 1">│&nbsp;&nbsp;&nbsp;└── </span>
                <span v-else-if="set_index !== 'tools' && index !== skill_set.length - 1">│&nbsp;&nbsp;&nbsp;├── </span>
                <span v-else-if="set_index === 'tools' && index === skill_set.length - 1">&nbsp;&nbsp;&nbsp;&nbsp;└── </span>
                <span v-else="set_index === 'tools' && index !== skill_set.length - 1">&nbsp;&nbsp;&nbsp;&nbsp;├── </span>
                <span class="bar" v-for="index in Math.floor(skill.proficiency/10)" :key="index">▓</span>
                <span class="bar" v-for="index in Math.ceil(skill.proficiency%10/5)" :key="index">▒</span>
                <span class="bar" v-for="n in 10-Math.floor(skill.proficiency/10)-Math.ceil(skill.proficiency%10/5)">░</span>
                <span>{{  }} {{skill.proficiency }}%</span>
                {{ skill.name }}
            </p>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Api from '@/api';
import type { Resume } from '@/types';

export default defineComponent({
    name: 'SkillsContent',
    setup() {
        const resumes = ref<Resume[]>([]);

        const fetchResumes = async () => {
            try {
                const response = await Api.getResumes();
                resumes.value = response.data;
            } catch (error) {
                console.error('Error fetching resumes:', error);
            }
        };

        onMounted(() => {
            fetchResumes();
        });

        return {
            resumes
        };
    }
});
</script>

<style scoped>
.skills {
    line-height: 1.25rem;
}
.root {
    font-weight: bold;
    color: var(--path-color);
}
.headers {
    font-weight: bold;
    color: var(--header-color);
}
.bar {
    color: var(--user-color);
}
</style>