<template>
    <div v-if="resumes && resumes.length > 0" class="skills">
        .
        <span v-for="(skill_set, set_index) in resumes[0].skills.hard_skills">
            <p>
                <span v-if="set_index === 'tools'">└── </span>
                <span v-else>├── </span>
                <strong>{{ set_index.charAt(0).toUpperCase() + set_index.slice(1).replace("_", " ") }}:</strong>
            </p>
            <p v-for="(skill, index) in skill_set">
                <pre v-if="set_index !== 'tools' && index === skill_set.length - 1">│   └── {{ skill.name }}</pre>
                <pre v-else-if="set_index !== 'tools' && index !== skill_set.length - 1">│   ├── {{ skill.name }}</pre>
                <pre v-else-if="set_index === 'tools' && index === skill_set.length - 1">    └── {{ skill.name }}</pre>
                <pre v-else="set_index === 'tools' && index !== skill_set.length - 1">    ├── {{ skill.name }}</pre>
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
</style>