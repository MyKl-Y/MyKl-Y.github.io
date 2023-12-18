import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const themes = {
    neumorphism: {
        light: {
            '--background': 'linear-gradient(60deg, var(--background-color), var(--background-color))',
            '--background-image': 'linear-gradient(60deg, var(--background-color), var(--background-color))',
            '--text-color': 'rgba(9,9,121,1)',
            '--background-color': 'rgba(236,240,243, 1)',
            '--background-light': '#fff',
            '--background-dark': '#ccc',
            '--background-outset': '.2rem .2rem .5rem 0rem var(--background-dark), -.2rem -.2rem .5rem 0rem var(--background-light)',
            '--background-inset': 'inset .2rem .2rem .5rem 0rem var(--background-dark), inset -.2rem -.2rem .5rem 0rem var(--background-light)',
            '--selected-dark': 'var(--background-dark)',
            '--selected-color': 'var(--background-color)',
            '--selected-light': 'var(--background-light)',
            '--selected-outset': 'var(--background-outset)',
            '--selected-inset': 'var(--background-inset)',
            '--accent-gradient': 'linear-gradient(60deg, rgba(255,203,0,1) 0%, rgba(255,143,0,1) 100%)',
            '--accent-light': 'rgba(255,203,0,1)',
            '--accent': 'rgba(255, 173, 0, 1)',
            '--accent-dark': 'rgba(255,143,0,1)',
            '--accent-outset': '.3rem .3rem .2rem 0rem var(--background-dark), -.3rem -.3rem .2rem 0rem var(--background-light)',
            '--accent-inset': 'inset .2rem .2rem .5rem 0rem var(--accent-dark), inset -.2rem -.2rem .5rem 0rem var(--accent-light)',
            '--primary-light': 'rgba(9,9,121,1)',
            '--primary': 'rgba(25, 101, 207, 1)',
            '--primary-dark': 'rgba(0,212,255,1)',
            '--primary-outset': '.3rem .3rem .2rem 0rem var(--background-dark), -.3rem -.3rem .2rem 0rem var(--background-light)',
            '--primary-inset': 'inset .2rem .2rem .5rem 0rem var(--primary-dark), inset -.2rem -.2rem .5rem 0rem var(--primary-light)',
            '--add-light': 'rgba(70,215,100,1)',
            '--add-primary': 'rgba(40,165,70,1)',
            '--add-dark': 'rgba(10,115,40,1)',
            '--add-outset': '.3rem .3rem .2rem 0rem var(--background-dark), -.3rem -.3rem .2rem 0rem var(--background-light)',
            '--add-inset': 'inset .2rem .2rem .5rem 0rem var(--add-dark), inset -.2rem -.2rem .5rem 0rem var(--add-light)',
            '--remove-light': 'rgba(255,100,100,1)',
            '--remove-primary': 'rgba(200,50,50,1)',
            '--remove-dark': 'rgba(145,0,0,1)',
            '--remove-outset': '.3rem .3rem .2rem 0rem var(--background-dark), -.3rem -.3rem .2rem 0rem var(--background-light)',
            '--remove-inset': 'inset .2rem .2rem .5rem 0rem var(--remove-dark), inset -.2rem -.2rem .5rem 0rem var(--remove-light)',
        },
        dark: {
            '--background': 'linear-gradient(60deg, var(--background-color), var(--background-color))',
            '--background-image': 'linear-gradient(60deg, var(--background-color), var(--background-color))',
            '--text-color': 'rgba(255,203,0, 1)',
            '--background-color': 'rgba(12,15,19,1)',
            '--background-light': '#222',
            '--background-dark': '#000',
            '--background-outset': '.2rem .2rem .5rem 0rem var(--background-dark), -.2rem -.2rem .5rem 0rem var(--background-light)',
            '--background-inset': 'inset .2rem .2rem .5rem 0rem var(--background-dark), inset -.2rem -.2rem .5rem 0rem var(--background-light)',
            '--selected-dark': 'var(--background-dark)',
            '--selected-color': 'var(--background-color)',
            '--selected-light': 'var(--background-light)',
            '--selected-outset': 'var(--background-outset)',
            '--selected-inset': 'var(--background-inset)',
            '--accent-gradient': 'linear-gradient(60deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)',
            '--accent-light': 'rgba(9,9,121,1)',
            '--accent': 'rgba(25, 101, 207, 1)',
            '--accent-dark': 'rgba(0,212,255,1)',
            '--accent-outset': '.3rem .3rem .2rem 0rem var(--background-dark), -.3rem -.3rem .2rem 0rem var(--background-light)',
            '--accent-inset': 'inset .2rem .2rem .5rem 0rem var(--accent-dark), inset -.2rem -.2rem .5rem 0rem var(--accent-light)',
            '--primary-light': 'rgba(255,203,0,1)',
            '--primary-dark': 'rgba(9,9,121,1)',
            '--primary': 'rgba(255, 173, 0, 1)',
            '--primary-outset': '.3rem .3rem .2rem 0rem var(--background-dark), -.3rem -.3rem .2rem 0rem var(--background-light)',
            '--primary-inset': 'inset .2rem .2rem .5rem 0rem var(--primary-dark), inset -.2rem -.2rem .5rem 0rem var(--primary-light)',
            '--add-primary': 'rgba(40,165,70,1)',
            '--add-dark': 'rgba(10,115,40,1)',
            '--add-outset': '.3rem .3rem .2rem 0rem var(--background-dark), -.3rem -.3rem .2rem 0rem var(--background-light)',
            '--add-inset': 'inset .2rem .2rem .5rem 0rem var(--add-dark), inset -.2rem -.2rem .5rem 0rem var(--add-light)',
            '--remove-light': 'rgba(255,100,100,1)',
            '--remove-primary': 'rgba(200,50,50,1)',
            '--remove-dark': 'rgba(145,0,0,1)',
            '--remove-outset': '.3rem .3rem .2rem 0rem var(--background-dark), -.3rem -.3rem .2rem 0rem var(--background-light)',
            '--remove-inset': 'inset .2rem .2rem .5rem 0rem var(--remove-dark), inset -.2rem -.2rem .5rem 0rem var(--remove-light)',
        },
    },
    glass: {
        light: {
            '--background': '#99afff',
            '--background-image': 'radial-gradient(at 79% 63%, hsla(357,79%,70%,1) 0px, transparent 50%),radial-gradient(at 82% 99%, hsla(254,75%,78%,1) 0px, transparent 50%),radial-gradient(at 33% 53%, hsla(343,85%,78%,1) 0px, transparent 50%),radial-gradient(at 83% 46%, hsla(150,73%,78%,1) 0px, transparent 50%),radial-gradient(at 65% 39%, hsla(251,82%,69%,1) 0px, transparent 50%),radial-gradient(at 67% 51%, hsla(8,77%,65%,1) 0px, transparent 50%),radial-gradient(at 29% 21%, hsla(179,93%,76%,1) 0px, transparent 50%)',
            '--text-color': 'rgba(17, 17, 17, 0.7)',
            '--background-color': 'rgba(255, 255, 255, 0.3)',
            '--background-blur': 'blur(7px)',
            '--background-outset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(255, 255, 255, 0.5)', 
            '--background-inset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(255, 255, 255, 0.5)', 
            '--primary': 'rgba(0, 100, 255, 0.7)',
            '--primary-outset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(255, 255, 255, 0.5)', 
            '--primary-inset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(255, 255, 255, 0.5)', 
            '--accent-gradient': 'linear-gradient(60deg, rgba(99,156,238,1) 0%, rgba(201,136,224,1) 50%, rgba(235,94,163,1) 100%)',
            '--accent': 'rgba(0,0,0,255,.35)',
            '--accent-outset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(255, 255, 255, 0.5)', 
            '--accent-inset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(255, 255, 255, 0.5)', 
            '--selected-color': 'var(--background-color)',
            '--selected-outset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(255, 255, 255, 0.5)', 
            '--selected-inset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(255, 255, 255, 0.5)', 
            '--add-primary': 'rgba(29,148,53,.7)',
            '--add-outset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(255, 255, 255, 0.5)', 
            '--add-inset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(255, 255, 255, 0.5)', 
            '--remove-primary': 'rgba(255,0,0,.7)',
            '--remove-outset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(255, 255, 255, 0.5)', 
            '--remove-inset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(255, 255, 255, 0.5)', 
        },
        dark: {
            '--background': '#99afff',
            '--background-image': 'radial-gradient(at 79% 63%, hsla(357,100%,60%,1) 0px, transparent 50%),radial-gradient(at 82% 99%, hsla(254,100%,60%,1) 0px, transparent 50%),radial-gradient(at 33% 53%, hsla(343,100%,60%,1) 0px, transparent 50%),radial-gradient(at 83% 46%, hsla(150,100%,60%,1) 0px, transparent 50%),radial-gradient(at 65% 39%, hsla(251,100%,60%,1) 0px, transparent 50%),radial-gradient(at 67% 51%, hsla(8,100%,60%,1) 0px, transparent 50%),radial-gradient(at 29% 21%, hsla(179,100%,60%,1) 0px, transparent 50%)',
            '--text-color': 'rgba(255, 255, 255, 0.7)',
            '--background-color': 'rgba(17,17,17,.3)',
            '--background-blur': 'blur(7px)',
            '--background-outset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(17,17,17,.5)',
            '--background-inset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(17,17,17,.5)',
            '--primary': 'rgba(175, 250, 235, 0.7)',
            '--primary-outset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(17,17,17,.5)',
            '--primary-inset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(17,17,17,.5)',
            '--accent-gradient': 'linear-gradient(60deg, rgba(70,117,255,1) 0%, rgba(232,22,129,1) 50%, rgba(255,149,19,1) 100%)',
            '--accent': 'var(--background-color)',
            '--accent-outset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(17,17,17,.5)',
            '--accent-inset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(17,17,17,.5)',
            '--selected-color': 'var(--background-color)',
            '--selected-outset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(17,17,17,.5)',
            '--selected-inset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(17,17,17,.5)',
            '--add-primary': 'rgba(0,255,0,.7)',
            '--add-outset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(17,17,17,.5)',
            '--add-inset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(17,17,17,.5)',
            '--remove-primary': 'rgba(255,0,0,.7)',
            '--remove-outset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(17,17,17,.5)',
            '--remove-inset': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 ), inset 0 0 0 2px rgba(17,17,17,.5)',
        },
    },
    retro: {
        light: {
            '--background-color': '#00ff58', // Bright green, typical of old monitors
            '--text-color': '#ffffff', // White text
            '--font-family': '"Press Start 2P", cursive', // Pixel-like font
        },
        dark: {
            '--background-color': '#005f30', // Dark green
            '--text-color': '#ffffff', // White text
            '--font-family': '"Press Start 2P", cursive', // Pixel-like font
        },
    },
    minimal: {
        light: {
            '--background': '#efefef',
            '--text-color': '#505050',
            '--background-color': '#ffffff',
            '--background-outset': '0 0 0 .1rem rgba(240,240,240,1)',
            '--background-inset': '0 0 0 .1rem rgba(240,240,240,1)',
            '--primary': 'rgba(255,150,0,.5)',
            '--accent-gradient': 'rgba(32,86,255,1)',
            '--accent': 'rgba(32,86,255,1)',
            '--selected-color': 'rgba(32,86,255,.5)',
            '--add-primary': 'rgba(0,255,0,.5)',
            '--remove-primary': 'rgba(255,0,0,.5)',
        },
        dark: {
            '--background': '#101010',
            '--text-color': '#afafaf',
            '--background-color': '#1e1e1e',
            '--background-outset': '0 0 0 .1rem rgba(10,10,10,1)',
            '--background-inset': '0 0 0 .1rem rgba(10,10,10,1)',
            '--primary': 'rgba(255,150,0,.5)',
            '--accent-gradient': 'rgba(32,86,255,1)',
            '--accent': 'rgba(32,86,255,1)',
            '--selected-color': 'rgba(32,86,255,.5)',
            '--add-primary': 'rgba(0,255,0,.5)',
            '--remove-primary': 'rgba(255,0,0,.5)',
        },
    },
}

export const ThemeProvider = ({ children }) => {
    const [style, setStyle] = useState('minimal'); // Default style
    const [mode, setMode] = useState('dark'); // Default mode within the style

    const changeTheme = (newStyle, newMode) => {
        setStyle(newStyle);
        setMode(newMode);
    };

    const toggleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    // Get the current theme object based on the style and mode
    const currentTheme = themes[style][mode];

    return (
        <ThemeContext.Provider value={{ style, mode, currentTheme, changeTheme, toggleMode }}>
            {children}
        </ThemeContext.Provider>
    );
};