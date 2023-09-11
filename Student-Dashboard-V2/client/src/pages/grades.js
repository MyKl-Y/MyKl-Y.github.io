import React from 'react';
import { motion } from 'framer-motion/dist/framer-motion'

const Grades = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
        >
            <h2>Grades</h2>
            {/* Add your dashboard content here */}
        </motion.div>
    );
};

export default Grades;
