<script setup>
setTimeout(() => {
    window.location.href = '/login'
}, 5000)
</script>

<template>
    <div class="launchContainer">
        <div class="launchBox">
            <img src="@/assets/logo.svg" alt="Vue logo" class="logo" width="100px" height="100px" />
            <div class="square-holder">
                <div class="square"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .launchContainer {
        background: url(../assets/grainy-gradient-background.jpg) no-repeat center center fixed;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
    }
    .launchBox {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 200px;
        width: 200px;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 1rem;
        border: 1px solid black;
        backdrop-filter: blur(10px);
    }

    .logo {
        width: 100px;
        height: 150px;
    }

    .square-holder {
        width: 100px;
    }

    .square {
        width: 12px;
        height: 12px;
        border-radius: 4px;
        background-color: #4b9cdb;
    }

    .square-holder .square {
        animation: loadingG 1.5s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
    }

    @keyframes loadingG {
        0% {
            transform: translate(0, 0) rotate(0deg);
            background-color: #c14bdb;
        }
        50% {
            transform: translate(100px, 0) rotate(360deg);
            background-color: #f0ad4e;
        }
        100% {
            transform: translate(0, 0) rotate(0deg);
            background-color: #c14bdb;
        }
    }
</style>