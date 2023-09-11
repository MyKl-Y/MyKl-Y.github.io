import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';
import { useTheme } from '../context/ThemeContext';
import { 
    FaTachometerAlt, 
    FaCog, 
    FaBook, 
    FaTasks, 
    FaPencilRuler, 
    FaChevronLeft, 
    FaChevronCircleRight,
    FaClipboardList,
    FaGraduationCap,
    FaUserAstronaut,
    FaQuestion,
    FaAward,
    FaCalendarAlt,
} from 'react-icons/fa';
import { motion } from 'framer-motion/dist/framer-motion'

const Sidebar = () => {
    const { isDarkMode, toggleMode } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const location = useLocation();

    const componentStyle = {
        '--background': 
            isDarkMode ? 
            'linear-gradient(60deg, rgba(84,58,183,1) -100%, rgba(0,172,193,1) 200%)' : 
            'linear-gradient(60deg, rgb(53, 29, 150) -100%, rgb(1, 90, 102) 200%)',
        '--text-color': 
            !isDarkMode ? 
            'rgba(47,62,112,1)' : 
            'rgba(255,203,0, 1)',
        '--background-color': 
            !isDarkMode ? 
            'rgba(236,240,243, 1)' : 
            'rgba(12,15,19,1)',
        '--light-shadow': 
            !isDarkMode ? 
            '#fff' : 
            '#222',
        '--dark-shadow': 
            !isDarkMode ? 
            '#ccc' : 
            '#000',
        '--accent-gradient': 
            !isDarkMode ? 
            'linear-gradient(60deg, rgba(255,203,0,1) 0%, rgba(255,143,0,1) 100%)' : 
            'linear-gradient(60deg, rgba(47,62,112,1) 0%, rgba(255,255,255,1) 100%)',
        '--accent-light':
            isDarkMode ?
            'rgba(255,203,0,1)' :
            'rgba(47,62,112,1)',
        '--accent-dark':
            isDarkMode ?
            'rgba(255,143,0,1)' :
            'rgba(255,255,255,1)',
        '--primary':
            !isDarkMode ?
            'rgba(81, 101, 167, 1)':
            'rgba(255, 173, 0, 1)',
    };

    return (
        <div 
            className="sidebar-container"
            style={componentStyle}
        >
            <button className={`toggle-button ${isOpen ? 'open' : ''}`} 
            onClick={toggleSidebar}>
                {isOpen ? <FaChevronLeft /> : <FaChevronCircleRight />}
            </button>
            <motion.div 
                className={`sidebar ${isOpen ? 'open' : ''}`}
                initial={{ translateX: '-100%' }}
                animate={{ translateX: 0 }}
                exit={{ translateX: '-100%' }}
                transition={{ duration: .1, delay: 1 }}
            >
                <div className='sidebar-header'>
                    <Link
                        to="/"
                    >
                        <FaGraduationCap></FaGraduationCap>
                        <h3>Grad Easy</h3>
                    </Link>
                </div>
                <div className='inset-container'>
                    <div className='link-container'>
                        <Link 
                            to="/dashboard" 
                            className={location.pathname === '/dashboard' ? 'active-link' : ''}
                        >
                            <div className='vl'></div>
                            <FaTachometerAlt></FaTachometerAlt> 
                            <p>Dashboard</p>
                        </Link>
                    </div>
                    <div className='link-container'>
                        <Link 
                            to="/courses"
                            className={location.pathname === '/courses' ? 'active-link' : ''}
                        >
                            <div className='vl'></div>
                            <FaBook></FaBook> 
                            <p>Courses</p>
                        </Link>
                    </div>
                    <div className='link-container'>
                        <Link 
                            to="/tasks"
                            className={location.pathname === '/tasks' ? 'active-link' : ''}
                        >
                            <div className='vl'></div>
                            <FaTasks></FaTasks> 
                            <p>Tasks</p>
                        </Link>
                    </div>
                    <div className='link-container'>
                        <Link 
                            to="/assignments"
                            className={location.pathname === '/assignments' ? 'active-link' : ''}
                        >
                            <div className='vl'></div>
                            <FaPencilRuler></FaPencilRuler> 
                            <p>Assignments</p>
                        </Link>
                    </div>
                    <div className='link-container'>
                        <Link 
                            to="/applications"
                            className={location.pathname === '/applications' ? 'active-link' : ''}
                        >
                            <div className='vl'></div>
                            <FaClipboardList></FaClipboardList> 
                            <p>Applications</p>
                        </Link>
                    </div>
                    <div className='link-container'>
                        <Link 
                            to="/calendar"
                            className={location.pathname === '/calendar' ? 'active-link' : ''}
                        >
                            <div className='vl'></div>
                            <FaCalendarAlt></FaCalendarAlt> 
                            <p>Calendar</p>
                        </Link>
                    </div>
                    <div className='link-container'>
                        <Link 
                            to="/grades"
                            className={location.pathname === '/grades' ? 'active-link' : ''}
                        >
                            <div className='vl'></div>
                            <FaAward></FaAward> 
                            <p>Grades</p>
                        </Link>
                    </div>
                    {/* Add more items as needed */}
                    <hr />
                    <div className='link-container'>
                        <Link 
                            to="/settings"
                            className={location.pathname === '/settings' ? 'active-link' : ''}
                        >
                            <div className='vl'></div>
                            <FaCog></FaCog> 
                            <p>Settings</p>
                        </Link>
                    </div>
                    <div className='link-container'>
                        <Link 
                            to="/help"
                            className={location.pathname === '/help' ? 'active-link' : ''}
                        >
                            <div className='vl'></div>
                            <FaQuestion></FaQuestion> 
                            <p>Help</p>
                        </Link>
                    </div>
                </div>
                <div className='account-container'>
                    <Link className='button' to="/account">
                        <FaUserAstronaut></FaUserAstronaut>
                        <p>Account</p>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default Sidebar;