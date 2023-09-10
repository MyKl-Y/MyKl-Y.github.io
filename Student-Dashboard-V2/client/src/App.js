import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
//import Navbar from './components/navbar';
import TaskList from './pages/taskList';
import EditTask from './pages/editTask';
import CreateTask from './pages/createTask';
import LandingPage from './pages/landingPage';
import Dashboard from './pages/dashboard';
import Sidebar from './components/sidebar';
import WaveAnimation from './components/waveAnimation';
import AnimatedRoutes from './components/AnimatedRoutes';
import { useTheme } from './context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';

function App() {
  const location = useLocation();

  const renderSidebar = location.pathname !== '/';
  const isLandingPage = location.pathname === '/';
  const appClassName = isLandingPage ? 'App center-content' : 'App flex-end-content';

  const { isDarkMode, toggleMode } = useTheme();

  const componentStyle = {
      '--background': isDarkMode ? 'linear-gradient(60deg, rgb(53, 29, 150) -10%, rgb(1, 90, 102) 100%)' : 'linear-gradient(60deg, rgba(84,58,183,1) -10%, rgba(0,172,193,1) 100%)',
      '--background-color': isDarkMode ? 'rgba(25,25,25,1)' : '#fff',
  };

  return (
    <div 
      className={appClassName} 
      style={componentStyle}
    >
      <AnimatePresence exitBeforeEnter>
        {renderSidebar && <Sidebar />}
        {/*<Navbar />*/}
        <div 
          className={`content ${isLandingPage ? 'landing-page' : ''}`} 
          style={componentStyle}
        >
          <Routes location={location}>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tasks" element={<TaskList />} />
                    <Route path="/edit-task/:id" element={<EditTask />} />
                    <Route path="/create-task" element={<CreateTask />} />
          </Routes>
        </div>
        <div 
          className='waves-container' 
          style={componentStyle}
        >
          {!renderSidebar && <WaveAnimation />}
        </div>
        </AnimatePresence>
    </div>
  );
}

export default App;