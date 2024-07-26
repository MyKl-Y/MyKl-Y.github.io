<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';

// Define the type for the commands
type Command = 'help' 
  | 'about' | 'contact' | 'projects' | 'skills' | 'resume' | 'clear' | 'exit'
  | 'ls' | 'pwd' | 'cd' | 'mkdir' | 'mv' | 'cp' | 'rm' | 'touch' | 'cat' 
  | 'echo' | 'less' | 'man' | 'uname' | 'whoami' | 'head' | 'tail' | 'wc'
  | 'ssh' | 'alias' | 'sudo' | 'chmod' | 'chown';
;

// Define the commands object with the Command type
let commands: Record<Command, string> = {
  'help': 'Display this help message',
  'about': 'Display information about the site',
  'contact': 'Display contact information',
  'projects': 'Display information about projects',
  'skills': 'Display information about skills',
  'resume': 'Display resume',
  'exit': 'Exit the terminal',
  'ls': 'List directory contents',
  'pwd': 'Print working directory',
  'cd': 'Change the current directory',
  'mkdir': 'Create a new directory',
  'mv': 'Move or rename files or directories',
  'cp': 'Copy files or directories',
  'rm': 'Remove files or directories',
  'touch': 'Create a new file',
  'clear': 'Clear the screen',
  'cat': 'Concatenate and display files',
  'echo': 'Display a line of text',
  'less': 'View files one screen at a time',
  'man': 'Display the manual pages',
  'uname': 'Print system information',
  'whoami': 'Print the current user',
  'head': 'Display the beginning of a file',
  'tail': 'Display the end of a file',
  'wc': 'Count lines, words, and characters in files',
  'ssh': 'Connect to a remote server',
  'alias': 'Create an alias for a command',
  'sudo': 'Execute a command as the superuser',
  'chmod': 'Change file permissions',
  'chown': 'Change file ownership',
};

let commands_ran: { id: number, command: string, parameters: string[], path: string, output: string }[] = [];

const user = 'Guest@MYOS';
let path: string = '~';

function runCommand(command: string, parameters: string[]) {
  let output = '';
  switch (command) {
    case 'help':
      output = Object.keys(commands).map(cmd => `${cmd}: ${commands[cmd as Command]}`).join('\n');
      break;
    case 'about':
      output = 'About: This is a mock command line interface.';
      break;
    case 'contact':
      output = 'Contact: You can reach me at example@example.com';
      break;
    case 'projects':
      output = 'Projects: Here is a list of my projects...';
      break;
    case 'skills':
      output = 'Skills: Here are my skills...';
      break;
    case 'resume':
      output = 'Resume: Here is my resume...';
      break;
    case 'clear':
      commands_ran = [];
      return;
    case 'exit':
      output = 'Exiting the terminal...';
      break;
    default:
      output = 'Command not found';
  }
  commands_ran.push({ id: commands_ran.length + 1, command, parameters, path, output });
}

const input = ref('');
const showHeader = ref(false);
const showHelpPrompt = ref(false);
const showUserInput = ref(false);

const caretOffset = computed(() => `${input.value.length}ch`);

function handleSubmit() {
  const [command, ...parameters] = input.value.split(' ');
  if (command in commands) {
    runCommand(command as Command, parameters);
  } else {
    runCommand('help', []); // If the command is not found, show the help message
  }
  input.value = '';
  nextTick(() => {
    const terminal = document.getElementById('bottom');
    terminal?.scrollIntoView({ behavior: 'smooth' });
  });
}

onMounted(() => {
  showHeader.value = true;
  setTimeout(() => {
    showHelpPrompt.value = true;
    setTimeout(() => {
      showUserInput.value = true;
    }, 500); // 2 seconds delay for user input prompt
  }, 2000); // 2 seconds delay for help prompt
});
</script>

<template>
  <main>
    <!--<TheWelcome />
    <p>Home view</p>-->
    <span id="headers" v-if="showHeader">MyKl-Y Operating System (M.Y.O.S.) v1.0 </span>
    <br v-if="showHeader" />
    <span v-if="showHelpPrompt">Type <code>help</code> for a list of commands</span>
    <br v-if="showHelpPrompt" />
    <span v-for="command in commands_ran" :key="command.id">
      <span id="user">{{ user }}</span>:<span id="path">{{ command.path }}</span>$
      <span>{{ command.command + " " }}</span>
      <span v-for="(parameter, index) in command.parameters" :key="index"> {{ parameter + " " }}</span>
      <br/>
      <pre v-if="command.output">{{ command.output }}</pre>
    </span>
    <span v-if="showUserInput" class="input-line-container">
      <span id="user">{{ user }}</span>:<span id="path">{{ path }}</span>$ 
        <form @submit.prevent="handleSubmit" class="input-form">
          <span class="blinking-cursor" :style="{ left: caretOffset }"></span>
          <input v-model="input" type="text" class="input-text" />
        </form>
    </span>
    <span id="bottom"></span>
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
  overflow: scroll;
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

.input-line-container {
  display: flex;
  width: 100%;
}

.input-form {
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  position: relative;
  margin-left: .5rem;
}

.input-text {
  width: auto;
  flex-grow: 1;
  caret-color: transparent;
}

.blinking-cursor {
  display: block;
  width: 1ch;
  height: 1.2rem;
  position: absolute;
  background-color: #ffffff;
  animation: blink 1s linear infinite;
  bottom: 4px;
}
.input-form:not(:focus-within) .blinking-cursor {
  background-color: transparent !important;
  border: 1px solid #ffffff;
}

@keyframes blink {
  from, to {
    background-color: transparent;
    border-color: transparent;
  }
  50% {
    background-color: #ffffff;
    border-color: #ffffff;
  }
}
</style>