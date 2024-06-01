import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import axiosInstance from '../axiosConfig';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';

// Define default semester dates
const defaultSemesters = {
    Spring: { start: new Date(new Date().getFullYear(), 0, 8), end: new Date(new Date().getFullYear(), 4, 7) },
    Summer: { start: new Date(new Date().getFullYear(), 4, 8), end: new Date(new Date().getFullYear(), 6, 28) },
    Fall: { start: new Date(new Date().getFullYear(), 7, 21), end: new Date(new Date().getFullYear(), 11, 14) }
};

export default function CalendarView({ semesters = defaultSemesters }) {
    const [date, setDate] = useState(new Date());
    const [datesWithEvents, setDatesWithEvents] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedDayEvents, setSelectedDayEvents] = useState([]);

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
            const meetingDays = course.meetingTimes.split(', ');
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
                            timeRange: course.timeRange
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
