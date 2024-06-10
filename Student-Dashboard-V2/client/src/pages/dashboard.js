// Dashboard.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/authentication/AuthContext';
import { useTheme } from '../context/theme/ThemeContext';

// TODO: heat map, line graph, sankey diagram, pie chart, bar graph
/* TODO: Specific features to add to the dashboard:
    - Heat map
        - For tasks
    - Line graph
        - Grade history and prediction and GPA
    - Sankey diagram
        - Application status
    - Pie chart:
        - Tasks by status
        - Credits 
    - Bar graph:
        - Grade distribution
    - Text Display:
        - GPA 
        - Major & Minors
        - Expected Graduation Date
        - Number of tasks due today
    - Mini calendar
    - Upcoming 
    - Scatter plot:
        - Grades vs. subjects
*/

const Dashboard = () => {
    const { currentUser } = useAuth();
    const { currentTheme } = useTheme();
    const [courses, setCourses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [jobs, setJobs] = useState([]);

    // Get all data from the database
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/courses');
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

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
