// Button.js
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/theme/ThemeContext';
import '../../styles/Button.scss';

const Button = ({ children, ...props }) => {
    const { theme } = useTheme();
    
    return (
        <motion.button
            className="button"
            {...props}
            style={{
                backgroundColor: theme.buttonColor,
                color: theme.textColor,
            }}
        >
            {children}
        </motion.button>
    );
}

export default Button;