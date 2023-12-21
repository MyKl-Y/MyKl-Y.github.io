import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/theme/ThemeContext';
import { useAuth } from '../context/authentication/AuthContext';
import '../styles/landingPage.css';
import { motion } from 'framer-motion/dist/framer-motion'

function LandingPage({ onEnterClick }) {
    const { currentTheme, mode, toggleMode } = useTheme();
    const [isRotated, setIsRotated] = useState(false);
    const [animationComplete, setAnimationComplete] = useState();

    const { user } = useAuth();
    const isLoggedIn = !!user;

    const navigate = useNavigate();

    const componentStyle = {
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
            if (isLoggedIn) {
                navigate("/dashboard")
            } else {
                navigate("/auth")
            }
        }, 1000);
    };

    return (
        <motion.div 
            key='landing-page'
            className='container'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ transform: "translateY(-100%)" }}
            transition={{ duration: 1 }}
        >
            <div className='row'>
                <div className='text-center glass-morphism' style={{...currentTheme, ...componentStyle}}>
                    <button className={mode==='dark' ? "ribbon-1" : "ribbon-2"} onClick={handleButtonClick}>
                        <p>{mode==='dark' ? "Dark Mode" : "Light Mode"}</p>
                    </button>
                    <h1 className='lead'> Student Dashboard </h1>
                    <p className='lead'>
                    Discover a comprehensive computer science dashboard with tools to manage tasks, track progress, and succeed in your academic journey—all in one place.
                    </p>
                        <Link 
                            className={'btn btn-lg btn-primary'}
                            onClick={handleEnterClick}
                        >
                            {isLoggedIn ? "Enter" : "Login"}
                        </Link>
                </div>
            </div>

        </motion.div>
    );
}

export default LandingPage;