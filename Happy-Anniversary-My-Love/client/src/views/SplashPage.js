// SplashPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/SplashPage.scss';
import { useTheme } from '../context/theme/ThemeContext';
import Graph from '../components/Features/Graph/Graph';
import Waves from '../components/Features/Waves/Waves';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';

const SplashPage = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.div
            className="splashpage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
            style={{
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
            }}
        >
            <div className='splashpage__background'/>
            <div 
                className='splashpage__header'
                style={{
                    backgroundColor: theme.buttonColor,
                    color: theme.textColor,
                }}
            >
                <h1>MYY & LEK</h1>
            </div>
            <div classname='splashpage__body'>
                <div className="waves__inverted">
                    <Waves />
                </div>
                <Graph/>
                <Waves/>
            </div>
            <div
                className="splashpage__footer"
                style={{
                    backgroundColor: theme.buttonColor,
                    color: theme.textColor,
                }}
            >
                <Link to="/home">
                    <Button>
                        {'Let\'s Rewind! <3'}
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}

export default SplashPage;