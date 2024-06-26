import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../authentication/AuthContext';
import axiosInstance from '../../axiosConfig';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const themes = {
    //TODO: Fix all themes so that it doesn't use var() function to avoid errors, finish minimal
    neumorphism: {
        light: {
            '--background': 'linear-gradient(60deg, var(--background-color), var(--background-color))',
            '--background-image': 'linear-gradient(60deg, var(--background-color), var(--background-color))',
            '--text-color': 'rgba(9,9,121,1)',
            '--background-color': 'rgba(226,236,249, 1)',
            '--background-light': 'rgba(244,248,253,1)',
            '--background-dark': 'rgba(198,207,218,1)',
            '--background-outset': '.2rem .2rem .5rem 0rem rgba(198,207,218,1), -.2rem -.2rem .5rem 0rem rgba(244,248,253,1)',
            '--background-inset': 'inset .2rem .2rem .5rem 0rem rgba(198,207,218,1), inset -.2rem -.2rem .5rem 0rem rgba(244,248,253,1)',
            '--header-color': 'var(--background-color)',
            '--header-outset': 'var(--background-outset)',
            '--header-inset': 'var(--background-inset)',
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
            '--primary-outset': '.3rem .3rem .2rem 0rem rgba(198,207,218,1), -.3rem -.3rem .2rem 0rem rgba(244,248,253,1)',
            '--primary-inset': 'inset .2rem .2rem .5rem 0rem rgba(9,9,121,1), inset -.2rem -.2rem .5rem 0rem rgba(0,212,255,1)',
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
            '--background-color': 'rgba(27,29,35,1)',
            '--background-light': 'rgba(40,43,53,1)',
            '--background-dark': 'rgba(13,14,18,1)',
            '--background-outset': '.2rem .2rem .5rem 0rem rgba(13,14,18,1), -.2rem -.2rem .5rem 0rem rgba(40,43,53,1)',
            '--background-inset': 'inset .2rem .2rem .5rem 0rem rgba(13,14,18,1), inset -.2rem -.2rem .5rem 0rem rgba(40,43,53,1)',
            '--header-color': 'var(--background-color)',
            '--header-outset': 'var(--background-outset)',
            '--header-inset': 'var(--background-inset)',
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
            '--primary-light': 'rgba(255,214,128,1)',
            '--primary-dark': 'rgba(128,86,0,1)',
            '--primary': 'rgba(255, 173, 0, 1)',
            '--primary-outset': '.3rem .3rem .2rem 0rem rgba(13,14,18,1), -.3rem -.3rem .2rem 0rem rgba(40,43,53,1)',
            '--primary-inset': 'inset .2rem .2rem .5rem 0rem rgba(128,86,0,1), inset -.2rem -.2rem .5rem 0rem rgba(255,214,128,1)',
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
            '--header-color': 'var(--background-color)',
            '--header-outset': 'var(--background-outset)',
            '--header-inset': 'var(--background-inset)',
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
            '--header-color': 'var(--text-color)',
            '--header-outset': 'var(--background-outset)',
            '--header-inset': 'var(--background-inset)',
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
            '--font-family': '"Press Start 2P", cursive',
            '--background': 'linear-gradient(60deg, rgba(250,240,230,1) 0%, rgba(250,240,230,1) 100%)',
            '--background-image': 'linear-gradient(60deg, rgba(250,240,230,1) 0%, rgba(250,240,230,1) 100%)',
            '--text-color': 'rgba(35,35,35,1)',
            '--header-color': 'var(--background-color)',
            //'--header-outset': 'inset 0 14.25px 0 0 rgba(232,62,42,1),inset 0 28.5px 0 0 rgba(234,108,55,1),inset 0 42.75px 0 0 rgba(242,167,110,1),inset 0 57px 0 0 rgba(244,217,176,1),inset 0 71.25px 0 0 rgba(110,171,161,1),inset 0 85.5px 0 0 rgba(0,142,156,1),inset 0 99.75px 0 0 rgba(1,117,151,1),inset 0 114px 0 0 rgba(19,42,82,1),inset 0 100rem 0 0 var(--background-color)',
            //'--header-inset': 'inset 0 14.25px 0 0 rgba(232,62,42,1),',
            '--header-outset': 'var(--background-outset)',
            '--header-inset': 'var(--background-inset)',
            '--background-color': 'rgba(250,240,230,1)',
            '--background-outset': '0 0 0 2.5px var(--remove-primary)',
            '--background-inset': 'inset 0 0 0 2.5px var(--remove-primary)',
            '--primary': 'rgba(72,110,129,1)',
            '--primary-outset': '0 0 0 2.5px rgba(26,58,78,1)',
            '--primary-inset': 'inset 0 0 0 2.5px rgba(26,58,78,1)',
            '--accent-gradient': 'var(--background)',
            '--accent': 'var(--background-color)',
            '--selected-color': 'rgba(255,193,80,1)',
            '--selected-outset': '0 0 0 2.5px rgba(213,169,72)',
            '--selected-inset': 'inset 0 0 0 2.5px rgba(213,169,72)',
            '--add-primary': 'rgba(52,87,46,1)',
            '--add-outset': '0 0 0 2.5px rgba(133,152,119,1)',
            '--add-inset': 'inset 0 0 0 2.5px rgba(133,152,119,1)',
            '--remove-primary': 'rgba(205,88,88,1)',
            '--remove-outset': '0 0 0 2.5px rgba(219,167,153,1)',
            '--remove-inset': 'inset 0 0 0 2.5px rgba(219,167,153,1)',
        },
        dark: {
            '--font-family': '"Press Start 2P", cursive',
            '--background': 'linear-gradient(60deg, rgba(35,35,35,1) 0%, rgba(35,35,35,1) 100%)',
            '--background-image': 'linear-gradient(60deg, rgba(35,35,35,1) 0%, rgba(35,35,35,1) 100%)',
            '--text-color': 'rgba(250,240,230,1)',
            '--header-color': 'var(--background-color)',
            //'--header-outset': 'inset 0 14.25px 0 0 rgba(232,62,42,1),inset 0 28.5px 0 0 rgba(234,108,55,1),inset 0 42.75px 0 0 rgba(242,167,110,1),inset 0 57px 0 0 rgba(244,217,176,1),inset 0 71.25px 0 0 rgba(110,171,161,1),inset 0 85.5px 0 0 rgba(0,142,156,1),inset 0 99.75px 0 0 rgba(1,117,151,1),inset 0 114px 0 0 rgba(19,42,82,1),inset 0 100rem 0 0 var(--background-color)',
            //'--header-inset': 'inset 0 14.25px 0 0 rgba(232,62,42,1),',
            '--header-outset': 'var(--background-outset)',
            '--header-inset': 'var(--background-inset)',
            '--background-color': 'rgba(35,35,35,1)',
            '--background-outset': '0 0 0 2.5px rgba(62,101,120)',
            '--background-inset': 'inset 0 0 0 2.5px rgba(62,101,120)',
            //'--primary': 'rgba(146,202,202,1)',
            //'--primary-outset': '0 0 0 .25rem rgba(86,117,112,1)',
            //'--primary-inset': '0 0 0 .25rem rgba(86,117,112,1)',
            '--primary': 'rgba(205,88,88,1)',
            '--primary-outset': '0 0 0 .25rem rgba(219,167,153,1)',
            '--primary-inset': 'inset 0 0 0 .25rem rgba(219,167,153,1)',
            '--accent-gradient': 'var(--background)',
            '--accent': 'var(--background-color)',
            '--selected-color': 'rgba(209,160,168,1)',
            '--selected-outset': '0 0 0 .25rem rgba(172,114,140,1)',
            '--selected-inset': 'inset 0 0 0 .25rem rgba(172,114,140,1)',
            '--add-primary': 'rgba(120,116,69,1)',
            '--add-outset': '0 0 0 .25rem rgba(110,91,34,1)',
            '--add-inset': 'inset 0 0 0 .25rem rgba(110,91,34,1)',
            '--remove-primary': 'rgba(163,85,61,1)',
            '--remove-outset': '0 0 0 .25rem rgba(135,40,16,1)',
            '--remove-inset': 'inset 0 0 0 .25rem rgba(135,40,16,1)',
        },
    },
    minimal: {
        light: {
            '--background': '#efefef',
            '--text-color': '#505050',
            '--background-color': '#ffffff',
            '--background-outset': '0 0 0 .1rem rgba(230,230,230,1)',
            '--background-inset': 'inset 0 0 0 .1rem rgba(230,230,230,1)',
            '--header-color': 'var(--background-color)',
            '--header-outset': 'var(--background-outset)',
            '--header-inset': 'var(--background-inset)',
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
            '--background-inset': 'inset 0 0 0 .1rem rgba(10,10,10,1)',
            '--header-color': 'var(--background-color)',
            '--header-outset': 'var(--background-outset)',
            '--header-inset': 'var(--background-inset)',
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
    const { userData } = useAuth();

    console.log('User:', userData);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                if (!userData) return;
                const response = await axiosInstance.get(`/auth/${userData.name}/settings`);
                setStyle(response.data.themeSettings.style);
                setMode(response.data.themeSettings.mode);
            } catch (error) {
                console.error('Error fetching GPA settings:', error);
            }
        }
        fetchSettings();
    }, [userData]);

    const changeTheme = async (newStyle, newMode) => {
        setStyle(newStyle);
        setMode(newMode);
        await axiosInstance.post(`/auth/${userData.name}/settings`, {
            ...userData.settings,
            themeSettings: {
                mode: newMode,
                style: newStyle,
            }
        });
        //window.location.reload();
    };

    const toggleMode = async () => {
        setMode(mode === 'light' ? 'dark' : 'light');
        setStyle(style);
        await axiosInstance.post(`/auth/${userData.name}/settings`, {
            ...userData.settings,
            themeSettings: {
                mode: mode === 'light' ? 'dark' : 'light',
                style: style,
            }
        });
    };

    // Get the current theme object based on the style and mode
    const currentTheme = themes[style][mode];

    return (
        <ThemeContext.Provider value={{ style, mode, currentTheme, changeTheme, toggleMode }}>
            {children}
        </ThemeContext.Provider>
    );
};