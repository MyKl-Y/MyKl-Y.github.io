// Dashboard.js
import React from 'react';
import { motion } from 'framer-motion/dist/framer-motion'

const Dashboard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, translateY: '100%' }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}

        >
            <h2>Dashboard</h2>
            {/* Add your dashboard content here */}
        </motion.div>
    );
};

export default Dashboard;
