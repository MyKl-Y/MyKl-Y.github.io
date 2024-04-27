import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";
import { useTheme } from "../context/theme/ThemeContext";
import "../styles/tasks.css";
import {
    AddCircleTwoTone,
    ArrowUpward, 
    ArrowDownward,
    CategoryTwoTone,
    NewReleasesTwoTone,
    TimelineTwoTone,
    ArrowLeft,
    ArrowRight,
} from '@mui/icons-material';

const formatDate = (dateString) => {
    //const options = { year: '2-digit', month: 'numeric', day: 'numeric' };
    const options = { day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

const weekDay = (dateString) => {
    const options = { weekday: 'narrow' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function Habits() {
    const { currentTheme } = useTheme();
    const [habits, setHabits] = useState([]);
    const [view, setView] = useState("Day");
    const [navigateCounter, setNavigateCounter] = useState(0);

    const viewOptions = [
        "Day",
        "Week",
        "Month",
        //"Year",
        //"All",
    ]

    // Helper function to check if a date falls within the habit's active period
    const isActiveOnDate = (habit, date) => {
        const startDate = new Date(habit.startDate);
        const endDate = habit.dueDate ? new Date(habit.dueDate) : new Date();
        return date >= startDate && date <= endDate;
    };

    // Helper function to check if a habit is active on a given day based on recurrenceInterval
    const isActiveOnDay = (habit, date) => {
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
        const activeDays = habit.recurrenceInterval.split(', ');
        return activeDays.includes(dayOfWeek);
    };

    // This method fetches the records from the database.
    useEffect(() => {
        async function getHabits() {
            const response = await fetch("http://localhost:5050/task/");

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const habitsData = await response.json();

            setHabits(habitsData);
        }

        getHabits();

        return;
    }, [navigateCounter, habits.length]);

    // This method will delete a task from the database.
    async function deleteHabit(id) {
        await fetch(`http://localhost:5050/task/${id}`, {
            method: "DELETE",
        });

        const newHabit = habits.filter((el) => el._id !== id);
        setHabits(newHabit);
    }

    const handleToggleHabit = async (habit, habitId, day, status) => {
        try {
            if (
                habit.recurrence.find((el) => 
                    el[0] === day.toLocaleDateString(
                        'default',
                        {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        }
                    )
                )
            ) {
                habit.recurrence = habit.recurrence.filter((el) => 
                    el[0] !== day.toLocaleDateString(
                        'default',
                        {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        }
                    )
                );

                const response = await fetch(`http://localhost:5050/task/${habitId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        { 
                            ...habit,
                            recurrence: habit.recurrence,
                            recurrenceCount: habit.recurrenceCount - 1, 
                        }
                    ),
                });

                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }

                const updatedHabit = await response.json();
            } else {
                let hashmap = [
                    day.toLocaleDateString(
                        'default',
                        {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        }
                    ),
                    status
                ];

                habit.recurrence.push(hashmap);

                const response = await fetch(`http://localhost:5050/task/${habitId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        { 
                            ...habit,
                            recurrence: habit.recurrence,
                            recurrenceCount: habit.recurrenceCount + 1, 
                        }
                    ),
                });

                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }

                const updatedHabit = await response.json();
            }
        }
        catch (err) {
            console.error(err.message);
        }

        // Delay for 2 seconds, then reload the page on success
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    // Determine the date range for the grid based on the habits' start and end dates
    // For simplicity, we'll just use the current week. You can enhance this to allow navigation through weeks.
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - d.getDay() + i + (navigateCounter * 7));
        return d;
    });

    const daysInMonth = Array.from(
        { length: new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1 + navigateCounter,
                0
            ).getDate() 
        }, (_ , i) => {
            const d = new Date(
                new Date().getFullYear(),
                new Date().getMonth() + navigateCounter
            );
            d.setDate(d.getDate() + i);
            return d;
        }
    )

    const today = Array.from({ length: 1 }, (_ , i) => {
            const d = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() + navigateCounter
            );
            d.setDate(d.getDate() + i);
            return d;
    });

    const isHabitChecked = (habit, day) => {
        const habitDay = habit.recurrence.find((el) => 
            el[0] === day.toLocaleDateString(
                'default',
                {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }
            )
        );
        return habitDay ? habitDay[1] : false;
    }

    // This method will map out the tasks on the table
    function habitList(view) {
        if (view === "Week") {
            return filteredHabits.map((habit) => {
                return (
                    <tr key={habit._id}>
                        <td>{habit.name}</td>
                        {weekDays.map(day => (
                                <td
                                    key={day}
                                    className={
                                        day.toLocaleDateString("en-US") 
                                        === 
                                        new Date().toLocaleDateString("en-US")
                                            ? "today"
                                            : ""
                                    }
                                >
                                    {isActiveOnDay(habit, day) && isActiveOnDate(habit, day) ? (
                                        <input 
                                            type="checkbox"
                                            checked={
                                                isHabitChecked(
                                                    habit,
                                                    day
                                                )
                                            }
                                            onChange={(e) => 
                                                handleToggleHabit(
                                                    habit,
                                                    habit._id,
                                                    day,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </td>
                        ))}
                    </tr>
                );
            });
        } else if (view === "Month") {
            return filteredHabits.map((habit) => {
                return (
                    <tr key={habit._id}>
                        <td>{habit.name}</td>
                        {daysInMonth.map(day => (
                            <td 
                                key={day}
                                className={
                                    day.toLocaleDateString("en-US") 
                                    === 
                                    new Date().toLocaleDateString("en-US")
                                        ? "today"
                                        : ""
                                }
                            >
                                {isActiveOnDay(habit, day) && isActiveOnDate(habit, day) ? (
                                    <input 
                                        type="checkbox"
                                        checked={
                                            isHabitChecked(
                                                habit,
                                                day
                                            )
                                        }
                                        onChange={(e) => 
                                            handleToggleHabit(
                                                habit,
                                                habit._id,
                                                day,
                                                e.target.checked
                                            )
                                        }
                                    />
                                ) : (
                                    <></>
                                )}
                            </td>
                        ))}
                    </tr>
                );
            });
        } else if (view === "Day") {
            return filteredHabits.map((habit) => {
                return (
                    <tr key={habit._id}>
                        <td>{habit.name}</td>
                        <td>
                            {isActiveOnDay(habit, today[0]) && isActiveOnDate(habit, today[0]) ? (
                                <input 
                                    type="checkbox"
                                    checked={
                                        isHabitChecked(
                                            habit,
                                            today[0]
                                        )
                                    }
                                    onChange={(e) => 
                                        handleToggleHabit(
                                            habit,
                                            habit._id,
                                            today[0],
                                            e.target.checked
                                        )
                                    }
                                />
                            ) : (
                                <></>
                            )}
                        </td>
                    </tr>
                );
            });
        }
    }

    // This method will filter the tasks based on the selected category
    const filteredHabits = useMemo(() => {
        // Filter habits based on the desired categories
        let filteredHabits = habits.filter(habit => 
            "Habit" === habit.category
        );

        return filteredHabits;
    }, [habits]);

    // TODO: remove & edit habits buttons
    // TODO: total achieved column, streak counter (only for day view)
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
            className={`habit-tracker ${view}`}
        >
            <div className="habits-navigator">
                <button>
                    <ArrowLeft onClick={() => setNavigateCounter(navigateCounter - 1)} />
                </button>
                <div className="view-options">
                    {viewOptions.map((option) => (
                        <div
                            className={`view-option ${
                                view === option ? "selected" : ""
                            }`}
                            key={option}
                            onClick={() => setView(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
                <button>
                    <ArrowRight onClick={() => setNavigateCounter(navigateCounter + 1)} />
                </button>
            </div>
            {view === "Week" ? (
                <>
                    <h1>
                        {`${
                            weekDays[0].toLocaleDateString(
                                undefined,
                                {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                }
                            )
                        } - ${
                            weekDays[6].toLocaleDateString(
                                undefined,
                                {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                }
                            )
                        }`}
                    </h1>
                    <table className="task-list-table" style={currentTheme}>
                        <thead>
                            <tr>
                                <th rowSpan={2}>Habits</th>
                                {weekDays.map(day => (
                                    <th
                                        key={day}
                                        className={
                                            day.toLocaleDateString("en-US") 
                                            === 
                                            new Date().toLocaleDateString("en-US")
                                                ? "today"
                                                : ""
                                        }
                                    >{weekDay(day)}</th>
                                ))}
                            </tr>
                            <tr>
                                {weekDays.map(day => (
                                    <th
                                        key={day}
                                        className={
                                            day.toLocaleDateString("en-US") 
                                            === 
                                            new Date().toLocaleDateString("en-US")
                                                ? "today"
                                                : ""
                                        }
                                    >{formatDate(day)}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>{habitList("Week")}</tbody>
                    </table>
                </>
            ) : (
                view === "Month" ? (
                    <>
                        <h1>
                            {`${daysInMonth[0].toLocaleDateString(
                                undefined,
                                {
                                    month: 'long',
                                    year: 'numeric'
                                }
                            )}`}
                        </h1>
                        <table className="task-list-table" style={currentTheme}>
                            <thead>
                                <tr>
                                    <th rowSpan={2}>Habits</th>
                                    {daysInMonth.map(day => (
                                        <th
                                            key={day}
                                            className={
                                                day.toLocaleDateString("en-US") 
                                                === 
                                                new Date().toLocaleDateString("en-US")
                                                    ? "today"
                                                    : ""
                                            }
                                        >{weekDay(day)}</th>
                                    ))}
                                </tr>
                                <tr>
                                    {daysInMonth.map(day => (
                                        <th
                                            key={day}
                                            className={
                                                day.toLocaleDateString("en-US") 
                                                === 
                                                new Date().toLocaleDateString("en-US")
                                                    ? "today"
                                                    : ""
                                            }
                                        >{formatDate(day)}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>{habitList("Month")}</tbody>
                        </table>
                    </>
                ) : (
                    view === "Year" ? (
                        <>
                            <h1>
                                {`${new Date().toLocaleDateString(undefined, {year: 'numeric'})}`}
                            </h1>
                            <table className="task-list-table" style={currentTheme}>
                                <thead>
                                    <tr>
                                        <th>Habits</th>
                                        {weekDays.map(day => (
                                            <th key={day}>{formatDate(day)}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>{habitList("Year")}</tbody>
                            </table>
                        </>
                    ) : (
                        view === "All" ? (
                            <>
                                <h1>
                                    {`All Habits`}
                                </h1>
                                <table className="task-list-table" style={currentTheme}>
                                    <thead>
                                        <tr>
                                            <th>Habits</th>
                                            {weekDays.map(day => (
                                                <th key={day}>{formatDate(day)}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>{habitList("All")}</tbody>
                                </table>
                            </>
                        ) : (
                            <>
                                <h1>
                                    Today's Habits
                                </h1>
                                <table className="task-list-table" style={currentTheme}>
                                    <thead>
                                        <tr>
                                            <th>Habits</th>
                                            <th key={today[0]}>
                                                {today[0].toLocaleDateString(
                                                    undefined,
                                                    {
                                                        weekday: "short",
                                                        month: "short",
                                                        day: "numeric",
                                                    }
                                                )}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>{habitList("Day")}</tbody>
                                </table>
                            </>
                        )
                    )
                )
            )}
            <Link className="create-task-button" to="/create-task">
                <AddCircleTwoTone />
            </Link>
        </motion.div>
    );
};