// Homepage.js
import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Homepage.scss';
import { useTheme } from '../context/theme/ThemeContext';
import CountdownTimer from '../components/Features/Countdown/CountdownTimer';
import TimeSince from '../components/Features/TimeSince/TimeSince';
import Navbar from '../components/common/Navbar';

const Homepage = () => {
    const { theme } = useTheme();

    return (
        <motion.div
            className="homepage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
            style={{
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
            }}
        >
            <Navbar/>
            <CountdownTimer/>
            <TimeSince/>
        </motion.div>
    );
}

export default Homepage;