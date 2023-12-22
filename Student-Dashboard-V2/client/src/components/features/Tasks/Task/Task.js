import React from "react";
import { Link } from "react-router-dom";
import {
    EditTwoTone,
    DeleteTwoTone,
} from '@mui/icons-material';

const Task = (props) => (
    <tr>
        <td>{props.task.category}</td>
        <td>{props.task.priority}</td>
        <td>{props.task.isComplete}</td>
        <td>{props.task.name}</td>
        <td>{props.task.description}</td>
        <td>{props.task.startDate}</td>
        <td>{props.task.dueDate}</td>
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