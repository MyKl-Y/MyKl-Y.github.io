import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import WaveAnimation from '../components/waveAnimation';
import './landingPage.css';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion'

function LandingPage({ onEnterClick }) {
    const { isDarkMode, toggleMode } = useTheme();
    const [isRotated, setIsRotated] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const navigate = useNavigate();

    const componentStyle = {
        '--background': 
            isDarkMode ? 
            'linear-gradient(60deg, rgba(84,58,183,1) -100%, rgba(0,172,193,1) 200%)' : 
            'linear-gradient(60deg, rgb(53, 29, 150) -100%, rgb(1, 90, 102) 200%)',
        '--text-color': isDarkMode ? 'rgba(12,15,19,1)' : 'rgba(236,240,243, 1)',
        '--glass': 
            isDarkMode ? 
            'rgba(12,15,19,0.15)' :
            'rgba(236,240,243, 0.15)',
        transform: isRotated ? 'rotateY(180deg) scaleX(-1)' : 'rotateY(0deg)',
        transformOrigin: 'center',
        transition: 'transform .6s ease-in-out',
    };

    const handleButtonClick = () => {
        setIsRotated(!isRotated);
        toggleMode();
    };

    const handleEnterClick = () => {
        onEnterClick();
        setTimeout(() => {
            setAnimationComplete(true);
            navigate("/dashboard")
        }, 1000);
    };

    return (
        <motion.div 
            className='container'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ transform: "translateY(-100%)" }}
            transition={{ duration: 1 }}
        >
            <div className='row'>
                <div className='text-center glass-morphism' style={componentStyle}>
                    <button className={isDarkMode ? "ribbon-1" : "ribbon-2"} onClick={handleButtonClick}>
                        <p>{isDarkMode ? "Dark Mode" : "Light Mode"}</p>
                    </button>
                    <h1 className='lead'> Student Dashboard </h1>
                    <p className='lead'>
                    Discover a comprehensive computer science dashboard with tools to manage tasks, track progress, and succeed in your academic journey—all in one place.
                    </p>
                        <Link 
                            className={'btn btn-lg btn-primary'}
                            onClick={handleEnterClick}
                        >
                            Enter
                        </Link>
                </div>
            </div>

        </motion.div>
    );
}

export default LandingPage;