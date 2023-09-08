import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './landingPage.css';

function LandingPage() {
    const { isDarkMode, toggleMode } = useTheme();

    const componentStyle = {
        '--background': isDarkMode ? 'linear-gradient(60deg, rgb(53, 29, 150) -10%, rgb(1, 90, 102) 100%)' : 'linear-gradient(60deg, rgba(84,58,183,1) -10%, rgba(0,172,193,1) 100%)',
        '--text-color': isDarkMode ? '#fff' : 'rgba(25,25,25,1)',
        '--glass': isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'
    };

    return (
        <section className='container'>
            <div className='row'>
                <button className='text-center glass-morphism' onClick={toggleMode} style={componentStyle}>
                    <h1 className='lead'> Student Dashboard </h1>
                    <p className='lead'>
                    Discover a comprehensive computer science dashboard with tools to manage tasks, track progress, and succeed in your academic journey—all in one place.
                    </p>
                    <Link to='/dashboard' className='btn btn-lg btn-primary'>
                        Enter
                    </Link>
                </button>
            </div>
        </section>
    );
}

export default LandingPage;