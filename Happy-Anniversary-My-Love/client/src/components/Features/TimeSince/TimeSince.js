// TimeSince.js
// A message that takes the date we started dating and displays how long we have been together
// I can get how long weve been together in day, month, hour, years, minutes or seconds

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../../context/theme/ThemeContext';
import { motion } from 'framer-motion';
import '../../../styles/TimeSince.scss';

export default function TimeSince() {
    const easterTimezoneOffset = (300)*(60)*(1000);

    const datingAnniversary = new Date('2018-12-03 00:00:00').getTime();
    console.log(new Date('2018-12-03 00:00:00'));
    const now = new Date().getTime();
    console.log(new Date());
    const [yearsSince, setYearsSince] = useState("");
    const [monthsSince, setMonthsSince] = useState("");
    const [weeksSince, setWeeksSince] = useState("");
    const [daysSince, setDaysSince] = useState("");
    const [hoursSince, setHoursSince] = useState("");
    const [minutesSince, setMinutesSince] = useState("");
    const [secondsSince, setSecondsSince] = useState("");

    let interval = useRef();

    const { theme } = useTheme();

    function calculateTimeSince() {
        interval = setInterval(function() {
            var difference = now - datingAnniversary;
    
            const years = getYearsSince(difference);
            difference -= years * (1000 * 60 * 60 * 24 * 365);
    
            const months = getMonthsSince(difference);
            difference -= months * (1000 * 60 * 60 * 24 * 30);
    
            const weeks = getWeeksSince(difference);
            difference -= weeks * (1000 * 60 * 60 * 24 * 7);
    
            const days = getDaysSince(difference);
            difference -= days * (1000 * 60 * 60 * 24);
    
            const hours = getHoursSince(difference);
            difference -= hours * (1000 * 60 * 60);
    
            const minutes = getMinutesSince(difference);
            difference -= minutes * (1000 * 60);
    
            const seconds = getSecondsSince(difference);
    
            setYearsSince(years);
            setMonthsSince(months);
            setWeeksSince(weeks);
            setDaysSince(days);
            setHoursSince(hours);
            setMinutesSince(minutes);
            setSecondsSince(seconds);
        }, 1000);
    };
    

    function getYearsSince(time) {
        const yearsSince = Math.floor(getDaysSince(time) / 365);

        return yearsSince;
    }

    function getMonthsSince(time) {
        const monthsSince = Math.floor(getYearsSince(time) * 12);

        return monthsSince;
    }

    function getWeeksSince(time) {
        const weeksSince = Math.floor(getDaysSince(time) / 7);

        return weeksSince;
    }

    function getDaysSince(time) {
        const daysSince = Math.floor(getHoursSince(time) / 24);

        return daysSince;
    }

    function getHoursSince(time) {
        const hoursSince = Math.floor(getMinutesSince(time) / 60);

        return hoursSince;
    }

    function getMinutesSince(time) {
        const minutesSince = Math.floor(getSecondsSince(time) / 60);

        return minutesSince;
    }

    function getSecondsSince(time) {
        const secondsSince = Math.floor(time / 1000);

        return secondsSince;
    }

    useEffect(() => {
        calculateTimeSince();
        return () => {
            clearInterval(interval);
        };
    });

    return (
        <motion.div
            className="shoutout"
            style={{
                backgroundColor: theme.buttonColor,
                color: theme.textColor,
            }}
        >
            <p>
                {`${getYearsSince((now - datingAnniversary)).toLocaleString()}
                ${getYearsSince((now - datingAnniversary)) === 1 ? ' year' : ' years'}
                \nor\n
                ${getMonthsSince((now - datingAnniversary)).toLocaleString()}
                ${getMonthsSince((now - datingAnniversary)) === 1 ? ' month' : ' months'}
                \nor\n
                ${getWeeksSince((now - datingAnniversary)).toLocaleString()}
                ${getWeeksSince((now - datingAnniversary)) === 1 ? ' week' : ' weeks'}
                \nor\n
                ${getDaysSince((now - datingAnniversary)).toLocaleString()}
                ${getDaysSince((now - datingAnniversary)) === 1 ? ' day' : ' days'}
                \nor\n
                ${(getHoursSince((now - datingAnniversary)) - 24).toLocaleString()}
                ${getHoursSince((now - datingAnniversary)) === 1 ? ' hour' : ' hours'}
                \nor\n
                ${getMinutesSince((now - datingAnniversary)).toLocaleString()}
                ${getMinutesSince((now - datingAnniversary)) === 1 ? ' minute' : ' minutes'}
                \nor\n
                ${getSecondsSince((now - datingAnniversary)).toLocaleString()}
                ${getSecondsSince((now - datingAnniversary)) === 1 ? ' second' : ' seconds'}
                ago, we first started dating which makes it 
                ${yearsSince}
                ${yearsSince === 1 ? ' year' : ' years'},
                ${monthsSince}
                ${monthsSince === 1 ? ' month' : ' months'},
                ${weeksSince}
                ${weeksSince === 1 ? ' week' : ' weeks'},
                ${daysSince - 1}
                ${daysSince === 1 ? ' day' : ' days'},
                ${hoursSince}
                ${hoursSince === 1 ? ' hour' : ' hours'},
                ${minutesSince}
                ${minutesSince === 1 ? ' minute' : ' minutes'},
                ${secondsSince}
                ${secondsSince === 1 ? ' second' : ' seconds'
                } since then.`}
            </p>
        </motion.div>
    );
}