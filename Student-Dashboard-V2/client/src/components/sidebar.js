import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
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
import { 
    SchoolTwoTone, 
    DashboardTwoTone,
    LibraryBooksTwoTone,
    AccountTreeTwoTone,
    ListAltTwoTone,
    DesignServicesTwoTone,
    EventRepeatTwoTone,
    AssignmentTwoTone,
    CalendarMonthTwoTone,
    WorkspacePremiumTwoTone,
    SettingsTwoTone,
    HelpTwoTone,
    AccountCircleTwoTone,
    CalculateTwoTone,
} from '@mui/icons-material';
import { Avatar, Tooltip } from '@mui/material';
import { deepOrange } from '@mui/material/colors';


const Sidebar = () => {
    const { currentTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const { user } = useAuth();
    const isLoggedIn = !!user;

    const location = useLocation();

    return (
        <div 
            className="sidebar-container"
            style={currentTheme}
        >
            <button className={`toggle-button ${isOpen ? 'open' : ''}`} 
            onClick={toggleSidebar}>
                {isOpen ? <FaChevronLeft /> : <FaChevronCircleRight />}
            </button>
            <motion.div 
                key='sidebar'
                className={`sidebar ${isOpen ? 'open' : ''}`}
                initial={{ translateX: '-100%' }}
                animate={{ translateX: 0 }}
                exit={{ translateX: '-100%' }}
                transition={{ duration: .25, delay: 1 }}
            >
                <div className='sidebar-header'>
                    <Link
                        to="/"
                    >
                        <SchoolTwoTone />
                        <h3>UpGrad</h3>
                    </Link>
                </div>
                <div className='inset-container'>
                    <Tooltip 
                        title='Dashboard' 
                        placement='right'
                    >
                        <div className='link-container'>
                            <Link 
                                to="/dashboard" 
                                className={location.pathname === '/dashboard' ? 'active-link' : ''}
                            >
                                <div className='vl'></div>
                                <DashboardTwoTone />
                                <p>Dashboard</p>
                            </Link>
                        </div>
                    </Tooltip>
                    <Tooltip title='Courses' placement='right'>
                        <div className='link-container'>
                            <Link 
                                to="/courses"
                                className=
                                    {location.pathname === '/courses' 
                                        ? 'active-link' 
                                        : (location.pathname === '/graduation' 
                                            ? 'active-link' 
                                            : '')
                                    }
                            >
                                <div className='vl'></div>
                                {location.pathname === '/graduation'
                                    ? <AccountTreeTwoTone />
                                    : <LibraryBooksTwoTone />}
                                <p>Courses</p>
                            </Link>
                        </div>
                    </Tooltip>
                    <Tooltip title='Tasks' placement='right'>
                        <div className='link-container'>
                            <Link 
                                to="/tasks"
                                className=
                                    {location.pathname === '/tasks' 
                                        ? 'active-link' 
                                        : (location.pathname === '/assignments' 
                                            ? 'active-link' 
                                            : (location.pathname === '/habits')
                                                ? 'active-link'
                                                : '')
                                    }
                            >
                                <div className='vl'></div>
                                {location.pathname === '/assignments'
                                    ? <DesignServicesTwoTone />
                                    : location.pathname === '/habits' 
                                        ? <EventRepeatTwoTone /> 
                                        : <ListAltTwoTone />}
                                <p>Tasks</p>
                            </Link>
                        </div>
                    </Tooltip>
                    <Tooltip title='Applications' placement='right'>
                        <div className='link-container'>
                            <Link 
                                to="/applications"
                                className={location.pathname === '/applications' ? 'active-link' : ''}
                            >
                                <div className='vl'></div>
                                <AssignmentTwoTone /> 
                                <p>Applications</p>
                            </Link>
                        </div>
                    </Tooltip>
                    <Tooltip title='Calendar' placement='right'>
                        <div className='link-container'>
                            <Link 
                                to="/calendar"
                                className={location.pathname === '/calendar' 
                                    ? 'active-link' 
                                    : ''}
                            >
                                <div className='vl'></div>
                                <CalendarMonthTwoTone /> 
                                <p>Calendar</p>
                            </Link>
                        </div>
                    </Tooltip>
                    <Tooltip title='Grades' placement='right'>
                        <div className='link-container'>
                            <Link 
                                to="/grades"
                                className=
                                    {location.pathname === '/grades' 
                                        ? 'active-link' 
                                        : location.pathname === '/grade-calculator' 
                                            ? 'active-link' 
                                            : location.pathname == '/gpa-calculator'
                                                ? 'active-link'
                                                : ''
                                    }
                            >
                                <div className='vl'></div>
                                {location.pathname === '/gpa-calculator' 
                                    ? <CalculateTwoTone/>
                                    : location.pathname == '/grade-calculator'
                                        ? <CalculateTwoTone/>
                                        : <WorkspacePremiumTwoTone/>
                                }
                                <p>Grades</p>
                            </Link>
                        </div>
                    </Tooltip>
                    {/* Add more items as needed */}
                    <hr />
                    <Tooltip title='Settings' placement='right'>
                        <div className='link-container'>
                            <Link 
                                to="/settings"
                                className={location.pathname === '/settings' ? 'active-link' : ''}
                            >
                                <div className='vl'></div>
                                <SettingsTwoTone /> 
                                <p>Settings</p>
                            </Link>
                        </div>
                    </Tooltip>
                    <Tooltip title='Help' placement='right'>
                        <div className='link-container'>
                            <Link 
                                to="/help"
                                className={location.pathname === '/help' ? 'active-link' : ''}
                            >
                                <div className='vl'></div>
                                <HelpTwoTone /> 
                                <p>Help</p>
                            </Link>
                        </div>
                    </Tooltip>
                </div>
                <div className='account-container'>
                    <Link 
                        className={`button ${location.pathname === '/account' ? 'active-link' : ''}`} 
                        to="/account"
                    >
                        {
                            isLoggedIn ? 
                                <Avatar sx={{ background: 'var(--accent-gradient)', color: 'var(--text-color)' }}>
                                    {user.name.charAt(0)}
                                </Avatar> : 
                                <AccountCircleTwoTone /> 
                        }
                        <p>{isLoggedIn ? user.name : 'Guest'}</p>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default Sidebar;