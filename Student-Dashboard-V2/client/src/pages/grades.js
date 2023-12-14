import React from 'react';
import { motion } from 'framer-motion/dist/framer-motion';
import { useTheme } from '../context/ThemeContext';
import './grades.css';

const Grades = () => {
    const { currentTheme, changeTheme, toggleMode } = useTheme();

    // TODO: Connect Assignments and assignments api to add grades

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
            style={currentTheme}
        >
            <h2>Grades</h2>
            {/* Add your dashboard content here */}
        </motion.div>
    );
};

export default Grades;
