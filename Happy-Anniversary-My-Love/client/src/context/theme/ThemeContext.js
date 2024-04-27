// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import { themes } from './themes';

// Create a context with the default theme (light)
const ThemeContext = createContext(themes.light);

// Custom hook to easily consume the theme
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    
    return context;
};

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === themes.light ? themes.dark : themes.light
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
