<template>
    <div class="resume" v-if="resumes && resumes.length > 0">
        <h1>{{ resumes[0].name }}</h1>
        <p class="contact">
            {{ resumes[0].email }} 
            | (***) ***-****
            | *****, GA 
            | <a href="https://www.linkedin.com/in/michael-yim-olmos/" target="_blank">LinkedIn</a>
            | <a href="https://github.com/MyKl-Y" target="_blank">GitHub</a>
            | <u>Portfolio</u>
        </p>
        <h2 v-if="resumes[0].summary.length > 3">SUMMARY</h2>
        <span class="line" v-if="resumes[0].summary.length > 3"></span>
        <p v-if="resumes[0].summary.length > 3">{{ resumes[0].summary }}</p>
        <h2>SKILLS</h2>
        <span class="line"></span>
        <h3><strong>Hard Skills:</strong></h3>
        <span v-for="(items, category) in resumes[0].skills.hard_skills" :key="category">
            <strong>{{ category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ") }}: </strong>
            <span v-for="(item, index) in items" :key="item.name">{{ item.name }}<span v-if="index < items.length - 1">, </span></span>
            <br/>
        </span>
        <h3><strong>Soft Skills:</strong></h3>
        <span v-for="(skill, index) in resumes[0].skills.soft_skills" :key="skill">{{ skill }}<span v-if="index < resumes[0].skills.soft_skills.length - 1">, </span></span>
        <h2>EDUCATION</h2>
        <span class="line"></span>
        <span v-for="(major, index) in resumes[0].education.major" :key="index">
            <h3>
                <strong>{{ resumes[0].education.school }}</strong> 
                - <span>
                    {{ major.type }} in {{ major.name }}
                </span>
            </h3>
            <h4>
                <span>
                    Expected {{ new Date(resumes[0].education.expected_grad_date + -1).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) }}
                </span>
                <span> {{ resumes[0].education.location }}</span>
            </h4>
            <ul>
                <li v-if="major.concentration.length > 0">
                    <strong>Concentrations</strong>: 
                    <span v-for="(concentration, index) in major.concentration" :key="concentration">{{ concentration }}<span v-if="index !== major.concentration.length - 1 && major.concentration.length > 2">, </span>{{ " " }}<u v-if="index === major.concentration.length - 2 && major.concentration.length !== 0">and</u>{{ " " }}
                    </span>
                </li>
                <li v-if="resumes[0].education.minors.length > 0">
                    <strong>Minors</strong>: 
                    <span v-for="(minor, index) in resumes[0].education.minors" :key="minor">{{ minor }}<span v-if="index !== resumes[0].education.minors.length - 1 && resumes[0].education.minors.length > 2">, </span>{{ " " }}<u v-if="index === resumes[0].education.minors.length - 2 && resumes[0].education.minors.length !== 0">and</u>{{ " " }}
                    </span>
                </li>
                <li>
                    <strong>Cumulative GPA</strong>: 
                    <span>{{ resumes[0].education.gpa }}</span>
                </li>
                <li>
                    <strong>Relevant Coursework</strong>: 
                    <ul class="courses">
                        <li v-for="course in [...resumes[0].education.courses].reverse()" :key="course">{{ course }}</li>
                    </ul>
                </li>
                <li v-if="resumes[0].education.awards.length > 0">
                    <strong>Awards</strong>: 
                    <span v-for="(award, index) in resumes[0].education.awards" :key="award">{{ award }}<span v-if="index !== resumes[0].education.awards.length - 1 && resumes[0].education.awards.length > 1">, </span></span>
                </li>
            </ul>
        </span>
        <h2>PROJECTS</h2>
        <span class="line"></span>
        <span v-for="project in resumes[0].projects" :key="project.name">
            <h3>
                <a v-if="project.link.length > 0" :href="project.link" target="_blank">{{ project.name }}</a>
                <strong v-else>{{ project.name }}</strong> - 
                <i>{{ project.type }}</i>
            </h3>
            <ul>
                <li v-for="detail in project.description" :key="detail">{{ detail }}</li>
            </ul>
        </span>
        <h2>EXPERIENCE</h2>
        <span class="line"></span>
        <span v-for="job in resumes[0].experience" :key="job.company + job.role + job.type">
            <h3>
                <strong>{{ job.company }}</strong> - 
                <i>{{ job.role }}</i>
                ({{ job. type }})
            </h3>
            <h4>
                <span>
                    {{ new Date(job.start).toLocaleDateString('en-US', {month: 'long', year: 'numeric'}) }} - 
                    {{ new Date(job.end).toLocaleDateString('en-US', {month: 'long', year: 'numeric'}) }}
                </span>
                <span>{{ job.location }}</span>
            </h4>
            <ul>
                <li v-for="detail in job.description" :key="detail">{{ detail }}</li>
            </ul>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import type { Resume } from '@/types';

export default defineComponent({
    name: 'ResumeContent',
    setup() {
        const resumes = inject<Resume[]>('resumes');

        return {
            resumes
        };
    }
});
</script>

<style scoped>
.resume {
    font-size: 1rem;
}
h1, h2, h3, h4 {
    font-size: 1rem;
    margin: 0 !important;
}
.line {
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--header-color);
    margin: calc(.5rem - .5px) 0;
}
.courses {
    column-count: 3;
}
.courses li {
    padding-right: 1rem;
}
h1 {
    color: var(--header-color);
    font-weight: bolder;
    text-align: center;
}
.contact {
    text-align: center;
}
h2 {
    color: var(--header-color);
    font-weight: bolder;
}
h4 {
    display: flex; flex-direction: row; justify-content: space-between;
}
strong {
    font-weight: bold;
}
ul {
    list-style-type: "- ";
}
a {
    color: var(--user-color);
    font-weight: bold;
}
u {
    text-decoration: underline dashed;
    font-weight: bold;
}
</style>