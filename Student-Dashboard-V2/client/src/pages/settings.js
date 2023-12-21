import React from 'react';
import { motion } from 'framer-motion/dist/framer-motion';
import { useTheme, themes } from '../context/ThemeContext';
import { 
    LightModeTwoTone, 
    DarkModeTwoTone,
} from '@mui/icons-material';
import './settings.css';

const Settings = () => {
    const { currentTheme, changeTheme, toggleMode, mode, style } = useTheme();
    
    // Function to generate inline styles for each theme button
    const getButtonStyle = (themeName) => ({
        boxShadow: style === themeName ? themes[themeName][mode]['--selected-inset'] : null,
        backgroundColor: style === themeName ? themes[themeName][mode]['--selected-color'] : themes[themeName][mode]['--primary'],
        color: style === themeName ? themes[themeName][mode]['--text-color'] : themes[themeName][mode]['--background-color'],
    });

    const handleMouseEnter = (themeName, e) => {
        if (style !== themeName) {
            e.currentTarget.style.boxShadow = themes[themeName][mode]['--primary-inset'];
        }
    };

    const handleMouseLeave = (themeName, e) => {
        if (style !== themeName) {
            e.currentTarget.style.boxShadow = null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
            style={currentTheme}
        >
            <div className="theme-container">
                <h3>Theme</h3>
                <button 
                    onClick={toggleMode} 
                    className='toggle-mode'
                >
                    {mode === 'dark' ? <LightModeTwoTone /> : <DarkModeTwoTone />}
                </button>
                <div className="style-container">
                    {Object.keys(themes).map((themeName) => (
                        <button 
                            key={themeName}
                            className={themeName}
                            onClick={() => changeTheme(themeName, mode)}
                            style={getButtonStyle(themeName)}
                            onMouseEnter={(e) => handleMouseEnter(themeName, e)}
                            onMouseLeave={(e) => handleMouseLeave(themeName, e)}
                        >
                            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;
