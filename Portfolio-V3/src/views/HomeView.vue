<script setup>
import { defineProps, reactive } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true
  }
});

const styleType = props.type;
const windows98StyleObject = reactive({
  container: {
    backgroundColor: 'white',
    padding: '5px',
  },
  h2: {
    color: 'black',
  },
  p: {
    color: 'black',
  },
  ul: {
    color: 'black',
  },
  li: {
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
const macOSXStyleObject = reactive({
  h2: {
    color: 'white'
  },
});
const myOSStyleObject = reactive({
  h2: {
    color: 'black'
  },
});
const styleObject = styleType === 'windows-98' ? windows98StyleObject : styleType === 'mac-os-x' ? macOSXStyleObject : myOSStyleObject;
</script>

<template>
  <main>
    <div :style="styleObject.container">
      <h2 :style="styleObject.h2">Home</h2>
      <p :style="styleObject.p">
        Welcome to my portfolio! This is a project I created to showcase my skills and experience. Feel free to look around and check out my projects.
      </p>
      <ul :style="styleObject.ul">
        <li :style="styleObject.li">
          <img v-if="styleType === 'windows-98'" src="@/assets/windows98/myComputerLogo.png" height="20" />
          <img v-else-if="styleType === 'mac-os-x'" src="@/assets/windows98/myComputerLogo.png" height="20" />
          <img v-else src="@/assets/windows98/myComputerLogo.png" height="20" />
          &nbsp;- About Page
        </li>
        <li :style="styleObject.li">
          <img v-if="styleType === 'windows-98'" src="@/assets/windows98/networkNeighborhoodLogo.png" height="20" />
          <img v-else-if="styleType === 'mac-os-x'" src="@/assets/windows98/networkNeighborhoodLogo.png" height="20" />
          <img v-else src="@/assets/windows98/networkNeighborhoodLogo.png" height="20" />
          &nbsp;- Education Page
        </li>
        <li :style="styleObject.li">
          <img v-if="styleType === 'windows-98'" src="@/assets/windows98/myBriefcaseLogo.png" height="20" />
          <img v-else-if="styleType === 'mac-os-x'" src="@/assets/windows98/myBriefcaseLogo.png" height="20" />
          <img v-else src="@/assets/windows98/myBriefcaseLogo.png" height="20" />
          &nbsp;- Experience Page
        </li>
        <li :style="styleObject.li">
          <img v-if="styleType === 'windows-98'" src="@/assets/windows98/myDocumentsLogo.png" height="20" />
          <img v-else-if="styleType === 'mac-os-x'" src="@/assets/windows98/myDocumentsLogo.png" height="20" />
          <img v-else src="@/assets/windows98/myDocumentsLogo.png" height="20" />
          &nbsp;- Skills Page
        </li>
        <li :style="styleObject.li">
          <img v-if="styleType === 'windows-98'" src="@/assets/windows98/windowsMediaPlayerLogo.png" height="20" />
          <img v-else-if="styleType === 'mac-os-x'" src="@/assets/windows98/windowsMediaPlayerLogo.png" height="20" />
          <img v-else src="@/assets/windows98/windowsMediaPlayerLogo.png" height="20" />
          &nbsp;- Projects Page
        </li>
        <li :style="styleObject.li">
          <img v-if="styleType === 'windows-98'" src="@/assets/windows98/outlookExpressLogo.png" height="20" />
          <img v-else-if="styleType === 'mac-os-x'" src="@/assets/windows98/outlookExpressLogo.png" height="20" />
          <img v-else src="@/assets/windows98/outlookExpressLogo.png" height="20" />
          &nbsp;- Contact Page
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
</style>