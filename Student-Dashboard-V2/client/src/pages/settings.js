import React from 'react';
import { motion } from 'framer-motion/dist/framer-motion';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
    const { currentTheme, changeTheme, toggleMode, mode, style } = useTheme();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
        >
            <h2>Settings</h2>
            <h3>Theme</h3>
            <div className="d-flex">
                <button 
                    onClick={toggleMode} 
                    className='btn btn-outline-primary me-2'
                >
                    {mode}
                </button>
                <div className="d-flex flex-column align-items-center">
                    <button 
                        className="btn btn-link"
                        onClick={() => changeTheme('neumorphism', mode)}
                    >
                        Neumorphism
                    </button>
                    <button 
                        className="btn btn-link"
                        onClick={() => changeTheme('glass', mode)}
                    >
                        Glass
                    </button>
                    <button 
                        className="btn btn-link"
                        onClick={() => changeTheme('retro', mode)}
                    >
                        Retro
                    </button>
                    <button 
                        className="btn btn-link"
                        onClick={() => changeTheme('minimal', mode)}
                    >
                        Minimal
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;
