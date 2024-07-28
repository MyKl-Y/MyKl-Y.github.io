<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import HelpOutput from '@/components/HelpOutput.vue';
import ManualPage from '@/components/ManualPage.vue';

const themes = {
  dark: {
    background: '#300924',
    text: '#ffffff',
    accent: '#06989A',
    error: '#ff0000'
  },
  light: {
    background: '#ffffff',
    text: '#000000',
    accent: '#06989A',
    error: '#ff0000'
  }
};

// Define the type for the commands
type Command = 'man' 
  | 'about' | 'contact' | 'projects' | 'skills' | 'resume' | 'clear' | 'exit'
  | 'ls' | 'pwd' | 'cd' | 'mkdir' | 'mv' | 'cp' | 'rm' | 'touch' | 'cat' 
  | 'echo' | 'less' | 'man' | 'uname' | 'whoami' | 'head' | 'tail' | 'wc'
  | 'ssh' | 'alias' | 'sudo' | 'chmod' | 'chown';
;

// Define the type for the commands object
interface CommandDetails {
  name: string;
  desc: string;
  syntax: string;
  usage: string;
  aliases: string[];
  arguments: { arg: string, desc: string }[];
  options: { opt: string, desc: string }[];
}

// Define the commands object with the Command type
let commands = new Map<Command, CommandDetails>([
  ['man', {
    name: 'man',
    desc: 'Display information about available commands',
    syntax: 'man [<command_name>]',
    usage: 'man ls',
    aliases: ['?', 'h', 'help'],
    arguments: [
      { arg: 'command_name', desc: 'The command to display help for' }
    ],
    options: []
  }],
  ['about', {
    name: 'about',
    desc: 'Display information about the creator',
    syntax: 'about',
    usage: 'about',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['contact', {
    name: 'contact',
    desc: 'Display contact information of the creator',
    syntax: 'contact',
    usage: 'contact',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['projects', {
    name: 'projects',
    desc: 'Display information about projects made by the creator',
    syntax: 'projects',
    usage: 'projects',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['skills', {
    name: 'skills',
    desc: 'Display information about the skills of the creator',
    syntax: 'skills',
    usage: 'skills',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['resume', {
    name: 'resume',
    desc: 'Display the resume of the creator',
    syntax: 'resume',
    usage: 'resume',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['exit', {
    name: 'exit',
    desc: 'Exit the terminal',
    syntax: 'exit',
    usage: 'exit',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['ls', {
    name: 'ls',
    desc: 'List files and directories',
    syntax: 'ls [directory]',
    usage: 'ls',
    aliases: [],
    arguments: [
      { arg: 'directory', desc: 'The directory to list files and directories in' }
    ],
    options: []
  }],
  ['pwd', {
    name: 'pwd',
    desc: 'Print the current working directory',
    syntax: 'pwd',
    usage: 'pwd',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['cd', {
    name: 'cd',
    desc: 'Change the current working directory',
    syntax: 'cd <directory>',
    usage: 'cd Documents',
    aliases: [],
    arguments: [
      { arg: 'directory', desc: 'The directory to change to' }
    ],
    options: []
  }],
  ['mkdir', {
    name: 'mkdir',
    desc: 'Create a new directory',
    syntax: 'mkdir <directory>',
    usage: 'mkdir new_directory',
    aliases: [],
    arguments: [
      { arg: 'directory', desc: 'The name of the new directory' }
    ],
    options: []
  }],
  ['mv', {
    name: 'mv',
    desc: 'Move files or directories',
    syntax: 'mv <source> <destination>',
    usage: 'mv file.txt new_directory',
    aliases: [],
    arguments: [
      { arg: 'source', desc: 'The file or directory to move' },
      { arg: 'destination', desc: 'The destination directory' }
    ],
    options: []
  }],
  ['cp', {
    name: 'cp',
    desc: 'Copy files or directories',
    syntax: 'cp <source> <destination>',
    usage: 'cp file.txt new_directory',
    aliases: [],
    arguments: [
      { arg: 'source', desc: 'The file or directory to copy' },
      { arg: 'destination', desc: 'The destination directory' }
    ],
    options: []
  }],
  ['rm', {
    name: 'rm',
    desc: 'Remove files or directories',
    syntax: 'rm <file>',
    usage: 'rm file.txt',
    aliases: [],
    arguments: [
      { arg: 'file', desc: 'The file or directory to remove' }
    ],
    options: []
  }],
  ['touch', {
    name: 'touch',
    desc: 'Create an empty file',
    syntax: 'touch <file>',
    usage: 'touch new_file.txt',
    aliases: [],
    arguments: [
      { arg: 'file', desc: 'The name of the new file' }
    ],
    options: []
  }],
  ['clear', {
    name: 'clear',
    desc: 'Clear the terminal screen',
    syntax: 'clear',
    usage: 'clear',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['cat', {
    name: 'cat',
    desc: 'Display the contents of a file',
    syntax: 'cat <file>',
    usage: 'cat file.txt',
    aliases: [],
    arguments: [
      { arg: 'file', desc: 'The file to display' }
    ],
    options: []
  }],
  ['echo', {
    name: 'echo',
    desc: 'Display a line of text',
    syntax: 'echo <text>',
    usage: 'echo Hello, World!',
    aliases: [],
    arguments: [
      { arg: 'text', desc: 'The text to display' }
    ],
    options: []
  }],
  ['less', {
    name: 'less',
    desc: 'View the contents of a file one page at a time',
    syntax: 'less <file>',
    usage: 'less file.txt',
    aliases: [],
    arguments: [
      { arg: 'file', desc: 'The file to view' }
    ],
    options: []
  }],
  ['uname', {
    name: 'uname',
    desc: 'Print system information',
    syntax: 'uname',
    usage: 'uname',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['whoami', {
    name: 'whoami',
    desc: 'Print the current user',
    syntax: 'whoami',
    usage: 'whoami',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['head', {
    name: 'head',
    desc: 'Display the beginning of a file',
    syntax: 'head <file>',
    usage: 'head file.txt',
    aliases: [],
    arguments: [
      { arg: 'file', desc: 'The file to display' }
    ],
    options: []
  }],
  ['tail', {
    name: 'tail',
    desc: 'Display the end of a file',
    syntax: 'tail <file>',
    usage: 'tail file.txt',
    aliases: [],
    arguments: [
      { arg: 'file', desc: 'The file to display' }
    ],
    options: []
  }],
  ['wc', {
    name: 'wc',
    desc: 'Count lines, words, and characters in a file',
    syntax: 'wc <file>',
    usage: 'wc file.txt',
    aliases: [],
    arguments: [
      { arg: 'file', desc: 'The file to count' }
    ],
    options: []
  }],
  ['ssh', {
    name: 'ssh',
    desc: 'Connect to a remote server',
    syntax: 'ssh <user>',
    usage: 'ssh user@host',
    aliases: [],
    arguments: [
      { arg: 'user@host', desc: 'The user and host to connect to' }
    ],
    options: []
  }],
  ['alias', {
    name: 'alias',
    desc: 'Create an alias for a command',
    syntax: 'alias <name>="<command>"',
    usage: 'alias ll="ls -l"',
    aliases: [],
    arguments: [
      { arg: 'name', desc: 'The name of the alias' },
      { arg: 'command', desc: 'The command to alias' }
    ],
    options: []
  }],
  ['sudo', {
    name: 'sudo',
    desc: 'Run a command with elevated privileges',
    syntax: 'sudo <command>',
    usage: 'sudo rm file.txt',
    aliases: [],
    arguments: [
      { arg: 'command', desc: 'The command to run with elevated privileges' }
    ],
    options: []
  }],
  ['chmod', {
    name: 'chmod',
    desc: 'Change file permissions',
    syntax: 'chmod <mode> <file>',
    usage: 'chmod 755 file.txt',
    aliases: [],
    arguments: [
      { arg: 'mode', desc: 'The permissions to set' },
      { arg: 'file', desc: 'The file to change permissions for' }
    ],
    options: []
  }],
  ['chown', {
    name: 'chown',
    desc: 'Change file owner and group',
    syntax: 'chown <user:group> <file>',
    usage: 'chown user:group file.txt',
    aliases: [],
    arguments: [
      { arg: 'user:group', desc: 'The user and group to set as owner' },
      { arg: 'file', desc: 'The file to change owner and group for' }
    ],
    options: []
  }]
]);

let commands_ran: { id: number, command: string, parameters: string[], path: string, output: string }[] = [];

const user = 'Guest@' + window.location.toString().split('/')[2];
const os = 'M.Y.O.S';
const version = 'v1.0';
let path: string = '~';

function findCommandByAlias(alias: string): Command | undefined {
  for (const [command, details] of commands.entries()) {
    if (details.aliases.includes(alias)) {
      return command;
    }
  }
  return undefined;
}

function runCommand(command: string, parameters: string[]) {
  let output = '';
  const actualCommand = commands.has(command as Command) ? command as Command : findCommandByAlias(command);

  if (command === 'man' || command === '?' || command === 'h' || command === 'help') {
    if (parameters.length === 1) {
      const cmd = parameters[0] as Command;
      const actualCmd = commands.has(cmd) ? cmd : findCommandByAlias(cmd);
      if (actualCmd) {
        output = 'man ' + actualCmd;
      } else {
        output = 'Manual page not found';
      }
    } else if (parameters.length === 0) {
      output = 'man';
    } else {
      output = 'Invalid number of parameters for help command';
    }
  } else if (actualCommand) {
    switch (actualCommand) {
      case 'about':
        output = 'About: This is a mock command line interface.';
        break;
      case 'alias':
        output = 'Must be logged in to use this command';
        break;
      case 'cat':
        // TODO: Implement cat command
        output = 'Cat: Displaying the contents of a file...';
        break;
      case 'cd':
        // TODO: Implement cd command
        output = 'Cd: Changing the directory...';
        break;
      case 'chmod':
        output = 'Must be logged in to use this command';
        break;
      case 'chown':
        output = 'Must be logged in to use this command';
        break;
      case 'clear':
        commands_ran = [];
        return;
      case 'contact':
        // TODO: Implement contact command
        output = 'Contact: You can reach me at example@example.com';
        break;
      case 'cp':
        output = 'Must be logged in to use this command';
        break;
      case 'echo':
        if (parameters.length === 0) {
          output = 'echo';
        } else {
          output = parameters.join(' ');
        }
        break;
      case 'exit':
        output = 'Exiting the terminal... Wait for it... Ran into an error: You can never leave!';
        break;
      case 'head':
        // TODO: Implement head command
        output = 'Head: Displaying the beginning of a file...';
        break;
      case 'less':
        // TODO: Implement less command
        output = 'Less: Viewing the contents of a file one page at a time...';
        break;
      case 'ls':
        // TODO: Implement ls command
        output = 'Ls: Listing files and directories...';
        break;
      case 'mkdir':
        output = 'Must be logged in to use this command';
        break;
      case 'mv':
        output = 'Must be logged in to use this command';
        break;
      case 'projects':
        // TODO: Implement projects command
        output = 'Projects: Here is a list of my projects...';
        break;
      case 'pwd':
        // TODO: Implement pwd command so that '~' is replaced with the actual path
        output = path;
        break;
      case 'resume':
        // TODO: Implement resume command
        output = 'Resume: Here is my resume...';
        break;
      case 'rm':
        output = 'Must be logged in to use this command';
        break;
      case 'skills':
        // TODO: Implement skills command
        output = 'Skills: Here are my skills...';
        break;
      case 'ssh':
        output = 'Must be logged in to use this command';
        break;
      case 'sudo':
        output = 'Stop trying to sudo! You are not MyKl-Y!';
        break;
      case 'tail':
        // TODO: Implement tail command
        output = 'Tail: Displaying the end of a file...';
        break;
      case 'touch':
        output = 'Must be logged in to use this command';
        break;
      case 'uname':
        if (parameters.length === 0) {
          output = user.split('@')[1];
        } else {
          output = 
            'Invalid number of parameters for uname command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: uname [options]';
        }
        break;
      case 'wc':
        // TODO: Implement wc command
        output = 'Wc: Counting lines, words, and characters in a file...';
        break;
      case 'whoami':
        if (parameters.length === 0) {
          output = user.split('@')[0];
        } else {
          output = 
            'Invalid number of parameters for whoami command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: whoami [options]';
        }
        break;
      default:
        output = 'Invalid command: ' + command;
    }
  } else {
    output = 'Invalid command: ' + command;
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
  //if (command in commands) {
    runCommand(command, parameters);
  //} else {
  //  runCommand('help', []); // If the command is not found, show the help message
  //}
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
    <span id="headers" v-if="showHeader">MyKl-Y Operating System ({{ os }}) {{ version }} </span>
    <br v-if="showHeader" />
    <!--<pre>
    ░▒▓██████████████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░              ░▒▓██████▓▒░        ░▒▓███████▓▒░        
    ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░               
    ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░               
    ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓███████▓▒░░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░       ░▒▓██████▓▒░         
    ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░             ░▒▓█▓▒░        
    ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓██▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓██▓▒░      ░▒▓█▓▒░▒▓██▓▒░ 
    ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓██▓▒░░▒▓██████▓▒░░▒▓██▓▒░▒▓███████▓▒░░▒▓██▓▒░ 
    </pre>-->
    <pre>
███╗   ███╗██╗   ██╗██╗  ██╗██╗     ██╗   ██╗     ██████╗    ███████╗   
████╗ ████║╚██╗ ██╔╝██║ ██╔╝██║     ╚██╗ ██╔╝    ██╔═══██╗   ██╔════╝   
██╔████╔██║ ╚████╔╝ █████╔╝ ██║█████╗╚████╔╝     ██║   ██║   ███████╗   
██║╚██╔╝██║  ╚██╔╝  ██╔═██╗ ██║╚════╝ ╚██╔╝      ██║   ██║   ╚════██║   
██║ ╚═╝ ██║   ██║   ██║  ██╗███████╗   ██║       ╚██████╔╝██╗███████║██╗
╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝   ╚═╝        ╚═════╝ ╚═╝╚══════╝╚═╝ {{ version }}</pre>
    <span v-if="showHelpPrompt">Type <code>man</code> for a list of commands</span>
    <br v-if="showHelpPrompt" />
    <span v-for="command in commands_ran" :key="command.id">
      <span id="user">{{ user }}</span>:<span id="path">{{ command.path }}</span>$
      <span>{{ command.command + " " }}</span>
      <span v-for="(parameter, index) in command.parameters" :key="index"> {{ parameter + " " }}</span>
      <br/>
      <HelpOutput v-if="command.output == 'man'" :commands="commands" />
      <ManualPage
        v-else-if="command.output.startsWith('man') && command.output.split(' ').length > 1 && commands.get(command.output.split(' ')[1] as Command)"
        :command="commands.get(command.output.split(' ')[1] as Command)!"
      />
      <pre id="headers" v-else-if="['uname', 'whoami'].includes(command.command) && command.parameters.length < 1">{{ command.output }}</pre>
      <pre v-else-if="command.command === 'echo' && command.parameters.length > 0">{{ command.output }}</pre>
      <span v-else-if="command.command === 'echo' && command.parameters.length === 0">
        <span>echo</span> <span style="font-size: .75rem;">echo</span> <span style="font-size: .5rem;">echo</span> <span style="font-size: .25rem;">echo</span> <br/>
      </span>
      <pre class="error" v-else v-html="command.output"></pre>
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

pre {
  line-height: normal;
}

.error {
  color: #ff0000;
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ffffff;
  padding: 0.5rem;
  text-align: left;
}

th {
  background-color: #444;
}

td {
  background-color: #333;
}
</style>
