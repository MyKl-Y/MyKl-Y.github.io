import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const themes = {
    neumorphism: {
        light: {
            '--background': 'linear-gradient(60deg, rgb(53, 29, 150) -100%, rgb(1, 90, 102) 200%)',
            '--text-color': 'rgba(9,9,121,1)',
            '--background-color': 'rgba(236,240,243, 1)',
            '--background-light-shadow': '#fff',
            '--background-dark-shadow': '#ccc',
            '--accent-gradient': 'linear-gradient(60deg, rgba(255,203,0,1) 0%, rgba(255,143,0,1) 100%)',
            '--accent-light': 'rgba(255,203,0,1)',
            '--accent': 'rgba(255, 173, 0, 1)',
            '--accent-dark': 'rgba(255,143,0,1)',
            '--primary-light-shadow': 'rgba(9,9,121,1)',
            '--primary': 'rgba(25, 101, 207, 1)',
            '--primary-dark-shadow': 'rgba(0,212,255,1)',
            '--add-light-shadow': 'rgba(70,215,100,1)',
            '--add-primary': 'rgba(40,165,70,1)',
            '--add-dark-shadow': 'rgba(10,115,40,1)',
            '--remove-light-shadow': 'rgba(255,100,100,1)',
            '--remove-primary': 'rgba(200,50,50,1)',
            '--remove-dark-shadow': 'rgba(145,0,0,1)',
        },
        dark: {
            '--background': 'linear-gradient(60deg, rgba(84,58,183,1) -100%, rgba(0,172,193,1) 200%)',
            '--text-color': 'rgba(255,203,0, 1)',
            '--background-color': 'rgba(12,15,19,1)',
            '--background-light-shadow': '#222',
            '--background-dark-shadow': '#000',
            '--accent-gradient': 'linear-gradient(60deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)',
            '--accent-light': 'rgba(9,9,121,1)',
            '--accent': 'rgba(25, 101, 207, 1)',
            '--accent-dark': 'rgba(0,212,255,1)',
            '--primary-light-shadow': 'rgba(255,203,0,1)',
            '--primary-dark-shadow': 'rgba(9,9,121,1)',
            '--primary': 'rgba(255, 173, 0, 1)',
            '--add-light-shadow': 'rgba(70,215,100,1)',
            '--add-primary': 'rgba(40,165,70,1)',
            '--add-dark-shadow': 'rgba(10,115,40,1)',
            '--remove-light-shadow': 'rgba(255,100,100,1)',
            '--remove-primary': 'rgba(200,50,50,1)',
            '--remove-dark-shadow': 'rgba(145,0,0,1)',
        },
    },
    glass: {
        light: {

        },
        dark: {

        },
    },
    retro: {
        light: {

        },
        dark: {

        },
    },
    minimal: {
        light: {

        },
        dark: {

        },
    },
}

export const ThemeProvider = ({ children }) => {
    const [style, setStyle] = useState('neumorphism'); // Default style
    const [mode, setMode] = useState('light'); // Default mode within the style

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