import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
//import Navbar from './components/navbar';
import TaskList from './pages/taskList';
import EditTask from './pages/editTask';
import CreateTask from './pages/createTask';
import LandingPage from './pages/landingPage';
import Dashboard from './pages/dashboard';
import Assignments from './pages/assignments';
//import EditAssignment from './pages/editAssignment';
//import CreateAssignment from './pages/createAssignment';
import Calendar from './pages/calendar';
//import EditCalendar from './pages/editCalendar';
//import CreateCalendar from './pages/createCalendar';
import Grades from './pages/grades';
//import EditGrade from './pages/editGrade';
//import CreateGrade from './pages/createGrade';
import Settings from './pages/settings';
import Account from './pages/account';
//import EditAccount from './pages/editAccount';
//import CreateAccount from './pages/createAccount';
import Help from './pages/help';
import Sidebar from './components/sidebar';
import WaveAnimation from './components/waveAnimation';
//import AnimatedRoutes from './components/AnimatedRoutes';
import { useTheme } from './context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';
import Applications from './pages/applications';

function App() {
  const location = useLocation();

  const [animateWaves, setAnimateWaves] = useState(false); // State variable to trigger animation

  const renderSidebar = location.pathname !== '/';
  const isLandingPage = location.pathname === '/';
  const appClassName = isLandingPage ? 'App center-content' : 'App flex-end-content';

  const { isDarkMode, toggleMode } = useTheme();

  const componentStyle = {
      '--background': 
        isDarkMode ? 
        'linear-gradient(60deg, rgba(84,58,183,1) -10%, rgba(0,172,193,1) 100%)' : 
        'linear-gradient(60deg, rgb(53, 29, 150) -10%, rgb(1, 90, 102) 100%)',
      '--background-color': isDarkMode ? 'rgba(12,15,19,1)' : 'rgba(236,240,243, 1)',
      '--text-color': !isDarkMode ? 'rgba(12,15,19,1)' : 'rgba(236,240,243, 1)',
  };

  const triggerWaveAnimation = () => {
    setAnimateWaves(true);
    setTimeout(() => {
      setAnimateWaves(false);
    }, 1000);
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
          className={`content ${isLandingPage ? `landing-page ${animateWaves ? 'animate' : ''}` : ''}`} 
          style={componentStyle}
        >
          <Routes>
            <Route exact path="/" element={<LandingPage onEnterClick={triggerWaveAnimation} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/assignments" element={<Assignments />} />
            {/*<Route path="/edit-assignment/:id" element={<EditAssignment />} />*/}
            {/*<Route path="/create-assignment" element={<CreateAssignment />} />*/}
            <Route path="/calendar" element={<Calendar />} />
            {/*<Route path="/edit-calendar/:id" element={<EditCalendar />} />*/}
            {/*<Route path="/create-calendar" element={<CreateCalendar />} />*/}
            <Route path="/grades" element={<Grades />} />
            {/*<Route path="/edit-grade/:id" element={<EditGrade />} />*/}
            {/*<Route path="/create-grade" element={<CreateGrade />} />*/}
            <Route path="/settings" element={<Settings />} />
            <Route path="/account" element={<Account />} />
            {/*<Route path="/edit-account/:id" element={<EditAccount />} />*/}
            {/*<Route path="/create-account" element={<CreateAccount />} />*/}
            <Route path="/help" element={<Help />} />
            <Route path="/applications" element={<Applications />} />
          </Routes>
          <div 
            className={`waves-container ${animateWaves ? 'animate' : ''}`} // Add 'animate' class when animation should occur 
            style={componentStyle}
          >
            {isLandingPage && <WaveAnimation />}
            <div className={`filler-block ${animateWaves ? 'animate' : ''}`}></div>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
}

export default App;