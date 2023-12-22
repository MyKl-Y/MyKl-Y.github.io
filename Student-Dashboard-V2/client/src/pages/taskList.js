import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme/ThemeContext";
import Task from "../components/features/Tasks/Task/Task";
import "../styles/tasks.css";
import {
    AddCircleTwoTone,
} from '@mui/icons-material';

export default function TaskList() {
    const { currentTheme } = useTheme();
    const [tasks, setTasks] = useState([]);

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
        return tasks.map((task) => {
            return (
                <Task 
                    task={task} 
                    deleteTask={() => deleteTask(task._id)} 
                    key={task._id} 
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <table className="task-list-table" style={currentTheme}>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{taskList()}</tbody>
            </table>
            <Link className="create-task-button" to="/create-task">
                <AddCircleTwoTone />
            </Link>
        </div>
    );
}