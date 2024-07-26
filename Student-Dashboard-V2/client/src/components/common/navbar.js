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
        { path: '/Student-Dashboard-V2/client/dashboard', label: 'Dashboard', condition: startsWithRoute('/Student-Dashboard-V2/client/dashboard') },
        { path: '/Student-Dashboard-V2/client/courses', label: 'My Courses', condition: startsWithRoute('/Student-Dashboard-V2/client/courses') || startsWithRoute('/Student-Dashboard-V2/client/graduation') },
        { path: '/Student-Dashboard-V2/client/graduation', label: 'Graduation Requirements', condition: startsWithRoute('/Student-Dashboard-V2/client/courses') || startsWithRoute('/Student-Dashboard-V2/client/graduation') },
        { path: '/Student-Dashboard-V2/client/tasks', label: 'All Tasks', condition: startsWithRoute('/Student-Dashboard-V2/client/tasks') || startsWithRoute('/Student-Dashboard-V2/client/assignments') || startsWithRoute('/Student-Dashboard-V2/client/habits') || startsWithRoute('/Student-Dashboard-V2/client/create-task') || startsWithRoute('/Student-Dashboard-V2/client/edit-task') },
        { path: '/Student-Dashboard-V2/client/assignments', label: 'Assignments', condition: startsWithRoute('/Student-Dashboard-V2/client/tasks') || startsWithRoute('/Student-Dashboard-V2/client/assignments') || startsWithRoute('/Student-Dashboard-V2/client/habits') || startsWithRoute('/Student-Dashboard-V2/client/create-task') || startsWithRoute('/Student-Dashboard-V2/client/edit-task') },
        { path: '/Student-Dashboard-V2/client/habits', label: 'Habits', condition: startsWithRoute('/Student-Dashboard-V2/client/tasks') || startsWithRoute('/Student-Dashboard-V2/client/assignments') || startsWithRoute('/Student-Dashboard-V2/client/habits') || startsWithRoute('/Student-Dashboard-V2/client/create-task') || startsWithRoute('/Student-Dashboard-V2/client/edit-task') },
        { path: '/Student-Dashboard-V2/client/applications', label: 'Job Applications', condition: startsWithRoute('/Student-Dashboard-V2/client/applications') || startsWithRoute('/Student-Dashboard-V2/client/applications/jobs') || startsWithRoute('/Student-Dashboard-V2/client/applications/internships') },
        { path: '/Student-Dashboard-V2/client/calendar', label: 'Calendar', condition: startsWithRoute('/Student-Dashboard-V2/client/calendar') },
        { path: '/Student-Dashboard-V2/client/grades', label: 'Grades', condition: startsWithRoute('/Student-Dashboard-V2/client/grades') || startsWithRoute('/Student-Dashboard-V2/client/grade-calculator') || startsWithRoute('/Student-Dashboard-V2/client/gpa-calculator') },
        { path: '/Student-Dashboard-V2/client/grade-calculator', label: 'Grade Calculator', condition: startsWithRoute('/Student-Dashboard-V2/client/grades') || startsWithRoute('/Student-Dashboard-V2/client/grade-calculator') || startsWithRoute('/Student-Dashboard-V2/client/gpa-calculator') },
        { path: '/Student-Dashboard-V2/client/gpa-calculator', label: 'GPA Calculator', condition: startsWithRoute('/Student-Dashboard-V2/client/grades') || startsWithRoute('/Student-Dashboard-V2/client/grade-calculator') || startsWithRoute('/Student-Dashboard-V2/client/gpa-calculator') },
        { path: '/Student-Dashboard-V2/client/settings', label: 'Settings', condition: startsWithRoute('/Student-Dashboard-V2/client/settings') },
        { path: '/Student-Dashboard-V2/client/help', label: 'Help', condition: startsWithRoute('/Student-Dashboard-V2/client/help') },
        { path: '/Student-Dashboard-V2/client/account', label: 'Account', condition: startsWithRoute('/Student-Dashboard-V2/client/account') },
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
