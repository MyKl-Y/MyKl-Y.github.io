<template>
    <div class="contact" v-if="resumes && resumes.length > 0">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <title>Email</title>
                <g id="_21-Email-Send" data-name="21-Email-Send">
                    <path d="M29,4H3A3,3,0,0,0,0,7v4H2V7.23l13.42,9.58a1,1,0,0,0,1.16,0L30,7.23V25a1,1,0,0,1-1,1H4v2H29a3,3,0,0,0,3-3V7A3,3,0,0,0,29,4ZM16,14.77,3.72,6H28.28Z"/>
                    <rect y="26" width="2" height="2"/><rect y="21" width="14" height="2"/><rect x="16" y="21" width="2" height="2"/>
                    <rect y="16" width="2" height="2"/><rect x="4" y="16" width="6" height="2"/>
                </g>
            </svg>
            <div class="triangle path"></div>
            <a href="mailto:{{ resumes[0].email }}">Email</a>
            <div class="triangle header"></div>
            <b>{{ resumes[0].email }}</b>
            <div class="triangle user"></div>
        </span>
        <span>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet">
                <title>GitHub</title>
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                stroke="none">
                    <path d="M2360 5049 c-154 -11 -357 -47 -516 -93 -902 -259 -1603 -1017 -1790
                    -1934 -136 -669 -8 -1355 354 -1908 255 -390 580 -686 968 -886 141 -73 341
                    -154 403 -164 58 -9 109 19 133 73 18 40 18 60 12 286 l-7 243 -86 -14 c-97
                    -15 -256 -9 -386 13 -105 19 -211 71 -278 139 -53 53 -67 76 -136 229 -63 139
                    -135 231 -232 297 -66 46 -121 106 -117 128 6 30 48 43 121 38 141 -10 288
                    -113 393 -274 72 -110 143 -179 230 -222 62 -31 79 -35 169 -38 103 -4 207 12
                    291 44 41 16 43 18 58 85 19 86 56 164 106 228 l39 49 -82 11 c-264 38 -452
                    102 -627 215 -229 148 -365 379 -431 731 -20 109 -23 389 -5 492 29 167 98
                    319 200 445 l45 55 -20 62 c-52 168 -42 372 28 574 18 50 22 52 103 48 118 -6
                    371 -108 543 -218 l71 -46 56 11 c30 6 87 18 127 27 271 58 655 58 926 0 40
                    -9 97 -21 127 -27 l55 -10 95 58 c226 137 484 230 575 206 26 -7 33 -17 53
                    -75 43 -125 55 -210 50 -351 -4 -95 -11 -148 -26 -195 l-21 -64 44 -54 c89
                    -109 155 -244 192 -389 22 -89 25 -417 4 -544 -32 -198 -114 -406 -210 -532
                    -165 -217 -464 -366 -843 -418 l-87 -12 39 -49 c47 -60 85 -137 106 -221 14
                    -52 17 -137 20 -503 5 -490 5 -489 72 -521 46 -21 83 -15 229 42 738 284 1320
                    932 1533 1703 141 513 111 1108 -80 1601 -172 440 -475 842 -848 1122 -405
                    303 -865 474 -1367 507 -175 12 -192 12 -375 0z"/>
                </g>
            </svg>
            <div class="triangle path"></div>
            <a href="https://github.com/MyKl-Y" target="_blank">GitHub</a>
            <div class="triangle header"></div>
            <b>MyKl-Y</b>
            <div class="triangle user"></div>
        </span>
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <title>LinkedIn</title>
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"/>
            </svg>
            <div class="triangle path"></div>
            <a href="https://www.linkedin.com/in/michael-yim-olmos/" target="_blank">LinkedIn</a>
            <div class="triangle header"></div>
            <b>Michael Yim-Olmos</b>
            <div class="triangle user"></div>
        </span>
        <span>
            <svg viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
                <title>LeetCode</title>
                <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/>
            </svg>
            <div class="triangle path"></div>
            <a href="https://leetcode.com/u/mikey091303/" target="_blank">LeetCode</a>
            <div class="triangle header"></div>
            <b>Mikey091303</b>
            <div class="triangle user"></div>
        </span>
        <span>
            <svg viewBox="0 0 100 100">
                <title>CodePen</title>
                <path d="M100 34.2c-.4-2.6-3.3-4-5.3-5.3-3.6-2.4-7.1-4.7-10.7-7.1-8.5-5.7-17.1-11.4-25.6-17.1-2-1.3-4-2.7-6-4-1.4-1-3.3-1-4.8 0-5.7 3.8-11.5 7.7-17.2 11.5L5.2 29C3 30.4.1 31.8 0 34.8c-.1 3.3 0 6.7 0 10v16c0 2.9-.6 6.3 2.1 8.1 6.4 4.4 12.9 8.6 19.4 12.9 8 5.3 16 10.7 24 16 2.2 1.5 4.4 3.1 7.1 1.3 2.3-1.5 4.5-3 6.8-4.5 8.9-5.9 17.8-11.9 26.7-17.8l9.9-6.6c.6-.4 1.3-.8 1.9-1.3 1.4-1 2-2.4 2-4.1V37.3c.1-1.1.2-2.1.1-3.1 0-.1 0 .2 0 0zM54.3 12.3L88 34.8 73 44.9 54.3 32.4V12.3zm-8.6 0v20L27.1 44.8 12 34.8l33.7-22.5zM8.6 42.8L19.3 50 8.6 57.2V42.8zm37.1 44.9L12 65.2l15-10.1 18.6 12.5v20.1zM50 60.2L34.8 50 50 39.8 65.2 50 50 60.2zm4.3 27.5v-20l18.6-12.5 15 10.1-33.6 22.4zm37.1-30.5L80.7 50l10.8-7.2-.1 14.4z"/>
            </svg>
            <div class="triangle path"></div>
            <a href="https://codepen.io/MyKl-Y" target="_blank">CodePen</a>
            <div class="triangle header"></div>
            <b>MyKl-Y</b>
            <div class="triangle user"></div>
        </span>
        <span>
            <svg height="2500" width="2500" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 582 486.999">
                <title>HackerRank</title>
                <path d="M-1-1h582v402H-1z" fill="none"/><path d="M454.843 141.001c-13.019-22.417-172.832-115-198.859-115-26.019 0-185.895 92.351-198.84 115-12.947 22.649-13.019 207.358 0 230.009 13.018 22.639 172.839 114.989 198.84 114.989 26 0 185.841-92.466 198.851-114.999 13.007-22.533 13.016-207.583.008-229.999zM309.862 398.15c-3.559 0-36.756-32.137-34.141-34.762.781-.78 5.625-1.328 15.768-1.644 0-23.564.53-61.622.844-77.553.038-1.814-.395-3.081-.395-5.256h-71.812c0 6.379-.412 32.523 1.232 65.479.205 4.078-1.42 5.353-5.158 5.335-9.102-.025-18.211-.099-27.321-.071-3.683.009-5.274-1.374-5.157-5.488.826-30.043 2.66-75.488-.134-191.07v-2.849c-8.688-.314-14.717-.862-15.508-1.652-2.624-2.624 31.032-34.76 34.581-34.76 3.558 0 36.989 32.145 34.383 34.76-.782.781-7.098 1.338-15.067 1.652v2.84c-2.174 23.135-1.823 71.506-2.362 94.686h72.107c0-4.089.351-31.212-1.077-75.145-.091-3.047.853-4.646 3.781-4.672 9.945-.072 19.9-.117 29.855-.055 3.108.019 4.105 1.546 4.043 4.834-3.28 171.861-.594 159.867-.594 188.975 7.97.315 15.112.864 15.895 1.655 2.588 2.615-30.205 34.761-33.763 34.761z"/>
            </svg>
            <div class="triangle path"></div>
            <a href="https://www.hackerrank.com//michaelyyim" target="_blank">HackerRank</a>
            <div class="triangle header"></div>
            <b>MichaelYYim</b>
            <div class="triangle user"></div>
        </span>
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <title>Stack Overflow</title>
                <path d="M28.16 32H2.475V20.58H5.32v8.575h19.956V20.58h2.884z"/>
                <path d="M8.477 19.8l13.993 2.923.585-2.806-13.993-2.923zm1.832-6.704l12.94 6.04 1.208-2.572-12.94-6.08zm3.586-6.353l10.99 9.12 1.832-2.183-10.99-9.12zM20.99 0l-2.3 1.715 8.536 11.46 2.3-1.715zM8.166 26.27H22.43v-2.845H8.166v2.845z"/>
            </svg>
            <div class="triangle path"></div>
            <a href="https://stackoverflow.com/users/26580972/michael-yoosung-yim-olmos" target="_blank">Stack Overflow</a>
            <div class="triangle header"></div>
            <b>Michael Yoosung Yim-Olmos</b>
            <div class="triangle user"></div>
        </span>
        <span>
            <svg width="800px" height="800px" viewBox="0 -55 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
                <title>Medium</title>
                <g>
                    <path d="M72.2009141,1.42108547e-14 C112.076502,1.42108547e-14 144.399375,32.5485469 144.399375,72.6964154 C144.399375,112.844284 112.074049,145.390378 72.2009141,145.390378 C32.327779,145.390378 0,112.844284 0,72.6964154 C0,32.5485469 32.325326,1.42108547e-14 72.2009141,1.42108547e-14 Z M187.500628,4.25836743 C207.438422,4.25836743 223.601085,34.8960455 223.601085,72.6964154 L223.603538,72.6964154 C223.603538,110.486973 207.440875,141.134463 187.503081,141.134463 C167.565287,141.134463 151.402624,110.486973 151.402624,72.6964154 C151.402624,34.9058574 167.562834,4.25836743 187.500628,4.25836743 Z M243.303393,11.3867175 C250.314,11.3867175 256,38.835526 256,72.6964154 C256,106.547493 250.316453,134.006113 243.303393,134.006113 C236.290333,134.006113 230.609239,106.554852 230.609239,72.6964154 C230.609239,38.837979 236.292786,11.3867175 243.303393,11.3867175 Z"/>
                </g>
            </svg>
            <div class="triangle path"></div>
            <a href="https://medium.com/@michaelyyim" target="_blank">Medium</a>
            <div class="triangle header"></div>
            <b>MichaelYYim</b>
            <div class="triangle user"></div>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Api from '@/api';
import type { Resume } from '@/types';

export default defineComponent({
    name: 'ContactContent',
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
.contact {
    font-size: 1rem !important;
}
svg {
    fill: var(--background-color);
    background-color: var(--path-color);
    height: 2rem;
    width: 2rem;
    padding: .25rem;
}
span {
    display: flex;
    align-items: center;
    margin-bottom: .5rem;
}
a {
    color: var(--background-color);
    background-color: var(--header-color);
    line-height: 2rem;
    padding: 0 .5rem;
}
b {
    color: var(--background-color);
    background-color: var(--user-color);
    line-height: 2rem;
    padding: 0 .5rem;
}
.triangle.path {
    width: 0;
    height: 0;
    border-top: 1rem solid var(--header-color);
    border-bottom: 1rem solid var(--header-color);
    border-left: 1rem solid var(--path-color);
}
.triangle.header {
    width: 0;
    height: 0;
    border-top: 1rem solid var(--user-color);
    border-bottom: 1rem solid var(--user-color);
    border-left: 1rem solid var(--header-color);
}
.triangle.user {
    width: 0;
    height: 0;
    border-top: 1rem solid transparent;
    border-bottom: 1rem solid transparent;
    border-left: 1rem solid var(--user-color);
}
</style>