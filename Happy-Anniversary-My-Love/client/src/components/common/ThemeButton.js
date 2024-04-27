// ThemeButton.js
import React from 'react';
import { useTheme } from '../../context/theme/ThemeContext';
import { motion } from 'framer-motion';

const ThemeButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            className="theme-btn"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
                backgroundColor: theme.buttonColor,
                color: theme.textColor,
            }}
        >
            {console.log(theme)}
            {theme.name === 'light' ? '🌙' : '☀️'}
        </motion.button>
    );
}

export default ThemeButton;