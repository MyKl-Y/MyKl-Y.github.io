<script setup>
import { defineProps, ref } from 'vue';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import EducationView from '@/views/EducationView.vue';
import ExperienceView from '@/views/ExperienceView.vue';
import SkillsViewVue from '@/views/SkillsView.vue';
import ProjectsView from '@/views/ProjectsView.vue';
import ContactView from '@/views/ContactView.vue';

let header = ref('');

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    change: {
        type: Function,
        required: true
    },
    dragMouseDown: {
        type: Function,
        required: true
    }
})

if (props.title === 'home') {
    header.value = 'Home - Microsoft Internet Explorer';
} else if (props.title === 'about') {
    header.value = 'About - My Computer';
} else if (props.title === 'skills') {
    header.value = 'Skills - My Documents';
} else if (props.title === 'experience') {
    header.value = 'Experience - My Briefcase';
} else if (props.title === 'education') {
    header.value = 'Education - Network Neighborhood';
} else if (props.title === 'projects') {
    header.value = 'Projects - Windows Media Player';
} else if (props.title === 'contact') {
    header.value = 'Contact - Outlook Express';
}
</script>

<template>
    <div class="window-content">
        <div class="window-header"  >
            <div class="window-controls">
                <img v-if="props.title === 'home'" src="@/assets/windows98/webpageLogoSmall.png" alt="Logo" />
                <img v-else-if="props.title === 'about'" src="@/assets/windows98/myComputerLogoSmall.png" alt="Logo" />
                <img v-else-if="props.title === 'skills'" src="@/assets/windows98/myDocumentsLogoSmall.png" alt="Logo" />
                <img v-else-if="props.title === 'experience'" src="@/assets/windows98/myBriefcaseLogoSmall.png" alt="Logo" />
                <img v-else-if="props.title === 'education'" src="@/assets/windows98/networkNeighborhoodLogoSmall.png" alt="Logo" />
                <img v-else-if="props.title === 'projects'" src="@/assets/windows98/windowsMediaPlayerLogoSmall.png" alt="Logo" />
                <img v-else-if="props.title === 'contact'" src="@/assets/windows98/outlookExpressLogoSmall.png" alt="Logo" />
                <h1 class="window-title" @mousedown="dragMouseDown">{{ header }}</h1>
                <button aria-label="Minimize"><img src="@/assets/windows98/minimizeLogo.png" height="10" width="10" /></button>
                <button aria-label="Maximize"><img src="@/assets/windows98/maximizeLogo.png" height="10" width="10" /></button>
                <button aria-label="Close" @click="change('')"><img src="@/assets/windows98/closeLogo.png" height="10" width="10" /></button>
            </div>
        </div>
        <div class="window-body">
            <div class="window-top">
                <div class="window-toolbar">
                    <div class="window-toolbar-buttons">
                        <div v-if="props.title != 'projects'" class="separate"></div>
                        <button><p><u>F</u>ile</p></button>
                        <button v-if="props.title != 'projects'"><p><u>E</u>dit</p></button>
                        <button><p><u>V</u>iew</p></button>
                        <button v-if="props.title === 'projects'"><p><u>P</u>lay</p></button>
                        <button v-if="props.title != 'home' && props.title != 'contact' && props.title != 'projects'" ><p><u>G</u>o</p></button>
                        <button v-if="props.title != 'contact'" ><p><u>F</u>avorites</p></button>
                        <button v-if="props.title === 'projects'" ><p><u>G</u>o</p></button>
                        <button v-if="props.title === 'experience'"><p><u>B</u>riefcase</p></button>
                        <button v-if="props.title === 'home' || props.title === 'contact'"><p><u>T</u>ools</p></button>
                        <button v-if="props.title === 'contact'"><p><u>M</u>essage</p></button>
                        <button><p><u>H</u>elp</p></button>
                    </div>
                    <div v-if="props.title != 'projects'" class="window-toolbar-image">
                        <img src="@/assets/windows98/startButtonLogo.png" height="20" alt="Logo" />
                    </div>
                </div>
                <div v-if="props.title!='projects'" class="window-navbar">
                    <div class="separate"></div>
                    <button><img src="@/assets/windows98/backLogo.png" height="30" /><p>Back</p></button>
                    <button><img src="@/assets/windows98/forwardLogo.png" height="30" /><p>Forward</p></button>
                    <button v-if="props.title==='home'"><img src="@/assets/windows98/stopLogo.png" height="30" /><p>Stop</p></button>
                    <button v-if="props.title==='home'"><img src="@/assets/windows98/refreshLogo.png" height="30" /><p>Refresh</p></button>
                    <button v-if="props.title==='home'" class="home"><img src="@/assets/windows98/homeLogo.png" height="30" /><p>Home</p></button>
                    <button v-if="props.title==='home'"><img src="@/assets/windows98/searchLogo.png" height="30" /><p>Search</p></button>
                    <button v-if="props.title==='home'"><img src="@/assets/windows98/favoritesLogo.png" height="30" /><p>Favorites</p></button>
                    <button v-if="props.title==='home'" class="history"><img src="@/assets/windows98/historyLogo.png" height="30" /><p>History</p></button>
                    <button v-if="props.title==='home'"><img src="@/assets/windows98/mailLogo.png" height="30" /><p>Mail</p></button>
                    <button v-if="props.title==='home'"><img src="@/assets/windows98/printerLogo.png" height="30" /><p>Print</p></button>
                    <button v-if="props.title!='home'&&props.title!='contact'" class="up"><img src="@/assets/windows98/upLogo.png" height="30" /><p>Up</p></button>
                    <button v-if="props.title==='experience'"><img src="@/assets/windows98/updateAllLogo.png" height="30" /><p>Update...</p></button>
                    <button v-if="props.title==='experience'" class="update"><img src="@/assets/windows98/updateSelectionLogo.png" height="30" /><p>Update...</p></button>
                    <button v-if="props.title!='home'&&props.title!='contact'"><img src="@/assets/windows98/cutLogo.png" height="30" /><p>Cut</p></button>
                    <button v-if="props.title!='home'&&props.title!='contact'"><img src="@/assets/windows98/copyLogo.png" height="30" /><p>Copy</p></button>
                    <button v-if="props.title!='home'&&props.title!='contact'" class="paste"><img src="@/assets/windows98/pasteLogo.png" height="30" /><p>Paste</p></button>
                    <button v-if="props.title!='home'&&props.title!='contact'" class="undo"><img src="@/assets/windows98/undoLogo.png" height="30" /><p>Undo</p></button>
                    <button v-if="props.title!='home'&&props.title!='contact'"><img src="@/assets/windows98/deleteLogo.png" height="30" /><p>Delete</p></button>
                    <button v-if="props.title!='home'&&props.title!='contact'" class="properties"><img src="@/assets/windows98/propertiesLogo.png" height="30" /><p>Properties</p></button>
                    <button v-if="props.title!='home'&&props.title!='contact'"><img src="@/assets/windows98/viewsLogo.png" height="30" /><p>Views</p></button>
                </div>
                <div v-if="props.title != 'contact' && props.title != 'projects'" class="window-searchbar">
                    <div class="separate"></div>
                    <p>A<u>d</u>dress</p>
                    <div class="window-searchbar-input">
                        <img v-if="props.title==='home'" src="@/assets/windows98/webpageLogoSmall.png" />
                        <img v-else-if="props.title==='about'" src="@/assets/windows98/myComputerLogoSmall.png" />
                        <img v-else-if="props.title==='skills'" src="@/assets/windows98/myDocumentsLogoSmall.png" />
                        <img v-else-if="props.title==='experience'" src="@/assets/windows98/myBriefcaseLogoSmall.png" />
                        <img v-else-if="props.title==='education'" src="@/assets/windows98/networkNeighborhoodLogoSmall.png" />
                        <img v-else-if="props.title==='contact'" src="@/assets/windows98/outlookExpressLogoSmall.png" />
                        <p v-if="props.title==='home'">http://myportfolio.com/home</p>
                        <p v-else-if="props.title==='about'">My Computer</p>
                        <p v-else-if="props.title==='skills'">My Documents</p>
                        <p v-else-if="props.title==='experience'">My Briefcase</p>
                        <p v-else-if="props.title==='education'">Network Neighborhood</p>
                        <p v-else-if="props.title==='contact'">Outlook Express</p>
                        <button class="dropdown">▾</button>
                    </div>
                    <button v-if="props.title==='home'" class="go"><img src="@/assets/windows98/goLogo.png" height="20" />Go</button>
                    <button v-if="props.title==='home'" class="links"><div class="separate"></div>Links &raquo;</button>
                </div>
            </div>
            <div class="window-home">
                <HomeView v-if="props.title==='home'" type="windows-98" />
                <AboutView v-else-if="props.title==='about'" type="windows-98" />
                <EducationView v-else-if="props.title==='education'" type="windows-98" />
                <ExperienceView v-else-if="props.title==='experience'" type="windows-98" />
                <SkillsViewVue v-else-if="props.title==='skills'" type="windows-98" />
                <ProjectsView v-else-if="props.title==='projects'" type="windows-98" />
                <ContactView v-else-if="props.title==='contact'" type="windows-98" />
            </div>
            <div v-if="props.title!='projects'" class="window-footer">
                <p class="status" v-if="props.title==='home'"><img src="@/assets/windows98/webpageLogoSmall.png" height="20" />Done</p>
                <p class="status" v-if="props.title==='contact'"></p>
                <p v-if="props.title!='experience'&&props.title!='education'" :class="props.title" ></p>
                <p :class="props.title" ></p>
                <p v-if="props.title!='experience'&&props.title!='education'&&props.title!='contact'"><img src="@/assets/windows98/myComputerLogoSmall.png" height="20" />My Computer</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.window-content * {
    font-family: 'VT323', monospace;
}

.window-content {
    width: 100%;
    height: 100%;
    background-color: #c3c3c3;
    border-left: 2px outset #fdffff;
    border-top: 2px outset #fdffff;
    border-right: 2px solid #000000;
    border-bottom: 2px solid #000000;
    position: relative;
    padding: 4px;
}

.window-header {
    width: 100%;
    height: 27px;
    background-color: #010081;
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
}
.window-controls {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.window-controls img {
    margin-right: 5px;
}
.window-title {
    color: #ffffff;
    font-size: 1.2rem;
    flex-grow: 1;
    font-weight: bold;
}
.window-controls button {
    background-color: #c3c3c3;
    color: #000000;
    border-left: 2px outset #fdffff;
    border-top: 2px outset #fdffff;
    border-right: 2px solid #000000;
    border-bottom: 2px solid #000000;
    cursor: pointer;
    padding: auto;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.window-controls button:hover {
    color: #010081;
}
.window-controls button:active {
    border-left: 2px solid #000000;
    border-top: 2px solid #000000;
    border-right: 2px solid #fdffff;
    border-bottom: 2px solid #fdffff;
}
.window-controls button img {
    margin: 0;
}

.window-body .separate {
    background-color: #c3c3c3;
    border: 2px outset #fdffff;
    width: 1px;
    height: calc(100% - 5px);
    margin: 2px;
}
.window-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    height: calc(100% - 27px);
    width: 100%;
}
.window-top {
    margin-top: 2px;
    border: 2px inset #fdffff;
}
.window-toolbar {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 35px;
    background-color: #c3c3c3;
}
.window-toolbar-image {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    height: 100%;
    width: 60px;
    border: 2px outset #fdffff;
}
.window-toolbar-image img {
    filter: drop-shadow(1px 1px 0px #ffffff) drop-shadow(-1px -1px 0px #ffffff);
}
.window-toolbar-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border: 2px outset #fdffff;
    flex-grow: 1;
    height: 100%;
}
.window-toolbar-buttons button {
    background-color: transparent;
    color: #000000;
    border: 2px solid #c3c3c3;
    cursor: pointer;
    padding: 0 10px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
}
.window-toolbar-buttons button:hover {
    border: 2px outset #fdffff;
}
.window-toolbar-buttons button:active {
    border: 2px inset #fdffff;
}

.window-navbar {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 60px;
    background-color: #c3c3c3;
    border: 2px outset #fdffff;
}
.window-navbar button {
    background-color: transparent;
    color: #000000;
    border: 2px solid #c3c3c3;
    cursor: pointer;
    padding: 0 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    filter: grayscale(100%);
}
.window-navbar button:hover {
    border: 2px outset #fdffff;
    filter: grayscale(0%);
}
.window-navbar button:active {
    border: 2px inset #fdffff;
    filter: grayscale(0%);
}
.window-navbar button.home, 
.window-navbar button.history, 
.window-navbar button.up, 
.window-navbar button.paste, 
.window-navbar button.undo, 
.window-navbar button.properties,
.window-navbar button.update {
    border-right: 3px groove #fdffff;
}

.window-searchbar {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
    background-color: #c3c3c3;
    border: 2px outset #fdffff;
}
.window-searchbar p {
    color: #000000;
    font-size: 1.2rem;
    margin: 0 5px;
}
.window-searchbar .links, .window-searchbar .go {
    background-color: transparent;
    color: #000000;
    cursor: pointer;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    filter: grayscale(100%);
    border: 2px solid #c3c3c3;
}
.window-searchbar .go {
    margin-right: 5px;
}
.window-searchbar .links, .window-searchbar .go {
    border-left: 4px ridge #fdffff;
}
.window-searchbar .go:hover {
    border-left: 4px ridge #fdffff;
    border: 2px outset #fdffff;
    border-left: 4px ridge #fdffff;
    filter: grayscale(0%);
}
.window-searchbar .go:active {
    border-left: 2px inset #fdffff;
    border-right: 2px inset #fdffff;
    filter: grayscale(0%);
}
.window-searchbar-input {
    background-color: #fdffff;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-left: 2px solid #000000;
    border-top: 2px solid #000000;
    border-right: 2px outset #fdffff;
    border-bottom: 2px outset #fdffff;
    height: calc(100% - 4px);
    flex-grow: 1;
}
.window-searchbar-input p {
    flex-grow: 1;
}
.window-searchbar-input img {
    margin-left: 5px;
}
.window-searchbar-input .dropdown {
    background-color: #c3c3c3;
    color: #000000;
    border-left: 2px outset #fdffff;
    border-top: 2px outset #fdffff;
    border-right: 2px solid #000000;
    border-bottom: 2px solid #000000;
    cursor: pointer;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
}

.window-home {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    height: calc(100%);
    width: 100%;
    min-height: 100px;
    background-color: #ffffff;
    border-right: 2px outset #c3c3c3;
    border-bottom: 2px outset #c3c3c3;
    border-left: 2px solid #000000;
    border-top: 2px solid #000000;
    margin-top: 5px;
    overflow: auto;
}

.window-footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: 0 0 40px;
    min-height: 40px;
    height: 100%;
    background-color: #c3c3c3;
    margin-top: 3px;
    overflow: visible;
}
.window-footer p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: #000000;
    font-size: 1.2rem;
    border: 2px inset #fdffff;
    height: 100%;
    width: 50px;
}
.window-footer p img {
    margin: 0 5px;
}
.window-footer p:not(:last-child) {
    margin-right: 3px;
}
.window-footer p:not(.home) {
    flex-grow: 1;
}
.window-footer .status {
    flex-grow: 3 !important;
}
</style>