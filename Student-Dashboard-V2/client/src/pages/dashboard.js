// Dashboard.js
import React from 'react';
import { motion } from 'framer-motion/dist/framer-motion'

// TODO: heat map, line graph, sankey diagram, pie chart, bar graph

const Dashboard = () => {
    return (
        <motion.div
            key='dashboard'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
        >
            <h2>Dashboard</h2>
            {/* Add your dashboard content here */}
        </motion.div>
    );
};

export default Dashboard;
