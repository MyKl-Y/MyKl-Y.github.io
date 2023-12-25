import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";
import { useTheme } from "../context/theme/ThemeContext";
import Task from "../components/features/Tasks/Task/Task";
import "../styles/tasks.css";
import {
    AddCircleTwoTone,
    ArrowUpward, 
    ArrowDownward,
    CategoryTwoTone,
    NewReleasesTwoTone,
    TimelineTwoTone,
} from '@mui/icons-material';

export default function TaskList() {
    const { currentTheme } = useTheme();
    const [tasks, setTasks] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'priority', direction: 'descending' });

    // This method fetches the records from the database.
    useEffect(() => {
        async function getTasks() {
            const response = await fetch("http://localhost:5050/task/");

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

    // This method will map out the tasks on the table
    function taskList() {
        return sortedTasks.map((task) => {
            return (
                <Task 
                    task={task} 
                    deleteTask={() => deleteTask(task._id)} 
                    key={task._id} 
                />
            );
        });
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
    
    // TODO: Sort table by priority then by due date
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
            <table className="task-list-table" style={currentTheme}>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('category')}>
                            <abbr title="Category">
                                <CategoryTwoTone />
                            </abbr> 
                            {sortConfig.key === 'category' && (sortConfig.direction === 'ascending' 
                                ? <ArrowUpward /> 
                                : <ArrowDownward />)}
                        </th>
                        <th onClick={() => requestSort('priority')}>
                            <abbr title="Priority">
                                <NewReleasesTwoTone />
                            </abbr> 
                            {sortConfig.key === 'priority' && (sortConfig.direction !== 'ascending' 
                                ? <ArrowUpward /> 
                                : <ArrowDownward />)}
                        </th>
                        <th onClick={() => requestSort('status')}>
                            <abbr title="Status">
                                <TimelineTwoTone />
                            </abbr>
                            {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' 
                                ? <ArrowUpward /> 
                                : <ArrowDownward />)}
                        </th>
                        <th onClick={() => requestSort('name')}>
                            Name 
                            {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' 
                                ? <ArrowUpward /> 
                                : <ArrowDownward />)}
                        </th>
                        <th onClick={() => requestSort('description')}>
                            Info 
                            {sortConfig.key === 'description' && (sortConfig.direction === 'ascending' 
                                ? <ArrowUpward /> 
                                : <ArrowDownward />)}
                        </th>
                        <th onClick={() => requestSort('startDate')}>
                            Start Date 
                            {sortConfig.key === 'startDate' && (sortConfig.direction === 'ascending' 
                                ? <ArrowUpward /> 
                                : <ArrowDownward />)}
                        </th>
                        <th onClick={() => requestSort('dueDate')}>
                            Due Date 
                            {sortConfig.key === 'dueDate' && (sortConfig.direction === 'ascending' 
                                ? <ArrowUpward /> 
                                : <ArrowDownward />)}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{taskList()}</tbody>
            </table>
            <Link className="create-task-button" to="/create-task">
                <AddCircleTwoTone />
            </Link>
        </motion.div>
    );
}