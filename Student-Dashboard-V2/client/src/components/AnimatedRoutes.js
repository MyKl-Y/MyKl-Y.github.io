import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
//import TaskList from '../pages/taskList';
//import EditTask from '../pages/editTask';
//import CreateTask from '../pages/createTask';
//import LandingPage from '../pages/landingPage';
//import Dashboard from '../pages/dashboard';
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter>
                
        </AnimatePresence>
    );
}

export default AnimatedRoutes;