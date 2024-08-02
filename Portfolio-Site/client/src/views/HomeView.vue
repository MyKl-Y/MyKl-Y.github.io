<script setup lang="ts">
import { ref, onMounted, computed, nextTick, watch, provide } from 'vue';
import HelpOutput from '@/components/HelpOutput.vue';
import ManualPage from '@/components/ManualPage.vue';
import AboutContent from '@/components/AboutContent.vue';
import ResumeContent from '@/components/ResumeContent.vue';
import SkillsContent from '@/components/SkillsContent.vue';
import ContactContent from '@/components/ContactContent.vue';
import ProjectsContent from '@/components/ProjectsContent.vue';
import Api from '@/api';
import type { Resume } from '@/types';

const view = ref('console');

const theme = ref('mykl-y');

const styleObject = computed(() => themes.get(theme.value));

const commandHistory = ref<string[]>([]);
const currentCommandIndex = ref<number>(-1);
const suggestion = ref('');

const resumes = ref<Resume[]>([]);

function switchTheme(newTheme: string) {
  theme.value = newTheme;
}

const themes = new Map([
  ['mykl-y', {
    '--background-color': '#212121',
    '--text-color': '#FFFFFF',
    '--user-color': '#CCCCFF',
    '--ampersand-color': '#FFFFFF',
    '--machine-color': '#4EC9B0',
    '--path-color': '#FFC000',
    '--header-color': '#4169E1',
    '--error-color': '#FF0000',
    '--input-color': '#DAE6F0',
    '--directory-color': '#FFC000',
  }],
  ['ubuntu', {
    '--background-color': '#300A24',
    '--text-color': '#FFFFFF',
    '--user-color': '#8AE234',
    '--ampersand-color': '#8AE234',
    '--machine-color': '#8AE234',
    '--path-color': '#729FCF',
    '--header-color': '#34E2E2',
    '--error-color': '#EF2929',
    '--input-color': '#FFFFFF',
  }],
  ['terminal', {
    '--background-color': '#111111',
    '--text-color': '#FFFFFF',
    '--user-color': '#FFFFFF',
    '--ampersand-color': '#FFFFFF',
    '--machine-color': '#FFFFFF',
    '--path-color': '#FFFFFF',
    '--header-color': '#FFFFFF',
    '--error-color': '#FFFFFF',
    '--input-color': '#FFFFFF',
  }],
  ['matrix', {
    '--background-color': '#000000',
    '--text-color': '#00FF00',
    '--user-color': '#00FF00',
    '--ampersand-color': '#00FF00',
    '--machine-color': '#00FF00',
    '--path-color': '#00FF00',
    '--header-color': '#00FF00',
    '--error-color': '#FF0000',
    '--input-color': '#00FF00',
  }],
  ['powershell', {
    '--background-color': '#012456',
    '--text-color': '#FFFFFF',
    '--user-color': '#FFFFFF',
    '--ampersand-color': '#FFFFFF',
    '--machine-color': '#FFFFFF',
    '--path-color': '#FFFFFF',
    '--header-color': '#FFFFFF',
    '--error-color': '#FF0000',
    '--input-color': '#FFFF00',
  }],
  ['chrome', {
    '--background-color': '#202124',
    '--text-color': '#FFFFFF',
    '--user-color': '#87FFC5',
    '--ampersand-color': '#87FFC5',
    '--machine-color': '#87FFC5',
    '--path-color': '#9AB3DD',
    '--header-color': '#FFFFFF',
    '--error-color': '#FF0000',
    '--input-color': '#43608E',
  }]
]);

const file_structure = {
  root: {
    home: {
      bin: {
        ls: 'ls',
        pwd: 'pwd',
        cd: 'cd',
        mkdir: 'mkdir',
        mv: 'mv',
        cp: 'cp',
        rm: 'rm',
        touch: 'touch',
        cat: 'cat',
        echo: 'echo',
        less: 'less',
      },
      documents: {
        resume: 'resume.pdf',
        projects: {
          project1: 'project1.pdf',
          project2: 'project2.pdf'
        }
      },
      skills: 'skills.txt',
      contact: 'contact.txt'
    }
  }
};

// Define the type for the commands
type Command = 'man' | 'portfolio' | 'about' | 'contact' | 'projects' | 'skills' | 'resume' | 'clear' | 'exit' | 'ls' | 'pwd' | 'cd' | 'mkdir' | 'mv' | 'cp' | 'rm' | 'touch' | 'cat' | 'echo' | 'less' | 'man' | 'uname' | 'whoami' | 'head' | 'tail' | 'wc' | 'ssh' | 'alias' | 'sudo' | 'chmod' | 'chown' | 'theme';

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
  ['portfolio', {
    name: 'portfolio',
    desc: 'Display information about the creator\'s portfolio',
    syntax: 'portfolio',
    usage: 'portfolio',
    aliases: [],
    arguments: [],
    options: []
  }],
  ['theme', {
    name: 'theme',
    desc: 'Change/List the terminal theme',
    syntax: 'theme OR theme <theme_name> OR theme -l',
    usage: 'theme OR theme terminal OR theme -l',
    aliases: [],
    arguments: [
      { arg: 'theme_name', desc: '(Optional) The name of the theme to switch to' }
    ],
    options: [
      { opt: '-l', desc: '(Optional) List available themes' }
    ]
  }],
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
const version = 'v2024.07';
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
      case 'portfolio':
        if (parameters.length === 0) {
          output = 'portfolio';
          view.value = 'portfolio';
        } else {
          output = 
            'Invalid number of parameters for portfolio command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: portfolio [options]';
        }
        break;
      case 'theme':
        if (parameters.length === 0) {
          output = 'theme';
        } else if (parameters.length === 1) {
          const newTheme = parameters[0];
          if (newTheme === '-l') {
            output = 'Available themes:\n' + Array.from(themes.keys()).join(', ');
          } else {
            if (themes.has(newTheme)) {
              switchTheme(newTheme);
              output = 'Theme changed to ' + newTheme;
            } else {
              output = 'Theme not found: ' + newTheme;
            }
          }
        } else {
          output = 
            'Invalid number of parameters for theme command\n' 
            + 'Expected: <= 1  | Actual: ' + parameters.length + '\n' + 'Usage: theme [option/argument]';
        }
        break;
      case 'about':
        if (parameters.length === 0) {
          output = 'about';
          view.value = 'about';
        } else {
          output = 
            'Invalid number of parameters for about command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: about [options]';
        }
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
        if (parameters.length === 0) {
          output = 'contact';
          view.value = 'contact';
        } else {
          output = 
            'Invalid number of parameters for contact command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: contact [options]';
        }
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
        if (parameters.length === 0) {
          output = 'projects';
          view.value = 'projects';
        } else {
          output = 
            'Invalid number of parameters for projects command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: projects [options]';
        }
        break;
      case 'pwd':
        // TODO: Implement pwd command so that '~' is replaced with the actual path
        output = path;
        break;
      case 'resume':
        if (parameters.length === 0) {
          output = 'resume';
          view.value = 'resume';
        } else {
          output = 
            'Invalid number of parameters for resume command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: resume [options]';
        }
        break;
      case 'rm':
        output = 'Must be logged in to use this command';
        break;
      case 'skills':
        if (parameters.length === 0) {
          output = 'skills';
          view.value = 'skills';
        } else {
          output = 
            'Invalid number of parameters for skills command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: skills [options]';
        }
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
        output = 'Command not found: ' + command;
    }
  } else {
    if (command === '') {
      output = '';
      command = ' ';
    } else if (command === 'q' && view.value !== 'console') {
      view.value = 'console';
      return;
    } else {
      output = 'Command not found: ' + command;
    }
  }
  if (view.value === 'console' || command === 'resume' || command === 'about' || command === 'contact' || command === 'projects' || command === 'skills' || command === 'portfolio') {
    commands_ran.push({ id: commands_ran.length + 1, command, parameters, path, output });
  }
}

const input = ref('');
const showHeader = ref(false);
const showHelpPrompt = ref(false);
const showUserInput = ref(false);

const caretOffset = computed(() => `${input.value.length}ch`);

const suggestedCompletion = computed(() => {
  if (input.value.trim() === '') {
    return '';
  }
  const matchingCommands = Array.from(commands.keys()).filter(cmd =>
    cmd.startsWith(input.value)
  );
  return matchingCommands.length === 1 ? matchingCommands[0] : '';
});

watch(input, () => {
  suggestion.value = suggestedCompletion.value;
});

function handleSubmit() {
  if (input.value.trim() !== '') {
    commandHistory.value.push(input.value);
    currentCommandIndex.value = -1; // Reset command history index

    const [command, ...parameters] = input.value.split(' ');
    runCommand(command, parameters);
  } else {
    input.value = ' ';
    runCommand('', []);
  }
  input.value = '';
  suggestion.value = '';
  if (view.value === 'console') {
    nextTick(() => {
      const terminal = document.getElementById('bottom');
      terminal?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'ArrowUp') {
    if (commandHistory.value.length > 0) {
      if (currentCommandIndex.value === -1) {
        currentCommandIndex.value = commandHistory.value.length - 1;
      } else if (currentCommandIndex.value > 0) {
        currentCommandIndex.value--;
      }
      input.value = commandHistory.value[currentCommandIndex.value];
      suggestion.value = '';
    }
  } else if (event.key === 'ArrowDown') {
    if (commandHistory.value.length > 0 && currentCommandIndex.value !== -1) {
      if (currentCommandIndex.value < commandHistory.value.length - 1) {
        currentCommandIndex.value++;
        input.value = commandHistory.value[currentCommandIndex.value];
      } else {
        currentCommandIndex.value = -1;
        input.value = '';
      }
      suggestion.value = '';
    }
  } else if (event.key === 'Tab') {
    event.preventDefault();
    /*
    const matchingCommands = Array.from(commands.keys()).filter(cmd =>
      cmd.startsWith(input.value)
    );
    if (matchingCommands.length === 1) {
      //input.value = matchingCommands[0] + '';
      suggestion.value = matchingCommands[0];
      input.value = suggestion.value + '';
      suggestion.value = '';
    } else if (matchingCommands.length > 1) {
      suggestion.value = matchingCommands[0];
    }
    */
    if (suggestion.value) {
      input.value = suggestion.value;
      suggestion.value = '';
    }
  } else {
    suggestion.value = '';
  }
}

async function fetchResumes() {
  try {
    const response = await Api.getResumes();
    resumes.value = response.data;
  } catch (error) {
    console.error('Error fetching resumes:', error);
  }
}

provide('resumes', resumes);

onMounted(() => {
  fetchResumes();
  showHeader.value = true;
  setTimeout(() => {
    showHelpPrompt.value = true;
    setTimeout(() => {
      if (resumes.value && resumes.value.length > 0) {
        showUserInput.value = true;
      }
    }, 500); // .5 second delay for user input prompt
  }, 1000); // 1 second delay for help prompt
});
</script>

<template>
  <main :style="styleObject">
    <span class="navbar">
      <span class="buttons">
        <button class="button close"></button>
        <button class="button minimize"></button>
        <button class="button maximize"></button>
      </span>
      <span class="title">
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="1rem" height="1rem" viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet">

          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="#ffffff" stroke="none">
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
        github.com/mykl-y
      </span>
      <span class="blank"></span>
    </span>
    <div class="body">
      <span v-if="view === 'console'">
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
        <span v-if="showHelpPrompt">Type `<code>man</code>` for a list of commands.</span>
        <br v-if="showHelpPrompt" />
        <span v-if="showHelpPrompt">Type `<code>portfolio</code>` to view full portfolio.</span>
        <br v-if="showHelpPrompt" />
        <span v-for="command in commands_ran" :key="command.id">
          <span id="user">{{ user.split('@')[0] }}</span>
          <span id="ampersand">@</span>
          <span id="machine">{{ user.split('@')[1] }}</span>
          <span>:</span>
          <span id="path">{{ command.path }}</span>$
          <span class="code">{{ command.command + " " }}</span>
          <span class="code" v-for="(parameter, index) in command.parameters" :key="index"> {{ parameter + " " }}</span>
          <br/>
          <HelpOutput v-if="command.output == 'man'" :commands="commands" />
          <ManualPage
            v-else-if="command.output.startsWith('man') && command.output.split(' ').length > 1 && commands.get(command.output.split(' ')[1] as Command)"
            :command="commands.get(command.output.split(' ')[1] as Command)!"
          />
          <span v-else-if="command.output === 'theme'">
            Current theme: <span id="headers">{{ theme }}</span>
            <br/>
            For list of themes, run <code>theme -l</code>.
            <br/>
            To change themes, run <code>theme &lt;theme_name&gt;</code>.
            <br/>
          </span>
          <pre class="error" v-else-if="command.command === 'theme' && command.parameters.length === 1 && command.output.includes('not found')">{{ command.output }}</pre>
          <pre v-else-if="command.command === 'theme' && command.parameters.length === 1">{{ command.output.split(' ').map(
            (word, index) => index < 3 ? word : ""
          ).join(' ') }}<code v-if="command.parameters[0] !== '-l'">{{ command.output.split(' ')[command.output.split(' ').length - 1] }}</code></pre>
          <pre v-else-if="['resume', 'about', 'projects', 'contact', 'skills', 'portfolio'].includes(command.command) && command.parameters.length < 1"></pre>
          <pre id="headers" v-else-if="['uname', 'whoami'].includes(command.command) && command.parameters.length < 1">{{ command.output }}</pre>
          <pre v-else-if="command.command === 'echo' && command.parameters.length > 0">{{ command.output }}</pre>
          <span v-else-if="command.command === 'echo' && command.parameters.length === 0">
            <span>echo</span> <span style="font-size: .75rem;">echo</span> <span style="font-size: .5rem;">echo</span> <span style="font-size: .25rem;">echo</span> <br/>
          </span>
          <pre class="error" v-else v-html="command.output"></pre>
        </span>
      </span>
      <span v-else-if="view === 'about'">
        <div class="secondary-header">
          <span>about(1)</span>
          <span id="headers">About Me</span>
          <span>about(1)</span>
        </div>
        <br/>
        <AboutContent />
      </span>
      <span v-else-if="view === 'resume'">
        <div class="secondary-header">
          <span>resume(1)</span>
          <span id="headers">Resume</span>
          <span>resume(1)</span>
        </div>
        <br/>
        <ResumeContent />
      </span>
      <span v-else-if="view === 'projects'">
        <div class="secondary-header">
          <span>projects(1)</span>
          <span id="headers">Projects</span>
          <span>projects(1)</span>
        </div>
        <br/>
        <ProjectsContent />
      </span>
      <span v-else-if="view === 'skills'">
        <div class="secondary-header">
          <span>skills(1)</span>
          <span id="headers">Skills</span>
          <span>skills(1)</span>
        </div>
        <br/>
        <SkillsContent />
      </span>
      <span v-else-if="view === 'contact'">
        <div class="secondary-header">
          <span>contact(1)</span>
          <span id="headers">Contact</span>
          <span>contact(1)</span>
        </div>
        <br/>
        <ContactContent />
      </span>
      <span v-else-if="view === 'portfolio'">
        <div class="secondary-header">
          <span>portfolio(1)</span>
          <span id="headers">Portfolio</span>
          <span>portfolio(1)</span>
        </div>
        <br/>
        <div id="headers" style="text-align: center;">About Me</div>
        <AboutContent />
        <br/>
        <div id="headers" style="text-align: center;">My Skills</div>
        <SkillsContent />
        <br/>
        <div id="headers" style="text-align: center;">Projects Experience</div>
        <ProjectsContent />
        <br/>
        <div id="headers" style="text-align: center;">My Resume</div>
        <ResumeContent />
        <br/>
        <div id="headers" style="text-align: center;">Contact Me</div>
        <ContactContent />
      </span>
      <span v-if="showUserInput" class="input-line-container">
        <span v-if="view === 'console'">
          <span id="user">{{ user.split('@')[0] }}</span>
          <span id="ampersand">@</span>
          <span id="machine">{{ user.split('@')[1] }}</span>
          <span>:</span>
          <span id="path">{{ path }}</span>$ 
        </span>
        <span v-else>:</span>
        <form @submit.prevent="handleSubmit" class="input-form">
          <span class="blinking-cursor" :style="{ left: caretOffset }"></span>
          <input v-model="input" type="text" class="input-text" @keydown="handleKeyDown" />
          <span class="suggestion" v-if="suggestion" :style="{ left: caretOffset }">{{ suggestion.replace(input, '') }}</span>
        </form>
      </span>
      <span id="bottom"></span>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  width: 100vw;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.navbar {
  display: flex; 
  width: 95vw;
  justify-content: space-between;
  background-color: #444;
  border: 1px solid #ffffff;
  border-radius: .5rem .5rem 0 0;
  border-bottom: none !important;
  color: #ffffff;
}
.title {
  display: flex;
  align-items: center;
}
svg {
  margin-right: .25rem;
}
.buttons, .blank {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 3rem;
  margin: 0 .25rem;
}
.button {
  width: .75rem;
  height: .75rem;
  border-radius: 50%;
  border: none;
}
.button.close {
  background-color: #FF5C57;
}
.button.minimize {
  background-color: #FFBD2E;
}
.button.maximize {
  background-color: #27C93F;
}
.body {
  font-family: monospace;
  height: 85vh;
  width: 95vw;
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 1rem;
  padding: 1rem;
  overflow: scroll;
  border-radius: 0 0 .5rem .5rem;
  border: 1px solid #ffffff;
  border-top: none !important;
}
.secondary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
pre {
  line-height: normal;
}

.error {
  color: var(--error-color);
}

#headers {
  color: var(--header-color);
  text-decoration: none !important;
  font-style: normal !important;
  font-weight: bolder;
}

#user {
  color: var(--user-color);
  text-decoration: none !important;
  font-style: normal !important;
}
#ampersand {
  color: var(--ampersand-color);
  text-decoration: none !important;
  font-style: normal !important;
}
#machine {
  color: var(--machine-color);
  text-decoration: none !important;
  font-style: normal !important;
}

#path {
  color: var(--path-color);
  text-decoration: none !important;
  font-style: normal !important;
}

input {
  background-color: transparent;
  color: var(--input-color);
  border: none;
  font-family: monospace;
  font-size: 1rem;
  padding: 0;
  margin: 0;
  outline: none;
}
.suggestion {
  color: var(--input-color);
  opacity: 0.5;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
}

.code {
  color: var(--input-color);
}
code {
  font-weight: bolder;
  color: var(--input-color)
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
  position: relative;
  margin-left: .5rem;
  flex-grow: 1;
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
  background-color: var(--input-color);
  animation: blink 1s linear infinite;
  bottom: 4px;
}
.input-form:not(:focus-within) .blinking-cursor {
  background-color: transparent !important;
  border: 1px solid var(--input-color);
}

@keyframes blink {
  from, to {
    background-color: transparent;
    border-color: transparent;
  }
  50% {
    background-color: var(--input-color);
    border-color: var(--input-color);
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
</style>
