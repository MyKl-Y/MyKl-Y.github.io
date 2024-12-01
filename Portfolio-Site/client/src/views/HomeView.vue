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

interface File {
  type: 'file';
  content: string;
}

interface Directory {
  type: 'directory';
  children: {
    [key: string]: Directory | File;
  };
}

const file_structure: Directory = {
  type: 'directory',
  children: {
    'home': {
      type: 'directory',
      children: {
        'mykl-y': {
          type: 'directory',
          children: {
            'about': {
              type: 'file',
              content: `
                Hello! My name is Michael Yim

                I'm a passionate and driven individual currently pursuing a Computer Engineering 
                major at Georgia Institute of Technology, 
                specializing in Distributed Software 
                and System Design and Signal and Information Processing. 
                With minors in Robotics for Automation, Perception, and Applications of 
                Artificial Intelligence and Machine Learning, 
                my academic journey is rich and diverse, encompassing topics 
                like computer vision, machine learning, digital system design, and more.

                My professional experience includes a software engineering internship at Home Depot, 
                where I showcased adaptability and innovation, and various roles at a local company, 
                where I honed my skills in system engineering and management. I have also 
                undertaken numerous projects, such as developing a Student Management Dashboard with 
                MongoDB, creating APIs for course and task management, and designing a NeoLoad API workflow 
                integrated with Google Cloud and BigQuery.

                BS CmpE @ GT      Intern end        Intern end        Intern end             ?
                  202▓.08           2023.08           2024.08           2025.08           ???????
                     ╚════════╦════════╩════════╦════════╩─═─═─═─═┬═─═─═─═─╩─═─═─═─═┬═─═─═─═─╩─═─═─═─═ ⋯ →
                           2023.05           2024.05           2025.05           2026.05
                        Intern @ KNC     SWE intern @ THD   SWE intern @ ???   Graduate BS

                Beyond my academic and professional pursuits, I have a multitude of interests ranging 
                from high-fidelity audio, gaming, and space, to personal finance, fitness, and fashion. 
                My hobbies reflect my love for learning and creativity, with a particular fondness for 
                food and art.

                Balancing my professional aspirations with personal commitments, I am also a proud parent 
                to a wonderful ▓-year-old son, finding immense joy and accomplishment in parenthood. 
                As I aim for an MBA or MS in Machine Learning, AI, or Data Science, followed by a PhD, 
                my ultimate goal is to excel as an AI or Robotics Engineer, contributing to 
                advancements in technology while embracing the journey of continuous learning and growth.
              `
            },
            'contact': {
              type: 'file',
              content: `
                Email MichaelYYim@gmail.com
                GitHub MyKl-Y
                LinkedIn Michael Yim-Olmos
                LeetCode Mikey091303
                CodePen MyKl-Y
                HackerRank MichaelYYim
                Stack Overflow Michael Yoosung Yim-Olmos
                Medium MichaelYYim
              `
            },
            'projects': {
              type: 'file',
              content: `
                (Ongoing) High-Fidelity Audio Player Mobile Hardware
                < KiCAD|Digital Signal Processing|Circuit Design|Electrical Design|Systems Engineering >
                Designed a high-fidelity audio player circuit, compatible with custom headphone amplifiers and in-ear monitors. Currently developing an embedded system with a bespoke Hi-Fi music application for superior audio playback.
                
                (Ongoing) High-Fidelity Lossless Music System Embedded System
                < Systems Engineering|Software Engineering|C++ >
                Developing a high-resolution, lossless audio music playing operating system tailored for a custom audio player, aimed at delivering audiophile-grade sound quality and user satisfaction.
                
                (2024-07) Student Dashboard Web Application
                < JavaScript|MongoDB|Express|Node|React|Material UI|Software Engineering|Data Science|Framer Motion|Styled Components|Python|BeautifulSoup|Flask >
                Built a centralized academic tracking platform using MongoDB, Express.js, Node.js, React.js, and Bootstrap. This tool has improved students organizational efficiency by providing a comprehensive overview of their academic progress and deadlines.
                
                (2024-05) Asteroids Game Game Boy Advance Video Game
                < C >
                Created a clone of the classic Asteroids arcade game for the GameBoy Advanced, utilizing advanced C programming skills and a deep understanding of ARM processor architecture to replicate the games mechanics and performance.
                
                (2024-04) Wrap it Up Mobile Application
                < Java|Android Studio|Software Engineering >
                Developed an Android application leveraging the Spotify API, OpenAI API, and Firebase to provide year-round Spotify wrapped summaries. This tool allows users to track, share, and compare their top music with friends throughout the year.
                
                (2024-03) Headphone Amplifier with DAC Audio Hardware
                < Digital Signal Processing|Circuit Design|Electrical Design >
                Created a high-fidelity sound amplifier circuit featuring a detachable digital-to-analog converter (DAC), providing exceptional audio performance and versatility for audiophiles.
                
                (2024-03) In-Ear Monitors Audio Hardware
                < Digital Signal Processing|Circuit Design|Electrical Design >
                Engineered a circuit for custom in-ear monitors equipped with a microphone and active noise cancellation, significantly improving audio quality and user immersion.
                
                (2024-01) Ergonomic Orthodox Keyboard Keyboard
                < QMK|KiCAD|Circuit Design|Electrical Design >
                Designed and developed an ergonomic keyboard using KiCad, optimizing for user comfort and efficiency. Flashed the firmware with Quantum Mechanical Keyboard (QMK) to enhance customizability and user experience.
                
                (2024-01) Rogue-Like Game Video Game
                < Python|TCOD >
                Developed an ASCII styled roguelike game in Python, showcasing proficiency in advanced programming techniques, basic artificial intelligence, and creative problem-solving abilities in game design.
                
                (2023-09) Nutrition Tracker Desktop Application
                < Java|JavaFX|Software Engineering >
                Created a Java and JavaFX desktop application for tracking daily nutrition intake, enhancing user adherence to dietary goals with intuitive tracking features and personalized recommendations.
                
                (2023-05) Adventure Game Video Game
                < C++|SDL|OpenGL >
                Designed and programmed a graphical adventure game in C++ with SDL, demonstrating advanced skills in game development, including game logic, graphics rendering, and user interaction.
                
                (2023-05) Music Explorer Application Desktop Application
                < Java|JavaFX|Software Engineering >
                Integrated Spotify, LastFM, and iTunes APIs using Java and JavaFX to create a comprehensive music exploration tool, enabling seamless discovery and exploration of new music tracks and artists.
              `
            },
            'skills': {
              type: 'file',
              content: `
                Cloud:
                - 80% AWS
                - 85% GCP
                - 75% Azure
                Database:
                - 75% SQLite
                - 80% MySQL
                - 85% BigQuery
                - 80% MongoDB
                - 70% Prometheus
                - 75% Firebase
                Frameworks:
                - 80% Flask
                - 75% Django
                - 70% PyTorch
                - 70% TensorFlow
                - 75% Spring Boot
                - 80% React
                - 70% Vue
                - 80% Express
                - 65% Angular
                - 80% Node
                - 75% Bootstrap
                - 70% Tailwind
                - 70% Sass
                Languages:
                - 90% Java
                - 85% C
                - 85% C++
                - 70% R
                - 95% Python
                - 80% JavaScript
                - 75% TypeScript
                - 80% HTML
                - 75% CSS
                - 65% Kotlin
                - 60% Go
                - 85% SQL
                - 70% GraphQL
                - 80% Bash
                - 65% MATLAB
                Libraries:
                - 70% JavaFX
                - 65% OpenGL
                - 85% Pandas
                - 85% NumPy
                - 80% Matplotlib
                - 75% BeautifulSoup
                - 70% OpenCV
                - 70% jQuery
                - 65% Framer Motion
                - 100% Styled Components
                - 85% Material UI
                Operating systems:
                - 85% Linux
                - 80% Windows
                - 75% Mac
                Software:
                - 90% Microsoft Office Suite
                - 75% Adobe Suite
                - 95% VS Code
                - 75% Jupyter Notebooks
                - 85% JetBrains
                - 90% Android Studio
                - 65% Emacs
                - 70% Vim
                - 60% AutoCAD
                - 70% KiCAD
                - 70% QMK
                - 60% Unreal Engine
                - 65% Unity
                - 80% Figma
                Techniques:
                - 60% Circuit Design
                - 55% Electrical Design
                - 70% Automation
                - 70% Test Engineering
                - 75% Performance Engineering
                - 55% Cloud Computing
                - 80% Software Engineering
                - 60% Data Science
                - 45% System Engineering
                - 50% Distributed Computing
                - 45% Digital Signal Processing
                Tools:
                - 85% Git
                - 80% Docker
                - 75% Kubernetes
                - 70% Tableau
                - 70% PowerBI
                - 75% Grafana
                - 70% NeoLoad
                - 80% Postman
                - 60% 3D-Printing
                - 50% Oscilloscope
                - 55% Multimeter
                - 75% Soldering Iron
              `
            },
            'resume': {
              type: 'file',
              content: `
                Michael Y Yim
                MichaelYYim@gmail.com | (***) ***-**** | *****, GA | LinkedIn | GitHub | Portfolio
                
                SKILLS
                Hard Skills:
                Cloud: AWS, GCP, Azure
                Database: SQLite, MySQL, BigQuery, MongoDB, Prometheus, Firebase
                Frameworks: Flask, Django, PyTorch, TensorFlow, Spring Boot, React, Vue, Express, Angular, Node, Bootstrap, Tailwind, Sass
                Languages: Java, C, C++, R, Python, JavaScript, TypeScript, HTML, CSS, Kotlin, Go, SQL, GraphQL, Bash, MATLAB
                Libraries: JavaFX, OpenGL, Pandas, NumPy, Matplotlib, BeautifulSoup, OpenCV, jQuery, Framer Motion, Styled Components, Material UI
                Operating systems: Linux, Windows, Mac
                Software: Microsoft Office Suite, Adobe Suite, VS Code, Jupyter Notebooks, JetBrains, Android Studio, Emacs, Vim, AutoCAD, KiCAD, QMK, Unreal Engine, Unity, Figma
                Techniques: Circuit Design, Electrical Design, Automation, Test Engineering, Performance Engineering, Cloud Computing, Software Engineering, Data Science, System Engineering, Distributed Computing, Digital Signal Processing
                Tools: Git, Docker, Kubernetes, Tableau, PowerBI, Grafana, NeoLoad, Postman, 3D-Printing, Oscilloscope, Multimeter, Soldering Iron
                Soft Skills:
                Communication, Teamwork, Problem-solving, Project Planning, Project Management, Time Management, Adaptability
                
                EDUCATION
                Georgia Institute of Technology - Bachelor of Science in Computer Engineering
                Expected December 2026 Atlanta, GA
                - Concentrations: Distributed System & Software Design and Signal Information Processing
                - Minors: Robotics and Applications of Artificial Intelligence and Machine Learning
                - Cumulative GPA: 3.85
                - Relevant Coursework:
                  - Differential Equations
                  - Fundamentals of Machine Learning
                  - Architecture, Systems, Concurrency, and Energy
                  - Programming Hardware and Software Systems
                  - Digital Design Lab
                  - Introduction to Signal Processing
                  - Digital System Design
                  - Design and Analysis of Algorithms
                  - Introduction to Database Systems
                  - Multivariable Calculus
                  - Statistics and Probability with Applications
                  - Linear Algebra
                  - Objects and Design
                  - Data Structures and Algorithms
                  - Computer Organization and Programming
                  - Introduction to Object Oriented Programming
                  - Physics II: Electromagnetism
                  - Physics I: Kinematics
                  - Integral Calculus
                  - Differential Calculus
                  - Principles of Macroeconomics
                - Awards: Deans List x6, Highest Honors

                PROJECTS
                Ergonomic Orthodox Keyboard - Keyboard
                - Designed and developed an ergonomic keyboard using KiCad, optimizing for user comfort and efficiency. Flashed the firmware with Quantum Mechanical Keyboard (QMK) to enhance customizability and user experience.
                In-Ear Monitors - Audio Hardware
                - Engineered a circuit for custom in-ear monitors equipped with a microphone and active noise cancellation, significantly improving audio quality and user immersion.
                Headphone Amplifier with DAC - Audio Hardware
                - Created a high-fidelity sound amplifier circuit featuring a detachable digital-to-analog converter (DAC), providing exceptional audio performance and versatility for audiophiles.
                High-Fidelity Audio Player - Mobile Hardware
                - Designed a high-fidelity audio player circuit, compatible with custom headphone amplifiers and in-ear monitors. Currently developing an embedded system with a bespoke Hi-Fi music application for superior audio playback.
                High-Fidelity Lossless Music System - Embedded System
                - Developing a high-resolution, lossless audio music playing operating system tailored for a custom audio player, aimed at delivering audiophile-grade sound quality and user satisfaction.
                Music Explorer Application - Desktop Application
                - Integrated Spotify, LastFM, and iTunes APIs using Java and JavaFX to create a comprehensive music exploration tool, enabling seamless discovery and exploration of new music tracks and artists.
                Wrap it Up - Mobile Application
                - Developed an Android application leveraging the Spotify API, OpenAI API, and Firebase to provide year-round Spotify wrapped summaries. This tool allows users to track, share, and compare their top music with friends throughout the year.
                Nutrition Tracker - Desktop Application
                - Created a Java and JavaFX desktop application for tracking daily nutrition intake, enhancing user adherence to dietary goals with intuitive tracking features and personalized recommendations.
                Student Dashboard - Web Application
                - Built a centralized academic tracking platform using MongoDB, Express.js, Node.js, React.js, and Bootstrap. This tool has improved students organizational efficiency by providing a comprehensive overview of their academic progress and deadlines.
                Adventure Game - Video Game
                - Designed and programmed a graphical adventure game in C++ with SDL, demonstrating advanced skills in game development, including game logic, graphics rendering, and user interaction.
                Rogue-Like Game - Video Game
                - Developed an ASCII styled roguelike game in Python, showcasing proficiency in advanced programming techniques, basic artificial intelligence, and creative problem-solving abilities in game design.
                Asteroids Game - Game Boy Advance Video Game
                - Created a clone of the classic Asteroids arcade game for the GameBoy Advanced, utilizing advanced C programming skills and a deep understanding of ARM processor architecture to replicate the games mechanics and performance.

                EXPERIENCE
                The Home Depot - Software Engineer (Intern)
                May 2024 - July 2024 Atlanta, GA
                - Developed an Automated Utility: Created a Python script that extracts raw results from the NeoLoad Performance testing tool via the NeoLoad API. This script processes and refines the data into a CSV format.
                - Integrated with Google Cloud: Set up a Google Managed Prometheus (GMP) Pushgateway instance on a Kubernetes Engine cluster and a Google BigQuery dataset to receive metrics and data from the Python script.
                - Enhanced Visualization: Designed and configured Grafana dashboards to visualize performance metrics, providing a centralized tool for backend performance testing.
                - Streamlined CI/CD: Maintained continuous integration and deployment processes using GitHub Actions, ensuring seamless updates and improvements.
                - Comprehensive Documentation: Documented the utility and performance engineering processes, facilitating future use and enhancements by other developers.
                - Centralized Performance Testing Tool: Created a robust tool enabling software engineers to efficiently test backend performance from a unified platform, replacing the need for multiple disparate tools.
              `
            },
            'portfolio': {
              type: 'file',
              content: `
                Just go through the website and you'll see everything you need to know about me.
              `
            }
          }
        }
      }
    },
    'bin': {
      type: 'directory',
      children: {
        'ls': {
          type: 'file',
          content: `
            // ls.c
            ...
            // end of ls.c
          `
        },
        'pwd': {
          type: 'file',
          content: `
            // pwd.c
            ...
            // end of pwd.c
          `
        },
        'cd': {
          type: 'file',
          content: `
            // cd.c
            ...
            // end of cd.c
          `
        },
        'mkdir': {
          type: 'file',
          content: `
            // mkdir.c
            ...
            // end of mkdir.c
          `
        },
        'mv': {
          type: 'file',
          content: `
            // mv.c
            ...
            // end of mv.c
          `
        },
        'cp': {
          type: 'file',
          content: `
            // cp.c
            ...
            // end of cp.c
          `
        },
        'rm': {
          type: 'file',
          content: `
            // rm.c
            ...
            // end of rm.c
          `
        },
        'touch': {
          type: 'file',
          content: `
            // touch.c
            ...
            // end of touch.c
          `
        },
        'cat': {
          type: 'file',
          content: `
            // cat.c
            ...
            // end of cat.c
          `
        },
        'echo': {
          type: 'file',
          content: `
            // echo.c
            ...
            // end of echo.c
          `
        },
        'less': {
          type: 'file',
          content: `
            // less.c
            ...
            // end of less.c
          `
        },
        'man': {
          type: 'file',
          content: `
            // man.c
            ...
            // end of man.c
          `
        },
        'uname': {
          type: 'file',
          content: `
            // uname.c
            ...
            // end of uname.c
          `
        },
        'whoami': {
          type: 'file',
          content: `
            // whoami.c
            ...
            // end of whoami.c
          `
        },
        'head': {
          type: 'file',
          content: `
            // head.c
            ...
            // end of head.c
          `
        },
        'tail': {
          type: 'file',
          content: `
            // tail.c
            ...
            // end of tail.c
          `
        },
        'wc': {
          type: 'file',
          content: `
            // wc.c
            ...
            // end of wc.c
          `
        },
        'ssh': {
          type: 'file',
          content: `
            // ssh.c
            ...
            // end of ssh.c
          `
        },
        'alias': {
          type: 'file',
          content: `
            // alias.c
            ...
            // end of alias.c
          `
        },
        'sudo': {
          type: 'file',
          content: `
            // sudo.c
            ...
            // end of sudo.c
          `
        },
        'chmod': {
          type: 'file',
          content: `
            // chmod.c
            ...
            // end of chmod.c
          `
        },
        'chown': {
          type: 'file',
          content: `
            // chown.c
            ...
            // end of chown.c
          `
        },
        'theme': {
          type: 'file',
          content: `
            // theme.c
            ...
            // end of theme.c
          `
        },
        'clear': {
          type: 'file',
          content: `
            // clear.c
            ...
            // end of clear.c
          `
        },
        'exit': {
          type: 'file',
          content: `
            // exit.c
            ...
            // end of exit.c
          `
        }
      }
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
const version = 'v2024.12';
let path: string = '/';
let previousPath: string = '/';

function getCurrentDirectory(path: string): any {
  const parts = path.split('/').filter(Boolean);
  let current: Directory | File = file_structure;

  for (const part of parts) {
    if (current.type === 'directory' && current.children[part]) {
      current = current.children[part];
    } else {
      return null;
    }
  }
  return current;
}

function resolvePath(path: string, currentPath: string): string {
  if (path.startsWith('/')) return path;
  const parts = currentPath.split('/').concat(path.split('/')).filter(Boolean);
  const stack: string[] = [];

  for (const part of parts) {
    if (part === '..') {
      stack.pop();
    } else if (part !== '.') {
      stack.push(part);
    }
  }

  return '/' + stack.join('/');
}

function getStyledName(name: string, type: string): string {
  const fileEmoji = '📄';
  const dirEmoji = '📁';
  const styledName = type === 'directory'
    ? `<span style="color: var(--header-color);">${dirEmoji} ${name}</span>`
    : `${fileEmoji} ${name}`;
  return styledName;
}

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
        if (parameters.length === 1) {
          const currentDir = getCurrentDirectory(path);
          if (currentDir && currentDir.children && currentDir.children[parameters[0]]) {
            const file = currentDir.children[parameters[0]];
            if (file.type === 'file') {
              output = file.content;
            } else {
              output = `cat: ${parameters[0]}: Is a directory`;
            }
          } else {
            output = `cat: ${parameters[0]}: No such file or directory`;
          }
        } else {
          output = 
            'Invalid number of parameters for cat command\n' 
            + 'Expected: 1 | Actual: ' + parameters.length + '\n' + 'Usage: cat [file]';
        }
        break;
      case 'cd':
        if (parameters.length === 1) {
          if (parameters.length === 1 && parameters[0] === '..' && path === '/') {
            output = 'cd: cannot move up from root directory';
            break;
          }
          const newPath = resolvePath(parameters[0], path);
          const directory = getCurrentDirectory(newPath);
          if (directory && directory.type === 'directory') {
            previousPath = path;
            path = newPath;
            output = '';
          } else {
            output = `cd: ${parameters[0]}: No such file or directory`;
          }
        } else {
          output = `cd: too many arguments\nUsage: cd [directory]`;
        }
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
        if (parameters.length === 1) {
          const currentDir = getCurrentDirectory(path);
          if (currentDir && currentDir.children && currentDir.children[parameters[0]]) {
            const file = currentDir.children[parameters[0]];
            if (file.type === 'file') {
              output = file.content.split('\n')[1];
            } else {
              output = `head: ${parameters[0]}: Is a directory`;
            }
          } else {
            output = `head: ${parameters[0]}: No such file or directory`;
          }
        } else {
          output = 
            'Invalid number of parameters for head command\n' 
            + 'Expected: 1 | Actual: ' + parameters.length + '\n' + 'Usage: head [file]';
        }
        break;
      case 'less':
        if (parameters.length === 1) {
          const currentDir = getCurrentDirectory(path);
          if (currentDir && currentDir.children && currentDir.children[parameters[0]]) {
            const file = currentDir.children[parameters[0]];
            if (file.type === 'file') {
              output = file.content;
            } else {
              output = `less: ${parameters[0]}: Is a directory`;
            }
          } else {
            output = `less: ${parameters[0]}: No such file or directory`;
          }
        } else {
          output = 
            'Invalid number of parameters for less command\n' 
            + 'Expected: 1 | Actual: ' + parameters.length + '\n' + 'Usage: less [file]';
        }
        break;
      case 'ls':
        const currentDir = getCurrentDirectory(path);
        if (currentDir && currentDir.children) {
          output = Object.keys(currentDir.children)
            .map(name => getStyledName(name, currentDir.children[name].type))
            .join('\n');
        } else {
          output = `ls: cannot access '${path}': No such file or directory`;
        }
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
        if (parameters.length === 0) {
          output = path;
        } else {
          output = 
            'Invalid number of parameters for pwd command\n' 
            + 'Expected: 0 | Actual: ' + parameters.length + '\n' + 'Usage: pwd [options]';
        }
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
        if (parameters.length === 1) {
          const currentDir = getCurrentDirectory(path);
          if (currentDir && currentDir.children && currentDir.children[parameters[0]]) {
            const file = currentDir.children[parameters[0]];
            if (file.type === 'file') {
              output = file.content.split('\n')[file.content.split('\n').length - 2];
            } else {
              output = `tail: ${parameters[0]}: Is a directory`;
            }
          } else {
            output = `tail: ${parameters[0]}: No such file or directory`;
          }
        } else {
          output = 
            'Invalid number of parameters for tail command\n' 
            + 'Expected: 1 | Actual: ' + parameters.length + '\n' + 'Usage: tail [file]';
        }
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
        if (parameters.length === 1) {
          const currentDir = getCurrentDirectory(path);
          if (currentDir && currentDir.children && currentDir.children[parameters[0]]) {
            const file = currentDir.children[parameters[0]];
            if (file.type === 'file') {
              const lines = file.content.split('\n').length;
              const words = file.content.split(/\s+/).length;
              const characters = file.content.length;
              output = `${lines} ${words} ${characters} ${parameters[0]}`;
            } else {
              output = `wc: ${parameters[0]}: Is a directory`;
            }
          } else {
            output = `wc: ${parameters[0]}: No such file or directory`;
          }
        } else {
          output = 
            'Invalid number of parameters for wc command\n' 
            + 'Expected: 1 | Actual: ' + parameters.length + '\n' + 'Usage: wc [file]';
        }
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
    if (command === 'cd' && parameters.length === 1 && output === '') {
      commands_ran.push({ id: commands_ran.length + 1, command, parameters, path: previousPath, output });
    } else {
      commands_ran.push({ id: commands_ran.length + 1, command, parameters, path, output });
    }
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
    //console.error('Error fetching resumes:', error);
    resumes.value = [
  {
    "education": {
      "awards": [
        "Deans List x6",
        "Highest Honors"
      ],
      "courses": [
        "Principles of Macroeconomics",
        "Differential Calculus",
        "Integral Calculus",
        "Physics I: Kinematics",
        "Physics II: Electromagnetism",
        "Introduction to Object Oriented Programming",
        "Computer Organization and Programming",
        "Data Structures and Algorithms",
        "Objects and Design",
        "Linear Algebra",
        "Statistics and Probability with Applications",
        "Multivariable Calculus",
        "Introduction to Database Systems",
        "Design and Analysis of Algorithms",
        "Digital System Design",
        "Introduction to Signal Processing",
        "Digital Design Lab",
        "Programming Hardware and Software Systems",
        "Architecture, Systems, Concurrency, and Energy",
        "Fundamentals of Machine Learning",
        "Differential Equations"
      ],
      "expected_grad_date": "2026-12",
      "gpa": 3.85,
      "location": "Atlanta, GA",
      "major": [
        {
          "concentration": [
            "Distributed System & Software Design",
            "Signal Information Processing"
          ],
          "name": "Computer Engineering",
          "type": "Bachelor of Science"
        }
      ],
      "minors": [
        "Robotics",
        "Applications of Artificial Intelligence and Machine Learning"
      ],
      "school": "Georgia Institute of Technology"
    },
    "email": "M*********m@gmail.com",
    "experience": [
      {
        "company": "The Home Depot",
        "description": [
          "Developed an Automated Utility: Created a Python script that extracts raw results from the NeoLoad Performance testing tool via the NeoLoad API. This script processes and refines the data into a CSV format.",
          "Integrated with Google Cloud: Set up a Google Managed Prometheus (GMP) Pushgateway instance on a Kubernetes Engine cluster and a Google BigQuery dataset to receive metrics and data from the Python script.",
          "Enhanced Visualization: Designed and configured Grafana dashboards to visualize performance metrics, providing a centralized tool for backend performance testing.",
          "Streamlined CI/CD: Maintained continuous integration and deployment processes using GitHub Actions, ensuring seamless updates and improvements.",
          "Comprehensive Documentation: Documented the utility and performance engineering processes, facilitating future use and enhancements by other developers.",
          "Centralized Performance Testing Tool: Created a robust tool enabling software engineers to efficiently test backend performance from a unified platform, replacing the need for multiple disparate tools."
        ],
        "end": "2024-07-26",
        "location": "Atlanta, GA",
        "ongoing": false,
        "role": "Software Engineer",
        "start": "2024-05-13",
        "type": "Intern"
      }
    ],
    "id": 1,
    "name": "Michael Y Yim",
    "phone": "678-***-****",
    "projects": [
      {
        "date": "2024-01",
        "description": [
          "Designed and developed an ergonomic keyboard using KiCad, optimizing for user comfort and efficiency. Flashed the firmware with Quantum Mechanical Keyboard (QMK) to enhance customizability and user experience."
        ],
        "link": "https://github.com/MyKl-Y/custom-ergo-keyboard",
        "name": "Ergonomic Orthodox Keyboard",
        "skills": [
          "QMK",
          "KiCAD",
          "Circuit Design",
          "Electrical Design"
        ],
        "type": "Keyboard"
      },
      {
        "date": "2024-03",
        "description": [
          "Engineered a circuit for custom in-ear monitors equipped with a microphone and active noise cancellation, significantly improving audio quality and user immersion."
        ],
        "link": "",
        "name": "In-Ear Monitors",
        "skills": [
          "Digital Signal Processing",
          "Circuit Design",
          "Electrical Design"
        ],
        "type": "Audio Hardware"
      },
      {
        "date": "2024-03",
        "description": [
          "Created a high-fidelity sound amplifier circuit featuring a detachable digital-to-analog converter (DAC), providing exceptional audio performance and versatility for audiophiles."
        ],
        "link": "",
        "name": "Headphone Amplifier with DAC",
        "skills": [
          "Digital Signal Processing",
          "Circuit Design",
          "Electrical Design"
        ],
        "type": "Audio Hardware"
      },
      {
        "date": "Ongoing",
        "description": [
          "Designed a high-fidelity audio player circuit, compatible with custom headphone amplifiers and in-ear monitors. Currently developing an embedded system with a bespoke Hi-Fi music application for superior audio playback."
        ],
        "link": "",
        "name": "High-Fidelity Audio Player",
        "skills": [
          "KiCAD",
          "Digital Signal Processing",
          "Circuit Design",
          "Electrical Design",
          "Systems Engineering"
        ],
        "type": "Mobile Hardware"
      },
      {
        "date": "Ongoing",
        "description": [
          "Developing a high-resolution, lossless audio music playing operating system tailored for a custom audio player, aimed at delivering audiophile-grade sound quality and user satisfaction."
        ],
        "link": "",
        "name": "High-Fidelity Lossless Music System",
        "skills": [
          "Systems Engineering",
          "Software Engineering",
          "C++"
        ],
        "type": "Embedded System"
      },
      {
        "date": "2023-05",
        "description": [
          "Integrated Spotify, LastFM, and iTunes APIs using Java and JavaFX to create a comprehensive music exploration tool, enabling seamless discovery and exploration of new music tracks and artists."
        ],
        "link": "https://github.com/MyKl-Y/cs1302-api",
        "name": "Music Explorer Application",
        "skills": [
          "Java",
          "JavaFX",
          "Software Engineering"
        ],
        "type": "Desktop Application"
      },
      {
        "date": "2024-04",
        "description": [
          "Developed an Android application leveraging the Spotify API, OpenAI API, and Firebase to provide year-round Spotify wrapped summaries. This tool allows users to track, share, and compare their top music with friends throughout the year."
        ],
        "link": "https://sites.google.com/view/2340wrapitup/wrap-it-up",
        "name": "Wrap it Up",
        "skills": [
          "Java",
          "Android Studio",
          "Software Engineering"
        ],
        "type": "Mobile Application"
      },
      {
        "date": "2023-09",
        "description": [
          "Created a Java and JavaFX desktop application for tracking daily nutrition intake, enhancing user adherence to dietary goals with intuitive tracking features and personalized recommendations."
        ],
        "link": "https://github.com/alexpbb/NutritionTracker",
        "name": "Nutrition Tracker",
        "skills": [
          "Java",
          "JavaFX",
          "Software Engineering"
        ],
        "type": "Desktop Application"
      },
      {
        "date": "2024-07",
        "description": [
          "Built a centralized academic tracking platform using MongoDB, Express.js, Node.js, React.js, and Bootstrap. This tool has improved students organizational efficiency by providing a comprehensive overview of their academic progress and deadlines."
        ],
        "link": "https://github.com/MyKl-Y/MyKl-Y.github.io/tree/main/Student-Dashboard-V2",
        "name": "Student Dashboard",
        "skills": [
          "JavaScript",
          "MongoDB",
          "Express",
          "Node",
          "React",
          "Material UI",
          "Software Engineering",
          "Data Science",
          "Framer Motion",
          "Styled Components",
          "Python",
          "BeautifulSoup",
          "Flask"
        ],
        "type": "Web Application"
      },
      {
        "date": "2023-05",
        "description": [
          "Designed and programmed a graphical adventure game in C++ with SDL, demonstrating advanced skills in game development, including game logic, graphics rendering, and user interaction."
        ],
        "link": "",
        "name": "Adventure Game",
        "skills": [
          "C++",
          "SDL",
          "OpenGL"
        ],
        "type": "Video Game"
      },
      {
        "date": "2024-01",
        "description": [
          "Developed an ASCII styled roguelike game in Python, showcasing proficiency in advanced programming techniques, basic artificial intelligence, and creative problem-solving abilities in game design."
        ],
        "link": "https://github.com/MyKl-Y/RogueLikeGame",
        "name": "Rogue-Like Game",
        "skills": [
          "Python",
          "TCOD"
        ],
        "type": "Video Game"
      },
      {
        "date": "2024-05",
        "description": [
          "Created a clone of the classic Asteroids arcade game for the GameBoy Advanced, utilizing advanced C programming skills and a deep understanding of ARM processor architecture to replicate the games mechanics and performance."
        ],
        "link": "",
        "name": "Asteroids Game",
        "skills": [
          "C"
        ],
        "type": "Game Boy Advance Video Game"
      }
    ],
    "skills": {
      "hard_skills": {
        "cloud": [
          {
            "name": "AWS",
            "proficiency": 80
          },
          {
            "name": "GCP",
            "proficiency": 85
          },
          {
            "name": "Azure",
            "proficiency": 75
          }
        ],
        "database": [
          {
            "name": "SQLite",
            "proficiency": 75
          },
          {
            "name": "MySQL",
            "proficiency": 80
          },
          {
            "name": "BigQuery",
            "proficiency": 85
          },
          {
            "name": "MongoDB",
            "proficiency": 80
          },
          {
            "name": "Prometheus",
            "proficiency": 70
          },
          {
            "name": "Firebase",
            "proficiency": 75
          }
        ],
        "frameworks": [
          {
            "name": "Flask",
            "proficiency": 80
          },
          {
            "name": "Django",
            "proficiency": 75
          },
          {
            "name": "PyTorch",
            "proficiency": 70
          },
          {
            "name": "TensorFlow",
            "proficiency": 70
          },
          {
            "name": "Spring Boot",
            "proficiency": 75
          },
          {
            "name": "React",
            "proficiency": 80
          },
          {
            "name": "Vue",
            "proficiency": 70
          },
          {
            "name": "Express",
            "proficiency": 80
          },
          {
            "name": "Angular",
            "proficiency": 65
          },
          {
            "name": "Node",
            "proficiency": 80
          },
          {
            "name": "Bootstrap",
            "proficiency": 75
          },
          {
            "name": "Tailwind",
            "proficiency": 70
          },
          {
            "name": "Sass",
            "proficiency": 70
          }
        ],
        "languages": [
          {
            "name": "Java",
            "proficiency": 90
          },
          {
            "name": "C",
            "proficiency": 85
          },
          {
            "name": "C++",
            "proficiency": 85
          },
          {
            "name": "R",
            "proficiency": 70
          },
          {
            "name": "Python",
            "proficiency": 95
          },
          {
            "name": "JavaScript",
            "proficiency": 80
          },
          {
            "name": "TypeScript",
            "proficiency": 75
          },
          {
            "name": "HTML",
            "proficiency": 80
          },
          {
            "name": "CSS",
            "proficiency": 75
          },
          {
            "name": "Kotlin",
            "proficiency": 65
          },
          {
            "name": "Go",
            "proficiency": 60
          },
          {
            "name": "SQL",
            "proficiency": 85
          },
          {
            "name": "GraphQL",
            "proficiency": 70
          },
          {
            "name": "Bash",
            "proficiency": 80
          },
          {
            "name": "MATLAB",
            "proficiency": 65
          }
        ],
        "libraries": [
          {
            "name": "JavaFX",
            "proficiency": 70
          },
          {
            "name": "OpenGL",
            "proficiency": 65
          },
          {
            "name": "Pandas",
            "proficiency": 85
          },
          {
            "name": "NumPy",
            "proficiency": 85
          },
          {
            "name": "Matplotlib",
            "proficiency": 80
          },
          {
            "name": "BeautifulSoup",
            "proficiency": 75
          },
          {
            "name": "OpenCV",
            "proficiency": 70
          },
          {
            "name": "jQuery",
            "proficiency": 70
          },
          {
            "name": "Framer Motion",
            "proficiency": 65
          },
          {
            "name": "Styled Components",
            "proficiency": 100
          },
          {
            "name": "Material UI",
            "proficiency": 85
          }
        ],
        "operating_systems": [
          {
            "name": "Linux",
            "proficiency": 85
          },
          {
            "name": "Windows",
            "proficiency": 80
          },
          {
            "name": "Mac",
            "proficiency": 75
          }
        ],
        "software": [
          {
            "name": "Microsoft Office Suite",
            "proficiency": 90
          },
          {
            "name": "Adobe Suite",
            "proficiency": 75
          },
          {
            "name": "VS Code",
            "proficiency": 95
          },
          {
            "name": "Jupyter Notebooks",
            "proficiency": 75
          },
          {
            "name": "JetBrains",
            "proficiency": 85
          },
          {
            "name": "Android Studio",
            "proficiency": 90
          },
          {
            "name": "Emacs",
            "proficiency": 65
          },
          {
            "name": "Vim",
            "proficiency": 70
          },
          {
            "name": "AutoCAD",
            "proficiency": 60
          },
          {
            "name": "KiCAD",
            "proficiency": 70
          },
          {
            "name": "QMK",
            "proficiency": 70
          },
          {
            "name": "Unreal Engine",
            "proficiency": 60
          },
          {
            "name": "Unity",
            "proficiency": 65
          },
          {
            "name": "Figma",
            "proficiency": 80
          }
        ],
        "techniques": [
          {
            "name": "Circuit Design",
            "proficiency": 60
          },
          {
            "name": "Electrical Design",
            "proficiency": 55
          },
          {
            "name": "Automation",
            "proficiency": 70
          },
          {
            "name": "Test Engineering",
            "proficiency": 70
          },
          {
            "name": "Performance Engineering",
            "proficiency": 75
          },
          {
            "name": "Cloud Computing",
            "proficiency": 55
          },
          {
            "name": "Software Engineering",
            "proficiency": 80
          },
          {
            "name": "Data Science",
            "proficiency": 60
          },
          {
            "name": "System Engineering",
            "proficiency": 45
          },
          {
            "name": "Distributed Computing",
            "proficiency": 50
          },
          {
            "name": "Digital Signal Processing",
            "proficiency": 45
          }
        ],
        "tools": [
          {
            "name": "Git",
            "proficiency": 85
          },
          {
            "name": "Docker",
            "proficiency": 80
          },
          {
            "name": "Kubernetes",
            "proficiency": 75
          },
          {
            "name": "Tableau",
            "proficiency": 70
          },
          {
            "name": "PowerBI",
            "proficiency": 70
          },
          {
            "name": "Grafana",
            "proficiency": 75
          },
          {
            "name": "NeoLoad",
            "proficiency": 70
          },
          {
            "name": "Postman",
            "proficiency": 80
          },
          {
            "name": "3D-Printing",
            "proficiency": 60
          },
          {
            "name": "Oscilloscope",
            "proficiency": 50
          },
          {
            "name": "Multimeter",
            "proficiency": 55
          },
          {
            "name": "Soldering Iron",
            "proficiency": 75
          }
        ]
      },
      "soft_skills": [
        "Communication",
        "Teamwork",
        "Problem-solving",
        "Project Planning",
        "Project Management",
        "Time Management",
        "Adaptability"
      ]
    },
    "summary": "N/A"
  }
];
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
          <span id="path">{{ command.path.length === 1 ? "~" : "~/" + command.path.slice(1) }}</span>$
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
          <pre v-else-if="['cat', 'less', 'wc'].includes(command.command) && !command.output.includes('directory') && !command.output.includes('Invalid')">{{ command.output }}</pre>
          <pre id="headers" v-else-if="command.command === 'pwd' && command.parameters.length < 1">{{ command.output }}</pre>
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
          <span id="path">{{ path.length === 1 ? "~" : "~/" + path.slice(1) }}</span>$ 
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
