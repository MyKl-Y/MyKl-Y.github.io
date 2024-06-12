import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/theme/ThemeContext";
import { useAuth } from "../context/authentication/AuthContext";
import Task from "../components/features/Tasks/Task/Task";
import "../styles/tasks.css";
import {
    AddCircleTwoTone,
    //ArrowUpward,
    //ArrowDownward,
    //CategoryTwoTone,
    //NewReleasesTwoTone,
    //TimelineTwoTone,
} from '@mui/icons-material';

export default function TaskList() {
    const { user } = useAuth();
    const isLoggedIn = !!user;
    const { currentTheme } = useTheme();
    const [tasks, setTasks] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'priority', direction: 'descending' });
    const [selectedTask, setSelectedTask] = useState(null);

    // This method fetches the records from the database.
    useEffect(() => {
        if (!isLoggedIn) return;
        async function getTasks() {
            const response = await fetch(`http://localhost:5050/task/user/${user.name}`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const tasks = await response.json();
            setTasks(tasks);
        }

        getTasks();

        return;
    }, [tasks.length]);

    // This method will delete a task from the database.
    async function deleteTask(id) {
        await fetch(`http://localhost:5050/task/${id}`, {
            method: "DELETE",
        });

        const newTasks = tasks.filter((el) => el._id !== id);
        setTasks(newTasks);
    }

    const sortedTasks = useMemo(() => {
        let sortableTasks = [...tasks];
        if (sortConfig.key !== null) {
            sortableTasks.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableTasks;
    }, [tasks, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    function updateTask(id, data) {
        fetch(`http://localhost:5050/task/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(() => {
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === id ? { ...task, ...data } : task))
            );
        });
    }

    function categorizedTaskList() {
        const categories = [...new Set(tasks.map((task) => task.category))];
        return categories.map((category) => (
            <div className="task-list-category" key={category}>
                <h1 className="category-title">{category}</h1>
                <div className="category-tasks">
                    {sortedTasks.filter(task => task.category === category).map((task) => (
                        <Task 
                            task={task} 
                            deleteTask={() => deleteTask(task._id)} 
                            key={task._id} 
                            onClick={() => selectedTask === task._id ? setSelectedTask(null) : setSelectedTask(task._id)}
                            selectedTask={selectedTask}
                            updateTask={updateTask}
                        />
                    ))}
                </div>
            </div>
        ));
    }
    
    // This following section will display the table with the records of individuals.
    return (
        <motion.div 
            style={currentTheme}
            key='task-list'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
        >
            <button hidden disabled className="sort-button" onClick={() => requestSort('priority')}>
                Priority
            </button>
            <Link className="create-task-button" to="/create-task">
                <AddCircleTwoTone /> Create Task
            </Link>
            <div className="task-list-body">{categorizedTaskList()}</div>
        </motion.div>
    );
}