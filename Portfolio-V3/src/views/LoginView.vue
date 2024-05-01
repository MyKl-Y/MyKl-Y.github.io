<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let type = '';
function changeType(newType) {
    type = newType;
    router.push({ path: `/desktop/${type.replace(/\s/g, '-')}`, params: { title: type } });
}

const dateAndTime = ref('');
setInterval(() => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes().toLocaleString().padStart(2, '0');
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toLocaleString().slice(3, 5);
    dateAndTime.value = `${hours}:${minutes} ${month}/${day}/${year}`;
}, 1000);
</script>

<template>
    <div class="loginContainer">
        <div class="loginHeader">
            <p>
                [100%} | {{ dateAndTime }}
            </p>
        </div>
        <div class="loginProfiles">
            <div>
                <button @click="changeType('MY OS');">
                    <img src="@/assets/logo.svg" alt="MY OS" />
                </button>
                <p>
                    MY OS
                </p>
            </div>
            <div>
                <button @click="changeType('Windows 98')" >
                    <img src="@/assets/windows98/windows98.png" alt="Windows 98" />
                </button>
                <p>
                    Windows 98
                </p>
            </div>
            <div>
                <button @click="changeType('Windows XP')">
                    <img src="@/assets/windowsXP.png" alt="Windows XP" />
                </button>
                <p>
                    Windows XP
                </p>
            </div>
            <div>
                <button @click="changeType('Windows 7')">
                    <img src="@/assets/windows7.png" alt="Windows 7" />
                </button>
                <p>
                    Windows 7
                </p>
            </div>
            <div>
                <button @click="changeType('Windows 10')">
                    <img src="@/assets/windows10.png" alt="Windows 10" />
                </button>
                <p>
                    Windows 10
                </p>
            </div>
            <div>
                <button @click="changeType('Ubuntu')">
                    <img src="@/assets/ubuntu.png" alt="Ubuntu" />
                </button>
                <p>
                    Ubuntu
                </p>
            </div>
            <div>
                <button @click="changeType('Mac OS X Tiger')">
                    <img src="@/assets/macOSTiger.png" alt="Mac OS X Tiger" />
                </button>
                <p>
                    Mac Tiger
                </p>
            </div>
            <div>
                <button @click="changeType('Mac OS X Leopard')">
                    <img src="@/assets/macOSLeopard.jpg" alt="Mac OS X Leopard" />
                </button>
                <p>
                    Mac Leopard
                </p>
            </div>
            <div>
                <button @click="changeType('Mac OS X Sierra')">
                    <img src="@/assets/macOSSierra.png" alt="Mac OS X Sierra" />
                </button>
                <p>
                    Mac Sierra
                </p>
            </div>
        </div>
        <div class="loginBody">
            <p>[</p>
            <p> Click on an OS to launch </p>
            <p>]</p>
        </div>
        <span></span>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
    .loginContainer {
        background: url(../assets/grainy-gradient-background.jpg) no-repeat center center fixed;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
        font-family: 'Orbitron', sans-serif;
    }

    .loginHeader {
        display: flex;
        justify-content: end;
        align-items: end;
        width: 100vw;
        padding: .5rem;
    }

    .loginProfiles {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100vw;
    }

    .loginContainer button {
        height: 80px;
        width: 80px;
        display: flex;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        border: 1px solid black;
        backdrop-filter: blur(10px);
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .loginContainer button img {
        width: 70px;
        height: 70px;
        filter: grayscale(100%);
    }

    .loginContainer button:hover {
        scale: 1.2;
        transition: all .5s;
    }

    .loginContainer button:hover img {
        filter: grayscale(0%);
    }

    .loginContainer p {
        color: white;
        font-size: .75rem;
        text-align: center;
    }

    .loginBody {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
    }

    .loginBody p {
        font-size: 1.5rem;
        font-weight: 1000;
        padding: .25rem;
    }

    /* Login Body Pulsates */
    .loginBody p:nth-child(2) {
        animation: pulsate 1.5s infinite;
    }

    @keyframes pulsate {
        0% {
            opacity: 0.5;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0.5;
        }
    }
</style>

