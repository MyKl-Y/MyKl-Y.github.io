import React from 'react';
import { motion } from 'framer-motion';
import { useTheme, themes } from '../context/theme/ThemeContext';
import { LightModeTwoTone, DarkModeTwoTone } from '@mui/icons-material';
import { useSettings } from '../context/settings/SettingsContext';
import '../styles/settings.css';

const Settings = () => {
    const { currentTheme, changeTheme, toggleMode, mode, style } = useTheme();
    const { gpaScale, gradeScale, changeGpaScale, changeGradeScale } = useSettings();
    const switchPositionClass = mode === 'dark' ? 'dark' : 'light';
    
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
            className="settings"
        >
            <div className="theme-container">
                <h3>Theme</h3>
                <button 
                    onClick={toggleMode} 
                    className={`toggle-mode ${switchPositionClass}`}
                >
                    {mode === 'dark' 
                        ? <><DarkModeTwoTone /><span className="switch-indicator"/></>
                        : <><span className="switch-indicator"/><LightModeTwoTone /></>}
                </button>
            </div>
            <div className="style-container">
                <h3>Style</h3>
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
            <div className="gpa-settings-container">
                <h3>GPA Scale</h3>
                <input 
                    type="number" 
                    value={gpaScale.toFixed(1)}
                    onChange={(e) => changeGpaScale(parseFloat(e.target.value))}
                />
            </div>
            <div className="grade-scale-container">
                <h3>Grade Scale</h3>
                <select
                    value={gradeScale}
                    onChange={(e) => changeGradeScale(e.target.value)}
                >
                    <option key='plus-minus-scale' value='plus-minus'>
                        +/- Scale
                    </option>
                    <option key='letter-scale' value='letter'>
                        Letter Scale
                    </option>
                </select>
            </div>
        </motion.div>
    );
};

export default Settings;
