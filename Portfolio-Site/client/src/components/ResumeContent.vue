<template>
    <div class="resume" v-if="resumes && resumes.length > 0" v-for="resume in resumes">
        <h1>{{ resume.name }}</h1>
        <p class="contact">
            {{ resume.email }} 
            | (***) ***-****
            | *****, GA 
            | <a href="https://www.linkedin.com/in/michael-yim-olmos/" target="_blank">LinkedIn</a>
            | <a href="https://github.com/MyKl-Y" target="_blank">GitHub</a>
            | <u style="text-decoration: underline dashed ;">Portfolio</u>
        </p>
        <h2 v-if="resume.summary.length > 3">SUMMARY</h2>
        <span class="line" v-if="resume.summary.length > 3"></span>
        <p v-if="resume.summary.length > 3">{{ resume.summary }}</p>
        <h2>SKILLS</h2>
        <span class="line"></span>
        <h3><strong>Hard Skills:</strong></h3>
        <span v-for="(items, category) in resume.skills.hard_skills" :key="category">
            <strong>{{ category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ") }}: </strong>
            <span v-for="(item, index) in items" :key="item.name">{{ item.name }}<span v-if="index < items.length - 1">, </span></span>
            <br/>
        </span>
        <h3><strong>Soft Skills:</strong></h3>
        <span v-for="(skill, index) in resume.skills.soft_skills" :key="skill">{{ skill }}<span v-if="index < resume.skills.soft_skills.length - 1">, </span></span>
        <h2>EDUCATION</h2>
        <span class="line"></span>
        <span v-for="(major, index) in resume.education.major">
            <h3>
                <strong>{{ resume.education.school }}</strong> 
                - <span>
                    {{ major.type }} in {{ major.name }}
                    <!--<span v-if="index !== resume.education.major.length - 1 && resume.education.major.length > 1">, </span>
                    <span v-if="index === resume.education.major.length - 2 && resume.education.major.length !== 0">& </span>-->
                </span>
            </h3>
            <h4 style="display: flex; flex-direction: row; justify-content: space-between;">
                <span>
                    Expected {{ new Date(resume.education.expected_grad_date + -1).toLocaleDateString(
                    'en-US', {year: 'numeric', month: 'long'}) }}
                </span>
                <span> {{ resume.education.location }}</span>
            </h4>
            <ul>
                <li>
                    <strong>Concentrations</strong>: 
                    <span v-for="(concentration, index) in major.concentration">{{ concentration }}<span v-if="index !== major.concentration.length - 1 && major.concentration.length > 2">, </span>
                        {{ " " }}<u v-if="index === major.concentration.length - 2 && major.concentration.length !== 0">and</u>{{ " " }}
                    </span>
                </li>
                <li>
                    <strong>Minors</strong>: 
                    <span v-for="(minor, index) in resume.education.minors">{{ minor }}<span v-if="index !== resume.education.minors.length - 1 && resume.education.minors.length > 2">, </span>
                        {{ " " }}<u v-if="index === resume.education.minors.length - 2 && resume.education.minors.length !== 0">and</u>{{ " " }}
                    </span>
                </li>
                <li>
                    <strong>Cumulative GPA</strong>: 
                    <span>{{ resume.education.gpa }}</span>
                </li>
                <li>
                    <strong>Relevant Coursework</strong>: 
                    <ul style="column-count: 3;">
                        <li style="padding-right: 1rem;" v-for="course in (resume.education.courses.reverse())">
                            {{ course }}
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Awards</strong>: 
                    <span v-for="(award, index) in resume.education.awards">
                        {{ award }}<span v-if="index !== resume.education.awards.length - 1 && resume.education.awards.length > 1">, </span>
                    </span>
                </li>
            </ul>
        </span>
        <h2>PROJECTS</h2>
        <span class="line"></span>
        <span v-for="project in resume.projects">
            <h3>
                <a style="font-weight: bold;" v-if="project.link.length > 0" :href="project.link" target="_blank">{{ project.name }}</a>
                <strong v-else>{{ project.name }}</strong> - 
                <i>{{ project.type }}</i>
            </h3>
            <ul>
                <li v-for="detail in project.description">
                    {{ detail }}
                </li>
            </ul>
        </span>
        <h2>EXPERIENCE</h2>
        <span class="line"></span>
        <span v-for="job in resume.experience">
            <h3>
                <strong>{{ job.company }}</strong> - 
                <i>{{ job.role }}</i>
                ({{ job. type }})
            </h3>
            <h4 style="display: flex; flex-direction: row; justify-content: space-between;">
                <span>
                    {{ new Date(job.start).toLocaleDateString('en-US', {month: 'long', year: 'numeric'}) }} - 
                    {{ new Date(job.end).toLocaleDateString('en-US', {month: 'long', year: 'numeric'}) }}
                </span>
                <span>{{ job.location }}</span>
            </h4>
            <ul>
                <li v-for="detail in job.description">
                    {{ detail }}
                </li>
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
    /*
    padding: 1rem;
    border: 1px solid black;
    background-color: white;
    color: black;
    border-radius: .5rem;
    */
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
strong {
    font-weight: bold;
}
ul {
    list-style-type: "- ";
}
a {
    color: var(--user-color);
}
</style>