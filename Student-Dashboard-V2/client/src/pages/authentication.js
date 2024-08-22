import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '../context/theme/ThemeContext';
import { useAuth } from '../context/authentication/AuthContext';
import { motion } from 'framer-motion';
import '../styles/authentication.css';
import { 
    FaEnvelope,
    FaHashtag,
    FaLock,
    FaCheck,
    FaEye,
    FaEyeSlash,
} from 'react-icons/fa';

/*
const PasswordRequirementsTooltip = () => {
    return (
        <div id="tooltip" className="right">
            <div className="tooltip-arrow" />
            <div className='tooltip-content'>
                <p>Password must meet the following requirements:</p>
                <ul>
                    <li>At least 1 uppercase letter</li>
                    <li>At least 1 lowercase letter</li>
                    <li>At least 1 number</li>
                    <li>At least 1 special character (!.@#$%^&*)</li>
                    <li>At least 8 characters long</li>
                </ul>
            </div>
        </div>
    );
};
*/

const Authentication = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        majors: [],
        minors: [],
    });

    const { authLogin } = useAuth();

    const [isLoginTab, setIsLoginTab] = useState(true); // State to switch between Login and Register
    const [passwordError, setPasswordError] = useState('');
    const [passwordError0, setPasswordError0] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    //const [isPasswordTooltipVisible, setPasswordTooltipVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    /*
    const togglePasswordTooltip = () => {
        setPasswordTooltipVisible(!isPasswordTooltipVisible);
    }
    */

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };      

    const validatePassword = useCallback(() => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[.!@#$%^&*-_])[A-Za-z0-9.!@#$%^&*]{8,}$/;
        if (!user.password.match(passwordRegex) && (user.password !== '')) {
            setPasswordError(
                'Must contain at least 1 of (A-Z), (a-z), (.!@#$%^&*-_), and be 8 characters long'
            );
            setPasswordError0(
                'Password doesn\'t meet requirements'
            );
        } else if (user.password !== user.confirmPassword) { 
            setPasswordError('Passwords Must Match');
            setPasswordError0('');
        } else {
            setPasswordError('');
            setPasswordError0('');
        }
    }, [user.password, user.confirmPassword]);

    // Function to check username availability
    const checkUsernameAvailability = async (username) => {
        if (username !== '') {
            try {
                const response = await fetch(`https://student-dasboard.onrender.com/auth/check-username/${username}`);
                const data = await response.json()

                if (data.taken) {
                    setUsernameError('Username is already taken');
                } else {
                    setUsernameError('');
                }
            } catch (error) {
                console.error('Error checking username:', error);
            }
        } else {
            setUsernameError('Username cannot be blank');
        }
    };

    // Function to check email availability
    const checkEmailAvailability = async (email) => {
        if (email !== '') {
            try {
                const response = await fetch(`https://student-dasboard.onrender.com/auth/check-email/${email.toLowerCase()}`);
                const data = await response.json()

                if (data.taken) {
                    setEmailError('Email is already taken');
                } else {
                    setEmailError('');
                }
            } catch (error) {
                console.error('Error checking email:', error);
            }
        } else {
            setEmailError('Email cannot be blank');
        }
    };

    useEffect(() => {
        validatePassword();
    }, [user.password, user.confirmPassword, validatePassword]);

    const updateUser = (updatedFields) => {
        setUser((prev) => {
            return { ...prev, ...updatedFields };
        });
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateUser({ [name]: value });
    };
    
    const canSubmit = () => {
        return (
            isLoginTab ||
            (passwordError === '') ||
            (usernameError === '') ||
            (emailError === '')
        );
    };
    
    async function onSubmit(e) {
        e.preventDefault();
    
        const newUser = { ...user, email: user.email.toLowerCase()};
    
        if (isLoginTab) {
            await login(newUser);
        } else {
            await register(newUser);
        }
    }

    const { currentTheme } = useTheme();

    async function login(user) {
        try {
            const response = await fetch('https://student-dasboard.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
    
            if (response.status === 200) {
                // Login successful, you can set some state or redirect to the authenticated page
                const data = await response.json();
                authLogin(data.token);
                console.log('Login successful');
                navigate('/Student-Dashboard-V2/client/dashboard');
            } else {
                // Handle login error, e.g., invalid credentials
                console.error('Login error');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    async function register(newUser) {
        try {
            const response = await fetch('https://student-dasboard.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
                withCredentials: true,
            });
    
            if (response.status === 201) {
                // Registration successful, you can set some state or redirect to login
                console.log('Registration successful');
                setIsLoginTab(!isLoginTab);
            } else {
                // Handle registration error, e.g., user already exists
                const data = await response.json();
                console.error('Registration error:', data.message);
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    }

    return (
        <div className={`auth-body`} style={currentTheme} >
            {/*
            <motion.div 
                className="animation"
                initial={{ transform: "scale(0)" }}
                animate={{ transform: "scale(1)" }}
                exit={{ transform: "scale(0)" }}
                transition={{ duration: 1 }}
            >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                    <linearGradient id="gradient">
                        <stop offset="0%" stopColor="#7A5FFF">
                            <animate attributeName="stop-color" values="#7A5FFF; #01FF89; #7A5FFF" dur="5s" repeatCount="indefinite"></animate>
                        </stop>
                        <stop offset="100%" stopColor="#01FF89">
                            <animate attributeName="stop-color" values="#01FF89; #7A5FFF; #01FF89" dur="5s" repeatCount="indefinite"></animate>
                        </stop>
                    </linearGradient>
                    </defs>
                    <path fill="url(#gradient)" d="M40.8,-50.9C56.1,-45.1,73.8,-37.4,69.5,-28C65.2,-18.5,38.9,-7.2,32.5,10C26.1,27.2,39.7,50.3,37.6,57.2C35.5,64.2,17.8,55,5.9,46.9C-6,38.8,-12,31.8,-23.8,28C-35.6,24.2,-53.3,23.6,-55.1,17.9C-57,12.2,-43.1,1.4,-36.8,-10.1C-30.5,-21.6,-31.9,-33.6,-27,-42.8C-22.1,-51.9,-11.1,-58.1,0.9,-59.3C12.8,-60.5,25.6,-56.7,40.8,-50.9Z" transform="translate(100 100)" />
                </svg>
            </motion.div>
            */}
            <motion.div 
                key='authentication'
                className="auth-container"
                initial={{ transform: "scale(0)", opacity: 0 }}
                animate={{ transform: "scale(1)", opacity: 1 }}
                exit={{ transform: "scale(0)", opacity: 0 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <div className="auth-tabs">
                    <button
                        className={`login-tab ${isLoginTab ? 'active' : ''}`}
                        onClick={() => setIsLoginTab(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`register-tab ${!isLoginTab ? 'active' : ''}`}
                        onClick={() => setIsLoginTab(false)}
                    >
                        Register
                    </button>
                    <div className={`tabs-inner ${isLoginTab ? 'login' : 'register'}`}></div>
                </div>
                <div className="form-container">
                    {isLoginTab ? (
                        <form className="login-form" autoComplete="off" onSubmit={onSubmit}>
                            {/* Login form JSX */}
                            {/* Email input */}
                            <label htmlFor="email" className="label">
                                Email &nbsp;
                                <span style={{color: 'red', fontWeight: 'bold'}}>*</span>
                            </label>
                            <div className='search'>
                                <input
                                    type="email"
                                    className={`login-email ${emailError ? 'input-error' : 'input-normal'}`}
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder="Your email"
                                    required
                                />
                                <FaEnvelope className='search-icon'></FaEnvelope>
                            </div>
                            {/* Password input */}
                            <label htmlFor="password" className="label">
                                Password &nbsp;
                                <span style={{color: 'red', fontWeight: 'bold'}}>*</span>
                            </label>
                            <div className='search'>
                                <button
                                    type="button"
                                    className="show-password-button"
                                    onClick={togglePasswordVisibility}
                                >
                                    {
                                    showPassword ? 
                                        <FaEyeSlash className='eye-btn' style={{color: 'var(--primary)'}} /> : 
                                        <FaEye className='eye-btn' style={{color: 'var(--inverted-primary)'}}/>
                                    }
                                </button>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="login-password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="Your password"
                                    required
                                />
                                <FaLock className='search-icon'></FaLock>
                            </div>
                            <button
                                type="submit"
                                className="login-button"
                            >
                                Login
                            </button>
                        </form>
                    ) : (
                        <form className="register-form" onSubmit={onSubmit}>
                            {/* Register form JSX */}
                            {/* Name input */}
                            <label htmlFor="name" className="label" id="username-label">
                                Username &nbsp;
                                <span style={{color: 'red', fontWeight: 'bold'}}>*</span>
                            </label>
                            <div className='search'>
                                <input
                                    type="text"
                                    className={`register-name ${usernameError ? 'input-error' : 'input-normal'}`}
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    onBlur={(e) => checkUsernameAvailability(e.target.value)}
                                    placeholder="Username"
                                    required
                                />
                                <FaHashtag className='search-icon'></FaHashtag>
                            </div>
                            <label htmlFor="username-error" className="error">
                            {
                                usernameError
                            }
                            </label>
                            {/* Email input */}
                            <label htmlFor="email" className="label" id="email-label">
                                Email &nbsp;
                                <span style={{color: 'red', fontWeight: 'bold'}}>*</span>
                            </label>
                            <div className='search'>
                                <input
                                    type="email"
                                    className={`register-email ${emailError ? 'input-error' : 'input-normal'}`}
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    onBlur={(e) => checkEmailAvailability(e.target.value)}
                                    placeholder="Email"
                                    required
                                />
                                <FaEnvelope className='search-icon'></FaEnvelope>
                            </div>
                            <label htmlFor="email-error" className="error">
                            {
                                emailError
                            }
                            </label>
                            {/* Password input */}
                            <label htmlFor="password" className="label" id="password-label">
                                Password &nbsp;
                                <span style={{color: 'red', fontWeight: 'bold'}}>*</span>
                            </label>
                            <div className='search'>
                                <button
                                    type="button"
                                    className="show-password-button"
                                    onClick={togglePasswordVisibility}
                                >
                                    {
                                    showPassword ? 
                                        <FaEyeSlash className='eye-btn' style={{color: 'var(--primary)'}} /> : 
                                        <FaEye className='eye-btn' style={{color: 'var(--inverted-primary)'}}/>
                                    }
                                </button>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`register-password ${passwordError0 ? 'input-error' : 'input-normal'}`}
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                />
                                <FaLock className='search-icon'></FaLock>
                                {
                                /* 
                                    isPasswordTooltipVisible && <PasswordRequirementsTooltip />
                                    <FaInfoCircle
                                    onMouseEnter={togglePasswordTooltip}
                                    onMouseLeave={togglePasswordTooltip}
                                    color='var(--primary)'
                                    />
                                */
                                }
                            </div>
                            <label htmlFor="password-info-error" className="error">
                                {
                                    passwordError0
                                }
                            </label>
                            <label htmlFor="confirm-password" className="label" id="confirm-label">
                                Confirm Password &nbsp;
                                <span style={{color: 'red', fontWeight: 'bold'}}>*</span>
                            </label>
                            <div className='search'>
                                <button
                                    type="button"
                                    className="show-password-button"
                                    onClick={togglePasswordVisibility}
                                >
                                    {
                                    showPassword ? 
                                        <FaEyeSlash className='eye-btn' style={{color: 'var(--primary)'}} /> : 
                                        <FaEye className='eye-btn' style={{color: 'var(--inverted-primary)'}}/>
                                    }
                                </button>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`register-password ${passwordError ? 'input-error' : 'input-normal'}`}
                                    name="confirmPassword"
                                    value={user.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm"
                                    required
                                />
                                <FaCheck className='search-icon'></FaCheck>
                            </div>
                            <label htmlFor="password-match-error" className="error">
                                {
                                    passwordError
                                }
                            </label>
                            <button
                                type="submit"
                                className="register-button"
                                disabled={!canSubmit()}
                            >
                                Register
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Authentication;
