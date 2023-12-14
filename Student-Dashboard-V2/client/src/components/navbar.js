import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useLocation } from "react-router-dom";
import "./navbar.css";
import { useTheme } from '../context/ThemeContext';
import { motion } from "framer-motion/dist/framer-motion";

export default function Navbar() {
    const location = useLocation();

    const { currentTheme } = useTheme();

    const isDashboardRoute = location.pathname.startsWith('/dashboard');
    const isCoursesRoute = location.pathname.startsWith("/courses");
    const isDegreeRoute = location.pathname.startsWith("/graduation");
    const isTasksRoute = location.pathname.startsWith("/tasks");
    //const isAssignmentsRoute = location.pathname.startsWith("/assignments");
    const isApplicationsRoute = location.pathname.startsWith("/applications");
    const isCalendarRoute = location.pathname.startsWith("/calendar");
    const isGradesRoute = location.pathname.startsWith("/grades");
    const isGradeCalculatorRoute = location.pathname.startsWith("/grade-calculator");
    const isGPACalculatorRoute = location.pathname.startsWith("/gpa-calculator");
    const isSettingsRoute = location.pathname.startsWith("/settings");
    const isHelpRoute = location.pathname.startsWith("/help");
    const isAccountRoute = location.pathname.startsWith("/account");

    return (
        <motion.div 
            className="navbar-container" 
            style={currentTheme}
            key='sidebar'
            initial={{ translateX: '-150%' }}
            animate={{ translateX: "0" }}
            exit={{ translateX: '-150%' }}
            transition={{ duration: .5, delay: .75 }}
        >
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
                        {isCoursesRoute && (
                            <li className="nav-item">
                                <NavLink to="/graduation" activeClassName="active-link">
                                    Graduation Requirements
                                </NavLink>
                            </li>
                        )}
                        {isDegreeRoute && (
                            <li className="nav-item">
                                <NavLink to="/courses" activeClassName="active-link">
                                    My Courses
                                </NavLink>
                            </li>
                        )}
                        {isDegreeRoute && (
                            <li className="nav-item">
                                <NavLink to="/graduation" activeClassName="active-link">
                                    Graduation Requirements
                                </NavLink>
                            </li>
                        )}
                        {isTasksRoute && (
                            <li className="nav-item">
                                <NavLink to="/tasks" activeClassName="active-link">
                                    All Tasks
                                </NavLink>
                            </li>
                        )}
                        {isTasksRoute && (
                            <li className="nav-item">
                                <NavLink to="/assignments" activeClassName="active-link">
                                    Assignments
                                </NavLink>
                            </li>
                        )}
                        {isTasksRoute && (
                            <li className="nav-item">
                                <NavLink to="/habits" activeClassName="active-link">
                                    Habits
                                </NavLink>
                            </li>
                        )}
                        {isApplicationsRoute && (
                            <li className="nav-item">
                                <NavLink to="/applications" activeClassName="active-link">
                                    All
                                </NavLink>
                            </li>
                        )}
                        {isApplicationsRoute && (
                            <li className="nav-item">
                                <NavLink to="/applications/jobs" activeClassName="active-link">
                                    Jobs
                                </NavLink>
                            </li>
                        )}
                        {isApplicationsRoute && (
                            <li className="nav-item">
                                <NavLink to="/applications/internships" activeClassName="active-link">
                                    Internships
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
                        {isGradesRoute && (
                            <li className="nav-item">
                                <NavLink to="/grades" activeClassName="active-link">
                                    Grades
                                </NavLink>
                            </li>
                        )}
                        {isGradesRoute && (
                            <li className="nav-item">
                                <NavLink to="/grade-calculator" activeClassName="active-link">
                                    Grade Calculator
                                </NavLink>
                            </li>
                        )}
                        {isGradesRoute && (
                            <li className="nav-item">
                                <NavLink to="/gpa-calculator" activeClassName="active-link">
                                    GPA Calculator
                                </NavLink>
                            </li>
                        )}
                        {isGradeCalculatorRoute && (
                            <li className="nav-item">
                                <NavLink to="/grades" activeClassName="active-link">
                                    Grades
                                </NavLink>
                            </li>
                        )}
                        {isGradeCalculatorRoute && (
                            <li className="nav-item">
                                <NavLink to="/grade-calculator" activeClassName="active-link">
                                    Grade Calculator
                                </NavLink>
                            </li>
                        )}
                        {isGradeCalculatorRoute && (
                            <li className="nav-item">
                                <NavLink to="/gpa-calculator" activeClassName="active-link">
                                    GPA Calculator
                                </NavLink>
                            </li>
                        )}
                        {isGPACalculatorRoute && (
                            <li className="nav-item">
                                <NavLink to="/grades" activeClassName="active-link">
                                    Grades
                                </NavLink>
                            </li>
                        )}
                        {isGPACalculatorRoute && (
                            <li className="nav-item">
                                <NavLink to="/grade-calculator" activeClassName="active-link">
                                    Grade Calculator
                                </NavLink>
                            </li>
                        )}
                        {isGPACalculatorRoute && (
                            <li className="nav-item">
                                <NavLink to="/gpa-calculator" activeClassName="active-link">
                                    GPA Calculator
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
                        {isHelpRoute && (
                            <li className="nav-item">
                                <NavLink to="/help" activeClassName="active-link">
                                    Help
                                </NavLink>
                            </li>
                        )}
                        {isAccountRoute && (
                            <li className="nav-item">
                                <NavLink to="/account" activeClassName="active-link">
                                    Account
                                </NavLink>
                            </li>
                        )}
                    </ul>
            </nav>
        </motion.div>
    );
}
