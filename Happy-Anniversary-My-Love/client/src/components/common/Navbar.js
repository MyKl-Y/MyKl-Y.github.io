// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeButton from './ThemeButton';
import { useTheme } from '../../context/theme/ThemeContext';
import { motion } from 'framer-motion';
import '../../styles/Navbar.scss';

const Navbar = () => {
    const { theme } = useTheme();

    return (
        <motion.div
            className="navbar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
            style={{
                backgroundColor: theme.buttonColor,
                color: theme.textColor,
            }}
        >
            <div className="navbar__logo">
                {<NavLink to="/">
                    <motion.h1
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Michael & Lucie
                    </motion.h1>
                </NavLink>}
            </div>
            <div className="navbar__links">
                {/*<Link to="/about">
                    <motion.h2
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        About
                    </motion.h2>
                </Link>
                <Link to="/contact">
                    <motion.h2
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Contact
                    </motion.h2>
                </Link>*/}
                <ThemeButton/>
            </div>
        </motion.div>
    );
}

export default Navbar;