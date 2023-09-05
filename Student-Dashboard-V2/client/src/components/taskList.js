import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Task = (props) => (
    <tr>
        <td>{props.task.isPriority}</td>
        <td>{props.task.isComplete}</td>
        <td>{props.task.name}</td>
        <td>{props.task.description}</td>
        <td>{props.task.dueDate}</td>
        <td>{props.task.isRecurring}</td>
        <td>{props.task.recurrenceInterval}</td>
        <td>{props.task.recurrenceCount}</td>
        <td>
            <Link className="btn btn-link" 
                to={`/edit/${props.task._id}`}
            >
                Edit
            </Link> |
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteTask(props.task._id);
                }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function TaskList() {
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
            <h3>Task List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Is Priority</th>
                        <th>Is Complete</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Is Recurring</th>
                        <th>Recurrence Interval</th>
                        <th>Recurrence Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{taskList()}</tbody>
            </table>
        </div>
    );
}