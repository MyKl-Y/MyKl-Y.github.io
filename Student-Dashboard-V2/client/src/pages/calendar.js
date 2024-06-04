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

// TODO: Add time bars for hours and add current time line

function WeekView({ date, events }) {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    const days = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return day;
    });

    const hours = Array.from({ length: 24 }, (_, i) => i);

    const getEventsForDay = (day) => events.filter(event => event.date.toDateString() === day.toDateString());

    return (
        <div className="week-view">
            <div className="week-view-header">
                {days.map((day, index) => (
                    <div key={index} className="week-view-day-header">
                        {day.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                    </div>
                ))}
            </div>
            <div className="week-view-body">
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
                                                    {event.details.category}
                                                </div>
                                            );
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
                    <div>
                        {events.map((event, index) => (
                            <span key={index}>
                                {event.type === 'task' ? '📝' : '📚'}
                            </span>
                        ))}
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
            <div className='view-switcher'>
                <button onClick={() => setView('month')}>Month View</button>
                <button onClick={() => setView('week')}>Week View</button>
            </div>
            {view === 'month' ? (
                <div>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        calendarType="gregory"
                        tileContent={tileContent}
                        tileClassName={tileClassName}
                        className={'calendar'}
                    />
                </div>
            ) : (
                <WeekView date={date} events={datesWithEvents} />
            )}
            <div className='events-list' style={{ flex: 1, padding: '20px' }}>
                <h2>Events on {date.toLocaleDateString('en-US', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}</h2>
                {selectedDayEvents.length > 0 ? (
                    selectedDayEvents.map((event, index) => (
                        <div key={index}>
                            {event.type === 'task' ? (
                                <>
                                    <h3>Task <b>{event.details.isComplete}</b></h3>
                                    <p><b>{event.details.category}</b>: {event.details.name}</p>
                                    <p><b>From</b>: {new Date(event.details.startDate).toLocaleDateString(
                                        'en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'}
                                    )}</p> 
                                    <p><b>To</b>: {new Date(event.details.dueDate).toLocaleDateString(
                                        'en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'}
                                    )}</p>
                                    {event.details.category === 'Habit' ? (
                                        <p><b>Every Week On</b>: {date.toLocaleDateString('en-US', {weekday: 'long'})}</p>
                                    ) : null}
                                </>
                            ) : (
                                <>
                                    <h3>Course</h3>
                                    <p><b>{event.details.course.courseNumber}</b>: {event.details.course.courseName}</p>
                                    <p><b>Times</b>:
                                        {
                                            event.details.course.meetingTimes.split(', ')
                                                .map(meetingDaysAndTimes => meetingDaysAndTimes.includes(date.toLocaleDateString('en-US', {weekday: 'short'})) ? meetingDaysAndTimes.split(' ')
                                                    .map(time => time !== date.toLocaleDateString('en-US', {weekday: 'short'}) && (
                                                        <span key={time}><br/>{'>'} {time}</span>
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
        </motion.div>
    );
}
