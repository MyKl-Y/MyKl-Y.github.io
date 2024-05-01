<script setup>
import { ref, defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//import WindowModal from '@/components/WindowModal.vue';

const router = useRouter();

defineProps({
    title: {
        type: String,
        required: true
    }
})

const route = useRoute();

const type = ref(route.params.type);

function changeType(newType) {
    type.value = newType;
}

const dateAndTime = ref('');
setInterval(() => {
    const date = new Date();
    dateAndTime.value = `${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
}, 1000);

const startButtonClicked = ref(false);

function startButton() {
    startButtonClicked.value = !startButtonClicked.value;
}
</script>

<template>
    <div :class="'desktopContainer ' + type">
        <div :class="'desktopBody ' + type">
            <div v-if="type == 'Windows-98'" class="windows98Body">
                <!--Home-->
                <button>
                    <img src="@/assets/windows98/internetExplorerLogo.png" height="60px" width="60px" alt="Internet Explorer" />
                    <p>Internet Explorer</p>
                </button>
                <!--About-->
                <button>
                    <img src="@/assets/windows98/myComputerLogo.png" height="60px" width="60px" alt="My Computer" />
                    <p>My Computer</p>
                </button>
                <!--Education-->
                <button>
                    <img src="@/assets/windows98/networkNeighborhoodLogo.png" height="60px" width="60px" alt="Network Neighborhood" />
                    <p>Network Neighborhood</p>
                </button>
                <!--Experience-->
                <button>
                    <img src="@/assets/windows98/myBriefcaseLogo.png" height="60px" width="60px" alt="My Briefcase" />
                    <p>My Briefcase</p>
                </button>
                <!--Skills-->
                <button>
                    <img src="@/assets/windows98/myDocumentsLogo.png" height="60px" width="60px" alt="My Documents" />
                    <p>My Documents</p>
                </button>
                <!--Projects-->
                <button>
                    <img src="@/assets/windows98/windowsMediaPlayerLogo.png" height="60px" width="60px" alt="Windows Media Player" />
                    <p>Windows Media Player</p>
                </button>
                <!--Contact-->
                <button>
                    <img src="@/assets/windows98/outlookExpressLogo.png" height="60px" width="60px" alt="Outlook Express" />
                    <p>Outlook Express</p>
                </button>
            </div>
        </div>
        <div :class="'desktopTaskbar ' + type">
            <div :class="'desktopTaskbarContainer ' + type">
                <button v-if="type == 'Windows-98'" @click="startButton">
                    <img src="@/assets/windows98/startButtonLogo.png" height="28px" width="28px" alt="Start" />
                    Start
                </button>
                <div v-if="type == 'Windows-98' && startButtonClicked" :class="'desktopTaskbarMenu ' + type">
                    <p><b>Windows</b>98</p>
                    <div class="windows98Taskbar">
                        <button>
                            <img src="@/assets/windows98/windowsUpdateLogo.png" height="28px" width="28px" alt="Windows Update" />
                            &nbsp;Windows Update
                        </button>
                        <div class="separate"></div>
                        <button>
                            <div>
                                <img src="@/assets/windows98/programsLogo.png" height="28px" width="28px" alt="Programs" />
                                <span>&nbsp;<u>P</u>rograms</span>
                            </div>
                            ▸
                        </button>
                        <button>
                            <div>
                                <img src="@/assets/windows98/favoritesLogo.png" height="28px" width="28px" alt="Favorites" />
                                <span>&nbsp;Favorites</span>
                            </div>
                            ▸
                        </button>
                        <button>
                            <div>
                                <img src="@/assets/windows98/myDocumentsLogo.png" height="28px" width="28px" alt="Documents" />
                                <span>&nbsp;<u>D</u>ocuments</span>
                            </div>
                            ▸
                        </button>
                        <button>
                            <div>
                                <img src="@/assets/windows98/settingsLogo.png" height="28px" width="28px" alt="Settings" />
                                <span>&nbsp;<u>S</u>ettings</span>
                            </div>
                            ▸
                        </button>
                        <button>
                            <div>
                                <img src="@/assets/windows98/findLogo.png" height="28px" width="28px" alt="Find" />
                                <span>&nbsp;<u>F</u>ind</span>
                            </div>▸
                        </button>
                        <button>
                            <div>
                                <img src="@/assets/windows98/helpLogo.png" height="28px" width="28px" alt="Help" />
                                <span>&nbsp;<u>H</u>elp</span>
                            </div>
                        </button>
                        <button>
                            <div>
                                <img src="@/assets/windows98/runLogo.png" height="28px" width="28px" alt="Run" />
                                <span>&nbsp;Run</span>
                            </div>
                        </button>
                        <div class="separate"></div>
                        <button @click="router.push({ path: '/login' })">
                            <div>
                                <img src="@/assets/windows98/logOffLogo.png" height="28px" width="28px" alt="Log Off" />
                                <span>&nbsp;<u>L</u>og Off</span>
                            </div>
                        </button>
                        <button @click="router.push({ path: '/' })">
                            <div>
                                <img src="@/assets/windows98/shutdownLogo.png" height="28px" width="28px" alt="Shutdown" />
                                <span>&nbsp;Sh<u>u</u>t Down...</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div :class="'desktopAppBar ' + type">
            <div :class="'desktopAppBarContainer ' + type">
                <span :class="'desktopAppBarDivider ' + type"></span>
                <div v-if="type == 'Windows-98'" class="windows98Apps">
                    <!--Home-->
                    <button>
                        <img src="@/assets/windows98/internetExplorerLogoSmall.png" height="28px" width="28px" alt="Internet Explorer" />
                    </button>
                    <!--About-->
                    <button>
                        <img src="@/assets/windows98/myComputerLogoSmall.png" height="28px" width="28px" alt="My Computer" />
                    </button>
                    <!--Education-->
                    <button>
                        <img src="@/assets/windows98/networkNeighborhoodLogoSmall.png" height="28px" width="28px" alt="Network Neighborhood" />
                    </button>
                    <!--Experience-->
                    <button>
                        <img src="@/assets/windows98/myBriefcaseLogoSmall.png" height="28px" width="28px" alt="My Briefcase" />
                    </button>
                    <!--Skills-->
                    <button>
                        <img src="@/assets/windows98/myDocumentsLogoSmall.png" height="28px" width="28px" alt="My Documents" />
                    </button>
                    <!--Projects-->
                    <button>
                        <img src="@/assets/windows98/windowsMediaPlayerLogoSmall.png" height="28px" width="28px" alt="Windows Media Player" />
                    </button>
                    <!--Contact-->
                    <button>
                        <img src="@/assets/windows98/outlookExpressLogoSmall.png" height="28px" width="28px" alt="Outlook Express" />
                    </button>
                </div>
                <span :class="'desktopAppBarDivider ' + type"></span>
            </div>
        </div>
        <div :class="'desktopDateTime ' + type">
            <div :class="'desktopDateTimeContainer ' + type">
                <img src="@/assets/windows98/mutedVolumeLogo.png" height="28px" width="28px" alt="Volume" />
                {{ dateAndTime }}
            </div>
        </div>
    </div>
    <WindowModal v-if="type != ''" :title="type" :change="changeType" />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.Windows-98 * {
    font-family: 'VT323', monospace;
}

.desktopContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

}
.desktopContainer.Windows-98 {
    display: grid;
    grid-template-rows: repeat(2, 1fr) 45px;
    grid-template-columns: 105px repeat(3, 1fr) 125px;
}

.desktopBody {
    width: 100%;
    height: 100%;
}
.desktopBody.Windows-98 {
    background-color: #008080;
    grid-area: 1 / 1 / 3 / 6;
}
.windows98Body {
    display: inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
}
.windows98Body button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    width: 130px;
    background-color: transparent;
    border: none;
    margin: 10px;
    color: #fdffff;
    font-size: 1.2rem;
}
.windows98Body button p {
    border: 1px solid transparent;
}
.windows98Body button:focus p {
    background-color: #010081;
    border: 1px dashed #fdffff;
}
.windows98Body button:focus img {
    filter: brightness(20%) saturate(20%) invert(11%) sepia(68%) saturate(4861%) hue-rotate(241deg) brightness(77%) contrast(133%);}

.desktopTaskbar {
    width: 100%;
    height: 100%;
}
.desktopTaskbar.Windows-98 {
    background-color: #c3c3c3;
    border-top: 3px outset #fdffff;
    grid-area: 3 / 1 / 4 / 2;
    padding: 3px;
}
.desktopTaskbarContainer.Windows-98 {
    border-right: 3px groove #fdffff;
}
.desktopTaskbarContainer.Windows-98 button{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    border-top: 3px outset #fdffff;
    border-left: 3px outset #fdffff;
    border-right: 3px solid #000000;
    border-bottom: 3px solid #000000;
    background-color: #c3c3c3;
    font-size: 1.4rem;
}
.desktopTaskbarContainer.Windows-98 button:focus {
    border-top: 3px solid #000000;
    border-left: 3px solid #000000;
    border-right: 3px inset #fdffff;
    border-bottom: 3px inset #fdffff;
}
.desktopTaskbarMenu.Windows-98 {
    position: absolute;
    bottom: 40px;
    left: 5px;
    z-index: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 3px outset #fdffff;
    border-right: 3px solid #000000;
    border-bottom: 3px solid #000000;
    border-top: 3px outset #fdffff;
    background-color: #c3c3c3;
    font-size: 1.4rem;
    height: 318px;
}
.desktopTaskbarMenu.Windows-98 p {
    display: flex;
    align-items: center;
    margin: 0;
    background-color: #010081;
    color: #fdffff;
    height: 100%;
    writing-mode: vertical-rl;
    rotate: 180deg;
    width: 25px;
    padding-top: 5px;
}
.desktopTaskbarMenu.Windows-98 b {
    font-weight: bolder;
}
.windows98Taskbar button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: fit-content;
    border: none !important;
}
.windows98Taskbar button:hover {
    background-color: #010081;
    color: #fdffff;
}
.windows98Taskbar button div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.windows98Taskbar .separate {
    background-color: #c3c3c3;
    border: 1px inset #fdffff;
    height: 1px;
    margin: 2px;
}

.desktopAppBar {
    width: 100%;
    height: 100%;
}
.desktopAppBar.Windows-98 {
    background-color: #c3c3c3;
    border-top: 3px outset #fdffff;
    grid-area: 3 / 2 / 4 / 5;
    padding: 3px;
}
.desktopAppBarContainer.Windows-98 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    border-right: 3px groove #fdffff;
}
.desktopAppBarDivider.Windows-98  {
    height: 100%;
    width: 5px;
    border: 3px outset #fdffff;
    background-color: #c3c3c3;
    font-size: 1.4rem;
}
.windows98Apps {
    padding: 0 3px;
    height: 100%;
}
.windows98Apps button {
    background-color: transparent;
    border: 1px solid #c3c3c3;
}
.windows98Apps button:hover, .windows98Apps button:active {
    border: 1px inset #fdffff;
}

.desktopDateTime {
    width: 100%;
    height: 100%;
}
.desktopDateTime.Windows-98 {
    background-color: #c3c3c3;
    border-top: 3px outset #fdffff;
    grid-area: 3 / 5 / 4 / 6;
    padding: 3px;
}
.desktopDateTimeContainer.Windows-98 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    border: 3px inset #fdffff;
    color: #000;
    padding: 0 5px;
    font-size: 1.3rem;
}
</style>