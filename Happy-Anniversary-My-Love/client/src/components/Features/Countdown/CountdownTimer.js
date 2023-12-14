// CountdownTimer.js
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../../context/theme/ThemeContext';
import { motion } from 'framer-motion';
import '../../../styles/CountdownTimer.scss';

export default function CountdownTimer() {
    const [timerDays, setTimerDays] = useState("");
    const [timerHours, setTimerHours] = useState("");
    const [timerMinutes, setTimerMinutes] = useState("");
    const [timerSeconds, setTimerSeconds] = useState("");

    let interval = useRef();

    const { theme } = useTheme();

    function calculateTimeLeft() {
        const now = new Date().getTime();
        const easterTimezoneOffset = 300*60*1000;
        const currentYear = new Date().getFullYear();
        const nextYear = new Date().getFullYear() + 1;
        var calculateYear = 0;
        if (new Date(`${currentYear}-12-03`).getTime() <= now) {
            calculateYear = nextYear;
        } else {
            calculateYear = currentYear;
        }
        const countdownDate = new Date(`${calculateYear}-12-03`).getTime() + easterTimezoneOffset;

        interval = setInterval(function() {
            const difference = countdownDate - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (difference / (1000 * 60 * 60)) % 24
            );
            const minutes = Math.floor(
                (difference / (1000 * 60)) % 60
            );
            const seconds = Math.floor(
                (difference / 1000) % 60
            );

            if (difference < 0) {
                // Stop our timer
                clearInterval(interval.current);
            } else {
                // Update timer
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000);
    }

    useEffect(() => {
        calculateTimeLeft();
        return () => {
            clearInterval(interval);
        };
    });

    return (
        <section 
            className="countdown-section"
            style={{
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
            }}
        >
            <div className="countdown-container container">
                <div className="countdown-title">
                <h1>Our next anniversary is in</h1>
                </div>
        
                <ul className="countdown-timer row">
                    <li className="col-lg-3">
                        <p className="time">{timerDays}</p>
                        <p className="time-text">DAYS</p>
                    </li>
                    <li className="col-lg-3">
                        <p className="time">{timerHours}</p>
                        <p className="time-text">HOURS</p>
                    </li>
                    <li className="col-lg-3">
                        <p className="time">{timerMinutes}</p>
                        <p className="time-text">MINUTES</p>
                    </li>
                    <li className="col-lg-3">
                        <p className="time">{timerSeconds}</p>
                        <p className="time-text">SECONDS</p>
                    </li>
                </ul>
            </div>
        </section>
    );
}