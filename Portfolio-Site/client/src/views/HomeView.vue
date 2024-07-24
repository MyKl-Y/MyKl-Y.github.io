<script setup lang="ts">
let commands_ran: { id: number, command: string, parameters: string[], path: string }[] = [
  { id: 1, command: 'help', parameters: ['man'], path: '~' },
  { id: 2, command: 'about', parameters: ['test', '-c'], path: '~' },
  { id: 3, command: 'contact', parameters: [], path: '~' },
  { id: 4, command: 'projects', parameters: [], path: '~' },
  { id: 5, command: 'skills', parameters: [], path: '~' },
  { id: 6, command: 'resume', parameters: [], path: '~' },
  { id: 7, command: 'clear', parameters: [], path: '~' },
  { id: 8, command: 'exit', parameters: [], path: '~' }
];
let commands = {
  'help': 'Display this help message',
  'about': 'Display information about the site',
  'contact': 'Display contact information',
  'projects': 'Display information about projects',
  'skills': 'Display information about skills',
  'resume': 'Display resume',
  'clear': 'Clear the screen',
  'exit': 'Exit the terminal'
};
const user = 'Guest@MYOS';
let path: string = '~';
</script>

<template>
  <main>
    <!--<TheWelcome />
    <p>Home view</p>-->
    <span id="headers">MyKl-Y Operating System (M.Y.O.S.) v1.0 </span>
    <br/>
    Type <code>help</code> for a list of commands
    <br/>
    <span v-for="command in commands_ran" :key="command.id">
      <span id="user">{{ user }}</span>:<span id="path">{{ command.path }}</span>$
      <span>{{ command.command + " " }}</span>
      <span v-for="(parameter, index) in command.parameters" :key="index"> {{ parameter + " " }}</span>
      <br/>
    </span>
    <span id="user">{{ user }}</span>:<span id="path">{{ path }}</span>$ <input type="text" />
  </main>
</template>

<style scoped>
main {
  font-family: monospace;
  height: 100vh;
  width: 100vw;
  background-color: #300924;
  color: #ffffff;
  font-size: 1rem;
  padding: 1rem;
}

#headers {
  color: #06989A;
  text-decoration: none !important;
  font-style: normal !important;
  font-weight: bolder;
}

#user {
  color: #4E9A06;
  text-decoration: none !important;
  font-style: normal !important;
}

#path {
  color: #3465A4;
  text-decoration: none !important;
  font-style: normal !important;
}

input {
  background-color: transparent;
  color: #ffffff;
  border: none;
  font-family: monospace;
  font-size: 1rem;
  padding: 0;
  margin: 0;
  outline: none;
}

code {
  font-weight: bolder;
}
</style>