import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    EditTwoTone,
    DeleteTwoTone,
    CheckCircleTwoTone,
    CancelTwoTone,
    PendingTwoTone,
    CircleTwoTone,
} from '@mui/icons-material';

function formatDateString(dateString) {
    if (dateString === "") {
        return "-";
    }

    const date = new Date(dateString);
    const year = date.getFullYear();
    const months = date.getMonth() + 1; // getMonth() returns month from 0-11
    const days = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format numbers to have leading zeros
    const formattedYear = year.toString().padStart(4, '0');
    const formattedMonth = months.toString().padStart(2, '0');
    const formattedDay = days.toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedMonth}/${formattedDay}/${formattedYear} ${formattedHours}:${formattedMinutes} ${ampm}`;
}

function statusIcon(status) {
    switch (status) {
        case "Yes":
            return <CheckCircleTwoTone />;
        case "No":
            return <CancelTwoTone />;
        case "IP":
            return <PendingTwoTone />;
        default:
            return <CircleTwoTone />;
    }
}

function exclamationPointPriority(priority) {
    let priorityStr = ''
    for (let i = 0; i < priority; i++) {
        priorityStr += '!';
    }
    return priorityStr;
}

let showDropdown = false;

const toggleDropdown = () => {
    showDropdown = !showDropdown;
};

const Task = (props) => (
    <div className='task' onClick={props.onClick}>
        <div className="task-status">
            <div className={`task-status-header ${props.task.isComplete}`} onClick={toggleDropdown}>
                <abbr title="Status">
                    {statusIcon(props.task.isComplete)}
                </abbr>
            </div>
            {showDropdown && props.selectedTask === props.task._id && (
                <div className="task-status-options">
                    <div
                        className={`task-status-option ${props.task.isComplete === "" ? "active" : "inactive"}`}
                        onClick={() => 
                            {
                                props.updateTask(props.task._id, { ...props.task, isComplete: "" });
                                toggleDropdown()
                            }
                        }
                    >
                        N/A
                    </div>
                    <div
                        className={`task-status-option ${props.task.isComplete === "Yes" ? "active" : "inactive"}`}
                        onClick={() => 
                            {
                                props.updateTask(props.task._id, { ...props.task, isComplete: "Yes" });
                                toggleDropdown()
                            }
                        }
                    >
                        Yes
                    </div>
                    <div
                        className={`task-status-option ${props.task.isComplete === "No" ? "active" : "inactive"}`}
                        onClick={() => 
                            {
                                props.updateTask(props.task._id, { ...props.task, isComplete: "No" });
                                toggleDropdown()
                            }
                        }
                    >
                        No
                    </div>
                    <div
                        className={`task-status-option ${props.task.isComplete === "IP" ? "active" : "inactive"}`}
                        onClick={() => 
                            {
                                props.updateTask(props.task._id, { ...props.task, isComplete: "IP" });
                                toggleDropdown()
                            }
                        }
                    >
                        IP
                    </div>
                </div>
            )}
        </div>
        <div className="task-body">
            <h3><b>{exclamationPointPriority(props.task.priority)}</b> {props.task.name && props.task.name.length > 0 ? props.task.name : 'Untitled'}</h3>
            <p>{(props.selectedTask === props.task._id ? formatDateString(props.task.startDate) + " - " : "") + formatDateString(props.task.dueDate)}</p>
            {props.selectedTask === props.task._id ? (
                <div>
                    <p>{props.task.description}</p>
                    <Link className="edit-task-button" to={`/edit-task/${props.task._id}`}>
                        <EditTwoTone fontSize="small" />
                    </Link>
                    <button className="delete-task-button" onClick={() => props.deleteTask(props.task._id)}>
                        <DeleteTwoTone fontSize="small" />
                    </button>
                </div>
            ) : null}
        </div>
    </div>
    /*<tr>
        <td>{props.task.category}</td>
        <td>{props.task.priority}</td>
        <td>
            <abbr title={`${props.task.isComplete}`}>
                {statusIcon(props.task.isComplete)}
            </abbr>
        </td>
        <td>{props.task.name}</td>
        <td>{props.task.description}</td>
        <td>{formatDateString(props.task.startDate)}</td>
        <td>{formatDateString(props.task.dueDate)}</td>
        <td>
            <Link className="edit-task-button" 
                to={`/edit-task/${props.task._id}`}
            >
                <EditTwoTone fontSize="small" />
            </Link> 
            <button className="delete-task-button"
                onClick={() => {
                    props.deleteTask(props.task._id);
                }}
            >
                <DeleteTwoTone fontSize="small" />
            </button>
        </td>
    </tr>*/
);

export default Task;