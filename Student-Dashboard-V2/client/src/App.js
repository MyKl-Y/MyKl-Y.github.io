import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/common/navbar.js';
import TaskList from './pages/taskList';
import EditTask from './pages/taskEdit';
import CreateTask from './pages/taskCreate';
import LandingPage from './pages/landingPage';
import Dashboard from './pages/dashboard';
import Assignments from './pages/assignments';
import Habits from './pages/habits';
//import EditAssignment from './pages/editAssignment';
//import CreateAssignment from './pages/createAssignment';
import Calendar from './pages/calendar';
//import EditCalendar from './pages/editCalendar';
//import CreateCalendar from './pages/createCalendar';
import Grades from './pages/grades';
import GradeCalculator from './pages/GradeCalculator.js';
import GPACalculator from './pages/GradePointAverageCalculator.js';
//import EditGrade from './pages/editGrade';
//import CreateGrade from './pages/createGrade';
import Settings from './pages/settings';
import Account from './pages/account';
//import EditAccount from './pages/editAccount';
//import CreateAccount from './pages/createAccount';
import Help from './pages/help';
import Authentication from './pages/authentication';
import Courses from './pages/courseList';
import EditCourse from './components/features/Courses/CourseList/courseEdit.js';
import CreateCourse from './components/features/Courses/CourseList/courseCreate.js';
import Graduation from './pages/GraduationRequirements';
import Sidebar from './components/common/sidebar.js';
import WaveAnimation from './components/common/waveAnimation.js';
//import AnimatedRoutes from './components/AnimatedRoutes';
import { useTheme } from './context/theme/ThemeContext.js';
//import { useAuth } from './context/AuthContext';
import './styles/App.css'
import { AnimatePresence } from 'framer-motion';
import Applications from './pages/applications';

function App() {
  const location = useLocation();

  const [animateWaves, setAnimateWaves] = useState(false); // State variable to trigger animation

  //const { currentUser } = useAuth();
  // Determine if the user is authenticated
  //const isLoggedIn = !!currentUser;

  const renderSidebar = !['/', '/login', '/register', '/auth'].includes(location.pathname);
  const isLandingPage = location.pathname === '/';
  const isLoginRegister = ['/login', '/register', '/auth'].includes(location.pathname);

  const { currentTheme } = useTheme();

  const triggerWaveAnimation = () => {
    setAnimateWaves(true);
    setTimeout(() => {
      setAnimateWaves(false);
    }, 1000);
  };

  // TODO: MAKE ALL SERVER API CALLS ONLY READ AND EDIT DOCUMENTS IF THE USER IS THE SAME
  return (
    <div 
      className={isLandingPage ? 'App center-content' : (isLoginRegister ? 'App auth-center' : 'App flex-end-content')} 
      style={currentTheme}
    >
      <AnimatePresence mode='wait'>
        {renderSidebar && <Sidebar />}
        {renderSidebar && <Navbar />}
        <div 
          className={`content ${isLandingPage ? `landing-page ${animateWaves ? 'animate' : ''}` : ''}`} 
          style={currentTheme}
        >
          <Routes>

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/edit-task/:id" element={<EditTask />} />
                <Route path="/create-task" element={<CreateTask />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/habits" element={<Habits />} />
                {/*<Route path="/edit-assignment/:id" element={<EditAssignment />} />*/}
                {/*<Route path="/create-assignment" element={<CreateAssignment />} />*/}
                <Route path="/calendar" element={<Calendar />} />
                {/*<Route path="/edit-calendar/:id" element={<EditCalendar />} />*/}
                {/*<Route path="/create-calendar" element={<CreateCalendar />} />*/}
                <Route path="/grades" element={<Grades />} />
                {/*<Route path="/edit-grade/:id" element={<EditGrade />} />*/}
                {/*<Route path="/create-grade" element={<CreateGrade />} />*/}
                <Route path="/grade-calculator" element={<GradeCalculator />} />
                <Route path="/gpa-calculator" element={<GPACalculator />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/account" element={<Account />} />
                {/*<Route path="/edit-account/:id" element={<EditAccount />} />*/}
                {/*<Route path="/create-account" element={<CreateAccount />} />*/}
                <Route path="/help" element={<Help />} />
                <Route path="/applications" element={<Applications />} />
                <Route path='/courses' element={<Courses />} />
                <Route path="/edit-course/:id" element={<EditCourse />} />
                <Route path="/create-course" element={<CreateCourse />} />
                <Route path="/graduation" element={<Graduation />} />
                <Route exact path="/" element={<LandingPage onEnterClick={triggerWaveAnimation} />} />
                <Route path="/auth" element={<Authentication />}/>

          </Routes>
          <div 
            className={`waves-container ${animateWaves ? 'animate' : ''}`} // Add 'animate' class when animation should occur 
            style={currentTheme}
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