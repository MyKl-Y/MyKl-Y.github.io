import React from "react";
import { Link } from "react-router-dom";
import {
    EditTwoTone,
    DeleteTwoTone,
} from '@mui/icons-material';

function formatDateString(dateString) {
    const date = new Date(dateString);
    const months = date.getMonth() + 1; // getMonth() returns month from 0-11
    const days = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format numbers to have leading zeros
    const formattedMonth = months.toString().padStart(2, '0');
    const formattedDay = days.toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedMonth}/${formattedDay} ${formattedHours}:${formattedMinutes} ${ampm}`;
}

const Task = (props) => (
    <tr>
        <td>{props.task.category}</td>
        <td>{props.task.priority}</td>
        <td>{props.task.isComplete}</td>
        <td>{props.task.name}</td>
        <td>{props.task.description}</td>
        <td>{formatDateString(props.task.startDate)}</td>
        <td>{formatDateString(props.task.dueDate)}</td>
        <td>
            <Link className="edit-task-button" 
                to={`/edit-task/${props.task._id}`}
            >
                <EditTwoTone />
            </Link> 
            {" | "}
            <button className="delete-task-button"
                onClick={() => {
                    props.deleteTask(props.task._id);
                }}
            >
                <DeleteTwoTone />
            </button>
        </td>
    </tr>
);

export default Task;