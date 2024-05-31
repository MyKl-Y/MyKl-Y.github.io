import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useLocation } from "react-router-dom";
import "../../styles/navbar.css";
import { useTheme } from '../../context/theme/ThemeContext';
import { motion } from "framer-motion";

export default function Navbar() {
    const location = useLocation();

    const { currentTheme } = useTheme();

    // Define a helper function to check if the current path starts with a given route
    const startsWithRoute = (route) => location.pathname.startsWith(route);

    // Define the navigation items
    const navItems = [
        { path: '/dashboard', label: 'Dashboard', condition: startsWithRoute('/dashboard') },
        { path: '/courses', label: 'My Courses', condition: startsWithRoute('/courses') || startsWithRoute('/graduation') },
        { path: '/graduation', label: 'Graduation Requirements', condition: startsWithRoute('/courses') || startsWithRoute('/graduation') },
        { path: '/tasks', label: 'All Tasks', condition: startsWithRoute('/tasks') || startsWithRoute('/assignments') || startsWithRoute('/habits') || startsWithRoute('/create-task') || startsWithRoute('/edit-task') },
        { path: '/assignments', label: 'Assignments', condition: startsWithRoute('/tasks') || startsWithRoute('/assignments') || startsWithRoute('/habits') || startsWithRoute('/create-task') || startsWithRoute('/edit-task') },
        { path: '/habits', label: 'Habits', condition: startsWithRoute('/tasks') || startsWithRoute('/assignments') || startsWithRoute('/habits') || startsWithRoute('/create-task') || startsWithRoute('/edit-task') },
        { path: '/applications', label: 'Job Applications', condition: startsWithRoute('/applications') || startsWithRoute('/applications/jobs') || startsWithRoute('/applications/internships') },
        { path: '/calendar', label: 'Calendar', condition: startsWithRoute('/calendar') },
        { path: '/grades', label: 'Grades', condition: startsWithRoute('/grades') || startsWithRoute('/grade-calculator') || startsWithRoute('/gpa-calculator') },
        { path: '/grade-calculator', label: 'Grade Calculator', condition: startsWithRoute('/grades') || startsWithRoute('/grade-calculator') || startsWithRoute('/gpa-calculator') },
        { path: '/gpa-calculator', label: 'GPA Calculator', condition: startsWithRoute('/grades') || startsWithRoute('/grade-calculator') || startsWithRoute('/gpa-calculator') },
        { path: '/settings', label: 'Settings', condition: startsWithRoute('/settings') },
        { path: '/help', label: 'Help', condition: startsWithRoute('/help') },
        { path: '/account', label: 'Account', condition: startsWithRoute('/account') },
    ];

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
                        {navItems.map((item) => (
                            item.condition && (
                                <li className="nav-item" key={item.path}>
                                    <NavLink to={item.path} activeClassName="active-link">
                                        {item.label}
                                    </NavLink>
                                </li>
                            )
                        ))}
                    </ul>
            </nav>
        </motion.div>
    );
}
