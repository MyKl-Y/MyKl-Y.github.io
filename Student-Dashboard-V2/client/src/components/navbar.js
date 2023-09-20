import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useLocation } from "react-router-dom";
import "./navbar.css";
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const location = useLocation();

    const { isDarkMode } = useTheme();

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

    const isDashboardRoute = location.pathname.startsWith('/dashboard');
    const isCoursesRoute = location.pathname.startsWith("/courses");
    const isTasksRoute = location.pathname.startsWith("/tasks");
    const isAssignmentsRoute = location.pathname.startsWith("/assignments");
    const isApplicationsRoute = location.pathname.startsWith("/applications");
    const isCalendarRoute = location.pathname.startsWith("/calendar");
    const isGradesRoute = location.pathname.startsWith("/grades");
    const isSettingsRoute = location.pathname.startsWith("/settings");
    const isHelpRoute = location.pathname.startsWith("/help");

    return (
        <div className="navbar-container" style={componentStyle}>
            <nav className="navbar">
                    <ul className="navbar-nav">
                        {isDashboardRoute && (
                            <li className="nav-item">
                                <NavLink to="/dashboard" activeClassName="active-link">
                                    Dashboard
                                </NavLink>
                            </li>
                        )}
                        {isCoursesRoute && (
                            <li className="nav-item">
                                <NavLink to="/courses" activeClassName="active-link">
                                    My Courses
                                </NavLink>
                            </li>
                        )}
                        {isTasksRoute && (
                            <li className="nav-item">
                                <NavLink to="/tasks" activeClassName="active-link">
                                    Tasks
                                </NavLink>
                            </li>
                        )}
                        {isTasksRoute && (
                            <li className="nav-item">
                                <NavLink to="/edit-task/1" activeClassName="active-link">
                                    Edit Task
                                </NavLink>
                            </li>
                        )}
                        {isTasksRoute && (
                            <li className="nav-item">
                                <NavLink to="/create-task" activeClassName="active-link">
                                    Create Task
                                </NavLink>
                            </li>
                        )}
                        {isAssignmentsRoute && (
                            <li className="nav-item">
                                <NavLink to="/assignments" activeClassName="active-link">
                                    Assignments
                                </NavLink>
                            </li>
                        )}
                        {isApplicationsRoute && (
                            <li className="nav-item">
                                <NavLink to="/applications" activeClassName="active-link">
                                    Applications
                                </NavLink>
                            </li>
                        )}
                        {isCalendarRoute && (
                            <li className="nav-item">
                                <NavLink to="/calendar" activeClassName="active-link">
                                    Calendar
                                </NavLink>
                            </li>
                        )}
                        {isCalendarRoute && (
                            <li className="nav-item">
                                <NavLink to="/edit-calendar/1" activeClassName="active-link">
                                    Edit Calendar
                                </NavLink>
                            </li>
                        )}
                        {isCalendarRoute && (
                            <li className="nav-item">
                                <NavLink to="/create-calendar" activeClassName="active-link">
                                    Create Calendar
                                </NavLink>
                            </li>
                        )}
                        {isGradesRoute && (
                            <li className="nav-item">
                                <NavLink to="/grades" activeClassName="active-link">
                                    Grades
                                </NavLink>
                            </li>
                        )}
                        {isGradesRoute && (
                            <li className="nav-item">
                                <NavLink to="/edit-grade/1" activeClassName="active-link">
                                    Edit Grade
                                </NavLink>
                            </li>
                        )}
                        {isGradesRoute && (
                            <li className="nav-item">
                                <NavLink to="/create-grade" activeClassName="active-link">
                                    Create Grade
                                </NavLink>
                            </li>
                        )}
                        {isSettingsRoute && (
                            <li className="nav-item">
                                <NavLink to="/settings" activeClassName="active-link">
                                    Settings
                                </NavLink>
                            </li>
                        )}
                        {isSettingsRoute && (
                            <li className="nav-item">
                                <NavLink to="/edit-account/1" activeClassName="active-link">
                                    Edit Account
                                </NavLink>
                            </li>
                        )}
                        {isSettingsRoute && (
                            <li className="nav-item">
                                <NavLink to="/create-account" activeClassName="active-link">
                                    Create Account
                                </NavLink>
                            </li>
                        )}
                        {isHelpRoute && (
                            <li className="nav-item">
                                <NavLink to="/help" activeClassName="active-link">
                                    Help
                                </NavLink>
                            </li>
                        )}
                    </ul>
            </nav>
        </div>
    );
}
