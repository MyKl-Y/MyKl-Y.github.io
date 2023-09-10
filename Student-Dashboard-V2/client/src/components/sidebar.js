import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import './sidebar.css';
import { FaTachometerAlt, FaCog, FaBook, FaTasks, FaClipboard, FaChevronLeft, FaChevronCircleRight } from 'react-icons/fa';
import { motion } from 'framer-motion/dist/framer-motion'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div 
            className="sidebar-container"
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
                transition={{ duration: .1, delay: .5 }}
            >
            <ul>
                <li>
                    <div className='link-container'>
                        <Link to="/dashboard">
                            <FaTachometerAlt></FaTachometerAlt> 
                            <p>Dashboard</p>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className='link-container'>
                        <Link to="/courses">
                            <FaBook></FaBook> 
                            <p>Courses</p>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className='link-container'>
                        <Link to="/tasks">
                            <FaTasks></FaTasks> 
                            <p>Tasks</p>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className='link-container'>
                        <Link to="/assignments">
                            <FaClipboard></FaClipboard> 
                            <p>Assignments</p>
                        </Link>
                    </div>
                </li>
                {/* Add more items as needed */}
                <li>
                    <div className='link-container'>
                        <Link to="/settings">
                            <FaCog></FaCog> 
                            <p>Settings</p>
                        </Link>
                    </div>
                </li>
            </ul>
            </motion.div>
        </div>
    );
}

export default Sidebar;