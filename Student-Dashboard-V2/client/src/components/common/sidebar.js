import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link, useLocation } from 'react-router-dom';
import '../../styles/sidebar.css';
import { useTheme } from '../../context/theme/ThemeContext';
import { useAuth } from '../../context/authentication/AuthContext';
import { motion } from 'framer-motion'
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
    Close,
    WidgetsTwoTone
} from '@mui/icons-material';
import { Avatar, Tooltip } from '@mui/material';

const Sidebar = () => {
    const { currentTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const { userData } = useAuth();
    const isLoggedIn = !!userData;

    const location = useLocation();

    return (
        <div 
            className="sidebar-container"
            style={currentTheme}
        >
            <button className={`toggle-button ${isOpen ? 'open' : ''}`} 
            onClick={toggleSidebar}>
                {isOpen ? <Close /> : <WidgetsTwoTone />}
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
                        to="/Student-Dashboard-V2/client/"
                    >
                        <SchoolTwoTone />
                        <h3>BuzzBoard</h3>
                    </Link>
                </div>
                <div className='inset-container'>
                    <Tooltip 
                        title='Dashboard' 
                        placement='right'
                    >
                        <div className='link-container'>
                            <Link 
                                to="/Student-Dashboard-V2/client/dashboard" 
                                className={location.pathname === '/Student-Dashboard-V2/client/dashboard' ? 'active-link' : ''}
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
                                to="/Student-Dashboard-V2/client/courses"
                                className=
                                    {location.pathname === '/Student-Dashboard-V2/client/courses' 
                                        ? 'active-link' 
                                        : (location.pathname === '/Student-Dashboard-V2/client/graduation' 
                                            ? 'active-link' 
                                            : '')
                                    }
                            >
                                <div className='vl'></div>
                                {location.pathname === '/Student-Dashboard-V2/client/graduation'
                                    ? <AccountTreeTwoTone />
                                    : <LibraryBooksTwoTone />}
                                <p>Courses</p>
                            </Link>
                        </div>
                    </Tooltip>
                    <Tooltip title='Tasks' placement='right'>
                        <div className='link-container'>
                            <Link 
                                to="/Student-Dashboard-V2/client/tasks"
                                className=
                                    {location.pathname === '/Student-Dashboard-V2/client/tasks' 
                                        ? 'active-link' 
                                        : (location.pathname === '/Student-Dashboard-V2/client/assignments' 
                                            ? 'active-link' 
                                            : (location.pathname === '/Student-Dashboard-V2/client/habits')
                                                ? 'active-link'
                                                : (location.pathname.includes('/Student-Dashboard-V2/client/edit-task'))
                                                    ? 'active-link'
                                                    : (location.pathname === '/Student-Dashboard-V2/client/create-task')
                                                        ? 'active-link'
                                                        : '')
                                    }
                            >
                                <div className='vl'></div>
                                {location.pathname === '/Student-Dashboard-V2/client/assignments'
                                    ? <DesignServicesTwoTone />
                                    : location.pathname === '/Student-Dashboard-V2/client/habits' 
                                        ? <EventRepeatTwoTone /> 
                                        : <ListAltTwoTone />}
                                <p>Tasks</p>
                            </Link>
                        </div>
                    </Tooltip>
                    <Tooltip title='Applications' placement='right'>
                        <div className='link-container'>
                            <Link 
                                to="/Student-Dashboard-V2/client/applications"
                                className={location.pathname === '/Student-Dashboard-V2/client/applications' ? 'active-link' : ''}
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
                                to="/Student-Dashboard-V2/client/calendar"
                                className={location.pathname === '/Student-Dashboard-V2/client/calendar' 
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
                                to="/Student-Dashboard-V2/client/grades"
                                className=
                                    {location.pathname === '/Student-Dashboard-V2/client/grades' 
                                        ? 'active-link' 
                                        : location.pathname === '/Student-Dashboard-V2/client/grade-calculator' 
                                            ? 'active-link' 
                                            : location.pathname === '/Student-Dashboard-V2/client/gpa-calculator'
                                                ? 'active-link'
                                                : ''
                                    }
                            >
                                <div className='vl'></div>
                                {location.pathname === '/Student-Dashboard-V2/client/gpa-calculator' 
                                    ? <CalculateTwoTone/>
                                    : location.pathname === '/Student-Dashboard-V2/client/grade-calculator'
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
                                to="/Student-Dashboard-V2/client/settings"
                                className={location.pathname === '/Student-Dashboard-V2/client/settings' ? 'active-link' : ''}
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
                                to="/Student-Dashboard-V2/client/help"
                                className={location.pathname === '/Student-Dashboard-V2/client/help' ? 'active-link' : ''}
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
                        className={`button ${location.pathname === '/Student-Dashboard-V2/client/account' ? 'active-link' : ''}`} 
                        to="/Student-Dashboard-V2/client/account"
                    >
                        {
                            isLoggedIn ? 
                                <Avatar sx={{ background: 'var(--accent-gradient)', color: 'var(--text-color)' }}>
                                    {userData.name.charAt(0)}
                                </Avatar> : 
                                <AccountCircleTwoTone /> 
                        }
                        <p>{isLoggedIn ? userData.name : 'Guest'}</p>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default Sidebar;