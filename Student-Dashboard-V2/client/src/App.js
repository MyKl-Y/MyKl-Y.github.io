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

  const renderSidebar = ![
    '/Student-Dashboard-V2/client/', '/Student-Dashboard-V2/client/login', '/Student-Dashboard-V2/client/register', '/Student-Dashboard-V2/client/auth'
  ].includes(location.pathname);
  const isLandingPage = location.pathname === '/Student-Dashboard-V2/client/';
  const isLoginRegister = [
    '/Student-Dashboard-V2/client/login', '/Student-Dashboard-V2/client/register', '/Student-Dashboard-V2/client/auth'
  ].includes(location.pathname);

  const { currentTheme } = useTheme();

  const triggerWaveAnimation = () => {
    setAnimateWaves(true);
    setTimeout(() => {
      setAnimateWaves(false);
    }, 1000);
  };

  // TODO: Recommended class schedule (optimized)

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
                <Route path="/Student-Dashboard-V2/client/dashboard" element={<Dashboard />} />
                <Route path="/Student-Dashboard-V2/client/tasks" element={<TaskList />} />
                <Route path="/Student-Dashboard-V2/client/edit-task/:id" element={<EditTask />} />
                <Route path="/Student-Dashboard-V2/client/create-task" element={<CreateTask />} />
                <Route path="/Student-Dashboard-V2/client/assignments" element={<Assignments />} />
                <Route path="/Student-Dashboard-V2/client/habits" element={<Habits />} />
                {/*<Route path="/Student-Dashboard-V2/client/edit-assignment/:id" element={<EditAssignment />} />*/}
                {/*<Route path="/Student-Dashboard-V2/client/create-assignment" element={<CreateAssignment />} />*/}
                <Route path="/Student-Dashboard-V2/client/calendar" element={<Calendar />} />
                {/*<Route path="/Student-Dashboard-V2/client/edit-calendar/:id" element={<EditCalendar />} />*/}
                {/*<Route path="/Student-Dashboard-V2/client/create-calendar" element={<CreateCalendar />} />*/}
                <Route path="/Student-Dashboard-V2/client/grades" element={<Grades />} />
                {/*<Route path="/Student-Dashboard-V2/client/edit-grade/:id" element={<EditGrade />} />*/}
                {/*<Route path="/Student-Dashboard-V2/client/create-grade" element={<CreateGrade />} />*/}
                <Route path="/Student-Dashboard-V2/client/grade-calculator" element={<GradeCalculator />} />
                <Route path="/Student-Dashboard-V2/client/gpa-calculator" element={<GPACalculator />} />
                <Route path="/Student-Dashboard-V2/client/settings" element={<Settings />} />
                <Route path="/Student-Dashboard-V2/client/account" element={<Account />} />
                {/*<Route path="/Student-Dashboard-V2/client/edit-account/:id" element={<EditAccount />} />*/}
                {/*<Route path="/Student-Dashboard-V2/client/create-account" element={<CreateAccount />} />*/}
                <Route path="/Student-Dashboard-V2/client/help" element={<Help />} />
                <Route path="/Student-Dashboard-V2/client/applications" element={<Applications />} />
                <Route path='/Student-Dashboard-V2/client/courses' element={<Courses />} />
                <Route path="/Student-Dashboard-V2/client/edit-course/:id" element={<EditCourse />} />
                <Route path="/Student-Dashboard-V2/client/create-course" element={<CreateCourse />} />
                <Route path="/Student-Dashboard-V2/client/graduation" element={<Graduation />} />
                <Route exact path="/Student-Dashboard-V2/client/" element={<LandingPage onEnterClick={triggerWaveAnimation} />} />
                <Route path="/Student-Dashboard-V2/client/auth" element={<Authentication />}/>
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