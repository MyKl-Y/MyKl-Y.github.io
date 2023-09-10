import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './landingPage.css';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion'

function LandingPage() {
    const { isDarkMode, toggleMode } = useTheme();
    const [isRotated, setIsRotated] = useState(false);
    const location = useLocation();

    const componentStyle = {
        '--background': isDarkMode ? 'linear-gradient(60deg, rgb(53, 29, 150) -10%, rgb(1, 90, 102) 100%)' : 'linear-gradient(60deg, rgba(84,58,183,1) -10%, rgba(0,172,193,1) 100%)',
        '--text-color': isDarkMode ? '#fff' : 'rgba(25,25,25,1)',
        '--glass': isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
        transform: isRotated ? 'rotateY(180deg) scaleX(-1)' : 'rotateY(0deg)',
        transformOrigin: 'center',
        transition: 'transform .6s ease-in-out',
    };

    const handleButtonClick = () => {
        setIsRotated(!isRotated);
        toggleMode();
    };

    return (
        <motion.div 
            className='container'
            initial={{ translateY: '100'}}
            animate={{ translateY: '0'}}
            exit={{ translateY: '-100%'}}
            transition={{ duration: 1 }}
        >
            <div className='row'>
                <button className='text-center glass-morphism' onClick={handleButtonClick} style={componentStyle}>
                    <h1 className='lead'> Student Dashboard </h1>
                    <p className='lead'>
                    Discover a comprehensive computer science dashboard with tools to manage tasks, track progress, and succeed in your academic journey—all in one place.
                    </p>
                        <Link 
                            to='/dashboard' 
                            className='btn btn-lg btn-primary'
                            onClick={toggleMode}
                        >
                            Enter
                        </Link>
                </button>
            </div>
        </motion.div>
    );
}

export default LandingPage;