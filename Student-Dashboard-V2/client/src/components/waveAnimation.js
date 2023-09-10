import React from 'react';
import './waveAnimation.css';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion/dist/framer-motion'

function WaveAnimation() {
    const { isDarkMode, toggleMode } = useTheme();

    const componentStyle = {
        '--wave1': isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(25,25,25,0.7)',
        '--wave2': isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(25,25,25,0.5)',
        '--wave3': isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(25,25,25,0.3)',
        '--wave4': isDarkMode ? '#fff' : 'rgba(25,25,25,1)',
    };

    return (
        <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }} // Translate up
            exit={{ y: '-200%' }} // Translate further up during exit
        >
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" className="wave1" style={componentStyle} />
                    <use xlinkHref="#gentle-wave" x="48" y="3" className="wave2" style={componentStyle} />
                    <use xlinkHref="#gentle-wave" x="48" y="5" className="wave3" style={componentStyle} />
                    <use xlinkHref="#gentle-wave" x="48" y="7" className="wave4" style={componentStyle} />
                </g>
            </svg>
        </motion.div>
    );
}

export default WaveAnimation;