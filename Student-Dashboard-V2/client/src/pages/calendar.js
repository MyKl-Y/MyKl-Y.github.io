import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import axiosInstance from '../axiosConfig';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';

// Define default semester dates
const defaultSemesters = {
    Spring: {
        start: new Date(new Date().getFullYear(), 0, ((14 - new Date(new Date().getFullYear(), 0, 1).getDay()) % 7) + 8),
        end: new Date(new Date().getFullYear(), 4, ((5 - new Date(new Date().getFullYear(), 4, 1).getDay() + 1) % 7) + 1)
    },
    Summer: {
        start: new Date(new Date().getFullYear(), 4, ((14 - new Date(new Date().getFullYear(), 4, 1).getDay()) % 7) + 8),
        end: new Date(new Date().getFullYear(), 7, ((5 - new Date(new Date().getFullYear(), 7, 1).getDay() + 1) % 7) + 1)
    },
    Fall: {
        start: new Date(new Date().getFullYear(), 7, ((14 - new Date(new Date().getFullYear(), 7, 1).getDay()) % 7) + 15),
        end: new Date(new Date().getFullYear(), 11, ((5 - new Date(new Date().getFullYear(), 11, 1).getDay() + 1) % 7) + 2)
    }
};

function WeekView({ date, events, setView, view }) {
    const [currentDate, setCurrentDate] = useState(new Date(date));
    const [currentTime, setCurrentTime] = useState(new Date());

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const days = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return day;
    });

    const hours = Array.from({ length: 24 }, (_, i) => i);

    const getEventsForDay = (day) => events.filter(event => event.date.toDateString() === day.toDateString());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute
        return () => clearInterval(intervalId);
    }, []);

    const calculateCurrentTimePosition = () => {
        const now = currentTime;
        const minutesSinceStartOfDay = (now.getHours() % 24) * 60 + now.getMinutes();
        const position = minutesSinceStartOfDay / 2; // Calculate position as a percentage
        return position;
    };

    const handlePrevWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    const isCurrentWeek = currentTime >= startOfWeek && currentTime <= endOfWeek;

    return (
        <>
            <div className='week-change-container'>
                <button className='prev-week' onClick={handlePrevWeek}>&larr;</button>
                <button className='change-to-month-view' onClick={() => setView('month')}>Month View</button>
                <button className='next-week' onClick={handleNextWeek}>&rarr;</button>
            </div>
            <div className="week-view">
                { isCurrentWeek &&
                    <div className="current-time-line" style={{ top: `calc(${calculateCurrentTimePosition()}px + 1rem + 57px)` }}>
                        <div className="current-time-line-label">{currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}</div>
                    </div>
                }
                <div className="week-view-header">
                    <div className="week-view-day-header"></div>
                    {days.map((day, index) => (
                        <div key={index} className="week-view-day-header">
                            {day.toLocaleDateString('en-US', {day: 'numeric' })}
                            <br />
                            {day.toLocaleDateString('en-US', {weekday: 'short' })}
                        </div>
                    ))}
                </div>
                <div className="week-view-body">
                    <div className='week-view-time-column'>
                        {hours.map(hour => (
                            <div key={hour} className="week-view-hour-label">
                                {hour > 12 ? `${hour - 12} pm` : hour === 0 ? '12 am' : hour === 12 ? '12 pm' : `${hour} am`}
                            </div>
                        ))}
                        <div key={24.5} className="week-view-hour-label">
                            12 am
                        </div>
                    </div>
                    {days.map((day, index) => (
                        <div key={index} className="week-view-day">
                            {hours.map(hour => (
                                <div key={hour} className="week-view-hour">
                                    {getEventsForDay(day).map((event, i) => {
                                        if (event.type === 'task') {
                                            if (hour === 0) {
                                                const backgroundColor = event.details.isComplete ? 'rgba(0, 0, 255, .3) !important' : 'rgba(255, 0, 0, .3) !important';

                                                return (
                                                    <div key={i} className={`week-view-event event-${event.type}`} 
                                                        style={{ 
                                                            top: `0px`, 
                                                            height: `60px`,
                                                            backgroundColor: `${backgroundColor}`
                                                        }}>
                                                        <b>{event.details.name || event.details.course.courseName}</b>
                                                        <br />
                                                        Due: {event.details.dueDate.split('T')[1]}
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        } else {
                                            const startTime = event.details.course.meetingTimes.split(', ').map(meeting => meeting.split(' ')[0] === day.toLocaleDateString('en-US', { weekday: 'short' }) ? meeting.split(' ')[1].split('-')[0] : null).filter(time => time !== null)[0];
                                            const endTime = event.details.course.meetingTimes.split(', ').map(meeting => meeting.split(' ')[0] === day.toLocaleDateString('en-US', { weekday: 'short' }) ? meeting.split(' ')[1].split('-')[1] : null).filter(time => time !== null)[0];
                                            const top = parseFloat(startTime.split(':')[1].substring(0, 2)) / 2;
                                            const hourAsString = (hour + 1) > 12 ? ((hour + 1) - 12).toString() : (hour + 1).toString();
                                            const startAsMinutes = (parseFloat(startTime.split(':')[0]) +
                                                (startTime.includes('pm') ? 12 : 0)) * 60 + parseFloat(startTime.split(':')[1].substring(0, 2));
                                            const endAsMinutes = (parseFloat(endTime.split(':')[0]) +
                                                (endTime.includes('pm') ? 12 : 0)) * 60 + parseFloat(endTime.split(':')[1].substring(0, 2));
                                            const height = (endAsMinutes - startAsMinutes) / 2;

                                            if (startTime.split(':')[0] === hourAsString && startTime.includes(hour > 22 || hour < 11 ? 'am' : 'pm')) {
                                                return (
                                                    <div key={i} className={`week-view-event event-${event.type}`} 
                                                        style={{ 
                                                            top: `${top}px`, 
                                                            height: `${height}px` 
                                                        }}>
                                                        {event.details.name || event.details.course.courseName}
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        }
                                    })}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default function CalendarView({ semesters = defaultSemesters }) {
    const [date, setDate] = useState(new Date());
    const [datesWithEvents, setDatesWithEvents] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedDayEvents, setSelectedDayEvents] = useState([]);
    const [view, setView] = useState('month'); // Added state for view

    useEffect(() => {
        // Fetch tasks
        axiosInstance.get('/task')
            .then(res => {
                setTasks(res.data);
            })
            .catch(err => {
                console.error(err);
            });

        // Fetch courses
        axiosInstance.get('/courses')
            .then(res => {
                setCourses(res.data);
            })
            .catch(err => {
                console.error(err);
            });

    }, []);

    useEffect(() => {
        const events = [];

        // Add task dates
        tasks.forEach(task => {
            if (task.isRecurring) {
                const currentDate = new Date(task.startDate);
                let dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
                const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const activeDays = task.recurrenceInterval.split(', ');

                while (currentDate <= new Date(task.dueDate)) {
                    if (activeDays.includes(dayOfWeek)) {
                        events.push({ date: new Date(currentDate), type: 'task', details: task });
                    }
                    currentDate.setDate(currentDate.getDate() + 1);
                    dayOfWeek = daysOfWeek[currentDate.getDay()];
                }
            } else {
                if (task.dueDate) {
                    events.push({ date: new Date(task.dueDate), type: 'task', details: task });
                }
                if (task.startDate) {
                    events.push({ date: new Date(task.startDate), type: 'task', details: task });
                }
            }
        });

        // Add course meeting times
        courses.forEach(course => {
            const meetingDaysAndTimes = course.meetingTimes.split(', ');
            const meetingDays = meetingDaysAndTimes.map(meeting => meeting.split(' ')[0]);
            const [semester, semesterYear] = course.semester.split(' ');

            const startDate = new Date(semesters[semester].start);
            startDate.setFullYear(semesterYear);
            const endDate = new Date(semesters[semester].end);
            endDate.setFullYear(semesterYear);

            const currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                if (meetingDays.includes(currentDate.toLocaleDateString('en-US', { weekday: 'short' }))) {
                    const event = {
                        date: new Date(currentDate),
                        type: 'course',
                        details: {
                            course: course,
                        }
                    };
                    events.push(event);
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });

        setDatesWithEvents(events);
    }, [tasks, courses, semesters]);

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const events = datesWithEvents.filter(event => event.date.toDateString() === date.toDateString());
            if (events.length > 0) {
                return (
                    <div className={events.length > 3 ? 'emojis' : ''}>
                        {events.length > 3 ? 
                            events.map((event, index) => (
                                <>
                                    <span key={index}>
                                        {event.type === 'task' ? '📝' : '📚'}
                                    </span>
                                    <br />
                                </>
                            ))
                        : 
                            events.map((event, index) => (
                                <>
                                    <span key={index}>
                                        {event.type === 'task' 
                                            ? (event.details.name.length < 1 
                                                ? "Unnamed Task"
                                                : event.details.name)
                                            : event.details.course.courseNumber.length < 1
                                                ? "Unnamed Course"
                                                : event.details.course.courseNumber}
                                    </span>
                                    <br />
                                </>
                            ))
                        }
                    </div>
                );
            }
        }
        return <div>&nbsp;</div>;
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const events = datesWithEvents.filter(event => event.date.toDateString() === date.toDateString());
            if (events.length > 0) {
                return `tile ${events.map(event => `event-${event.type}`).join(' ')}`;
            }
        }
        return null;
    };

    useEffect(() => {
        const eventsForSelectedDay = datesWithEvents.filter(event => event.date.toDateString() === date.toDateString());
        setSelectedDayEvents(eventsForSelectedDay);
    }, [date, datesWithEvents]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
            className='calendar-container'
        >
            {view === 'month' ? (
                <div>
                    <div className='view-switcher'>
                        <button onClick={() => setView('week')}>Week View</button>
                    </div>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        calendarType="gregory"
                        tileContent={tileContent}
                        tileClassName={tileClassName}
                        className={'calendar'}
                    />
                    <div className='events-list' style={{ flex: 1, padding: '20px' }}>
                        <h2>Events on {date.toLocaleDateString('en-US', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}</h2>
                        {selectedDayEvents.length > 0 ? (
                            selectedDayEvents.map((event, index) => (
                                <div key={index}>
                                    {event.type === 'task' ? (
                                        <>
                                            <p><b>{event.details.category}</b>: {event.details.name.length < 1 ? 'Unnamed Task' : event.details.name} <b>{event.details.isComplete}</b>
                                            {' ('}{new Date(event.details.startDate).toLocaleDateString(
                                                'en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'}
                                            )}
                                            {' - '} {new Date(event.details.dueDate).toLocaleDateString(
                                                'en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'}
                                            )}{')'}
                                            {event.details.category === 'Habit' ? (
                                                <><b>Every Week On</b>: {date.toLocaleDateString('en-US', {weekday: 'long'})}</>
                                            ) : null}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p><b>{event.details.course.courseNumber}</b>: {event.details.course.courseName}
                                                {
                                                    event.details.course.meetingTimes.split(', ')
                                                        .map(meetingDaysAndTimes => meetingDaysAndTimes.includes(date.toLocaleDateString('en-US', {weekday: 'short'})) ? meetingDaysAndTimes.split(' ')
                                                            .map(time => time !== date.toLocaleDateString('en-US', {weekday: 'short'}) && (
                                                                <span key={time}> ({time})</span>
                                                            )) : null)
                                                }
                                            </p>
                                        </>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No events for this day.</p>
                        )}
                    </div>
                </div>
            ) : (
                <WeekView date={date} events={datesWithEvents} setView={setView} view={view} />
            )}
        </motion.div>
    );
}
