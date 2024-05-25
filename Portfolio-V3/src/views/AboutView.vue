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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  b: {
    color: 'black',
    fontWeight: 'bold',
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
  <div :style="styleObject.container" class="about">
    <h1 :style="styleObject.h2">🌐 About Me</h1>
    <p :style="styleObject.p">
      Hello, World! Born and raised in the vibrant city of Atlanta, Georgia, where I continue to reside, 
      I am deeply rooted in the community that shaped me. My journey in technology is fueled by an insatiable
      curiosity and a lifelong passion for learning.
    </p>
    <br/>
    <h1 :style="styleObject.h2">🔎 Passion and Interests</h1>
    <p :style="styleObject.p">
      My enthusiasm for technology spans several domains, each representing a part of my ongoing exploration and 
      commitment to innovation:
    </p>
    <ul :style="styleObject.ul">
      <li>
        <b :style="styleObject.b">Exploring New Technologies</b>: From software engineering to game development, I am constantly driven to
        understand and innovate in the fields of machine learning, cybersecurity, and beyond.
      </li>
      <li>
        <b :style="styleObject.b">Engaging with Music and Audio</b>: As a lover of music and high-fidelity audio, I seek to blend my technical 
        skills with my artistic interests, whether it's through creating or simply appreciating sound.
      </li>
      <li>
        <b :style="styleObject.b">Savoring Every Sip</b>: My interest in coffee goes beyond a morning routine—it's about the experience, 
        the flavors, and the process, reflecting my broader approach to life and learning.
      </li>
    </ul>
    <br/>
    <h1 :style="styleObject.h2">👨‍👩‍👦 Family and Balance</h1>
    <p :style="styleObject.p">
      Family is at the core of everything I do. Being a father has not only enriched my life but also honed my abilities 
      to manage time and embrace empathy. These experiences shape how I approach every challenge, ensuring that I carry 
      a balance of perseverance and flexibility in all my endeavors.
    </p>
    <br/>
    <h1 :style="styleObject.h2">🤝 Looking Forward</h1>
    <p :style="styleObject.p">
      I am always on the lookout for opportunities to apply my skills in practical settings, whether through collaborative 
      projects, community engagements, or initiatives that harness technology for social good. I am particularly excited 
      about contributing to projects that enhance accessibility and push the boundaries of what's possible in tech innovation.
    </p>
    <br/>
    <p :style="styleObject.p">
      Let's connect and explore how we can drive technology forward together! If you're interested in discussing potential 
      collaborations or if you share a passion for any of my interests, please don't hesitate to reach out.
    </p>
  </div>
</template>

<style scoped>
</style>
