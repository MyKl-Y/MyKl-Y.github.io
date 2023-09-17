import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion'
import { useAuth } from '../context/AuthContext';

const Account = () => {
    const { user, authLogout } = useAuth();
    const isLoggedIn = !!user;
    const navigate = useNavigate();


    return (
        <motion.div
            key='account'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
        >
            <h2>Account</h2>
            {/* Add your dashboard content here */}
            <button onClick={isLoggedIn ? authLogout : navigate("/auth")}>{isLoggedIn ? 'Logout' : 'Login'}</button>
        </motion.div>
    );
};

export default Account;
