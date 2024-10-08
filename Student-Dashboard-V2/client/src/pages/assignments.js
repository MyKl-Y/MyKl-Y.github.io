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

export default function Assignments() {
    const { currentTheme } = useTheme();
    const { userData } = useAuth();
    const isLoggedIn = !!userData;
    const [assignments, setAssignments] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'priority', direction: 'descending' });
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) return;
        async function getAssignments() {
            const response = await fetch(`https://student-dasboard.onrender.com/task/user/${userData.name}`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const assignments = await response.json();
            setAssignments(assignments);
        }

        if (assignments.length === 0) {
            getAssignments();
        }

        return;
    }, [assignments.length, userData, isLoggedIn]);

    async function deleteAssignment(id) {
        await fetch(`https://student-dasboard.onrender.com/task/${id}`, {
            method: "DELETE",
        });

        const newAssignments = assignments.filter((el) => el._id !== id);
        setAssignments(newAssignments);
    }

    const updateAssignment = (id, data) => {
        fetch(`https://student-dasboard.onrender.com/task/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(() => {
            setAssignments((prevAssignments) =>
                prevAssignments.map((assignment) => (assignment._id === id ? { ...assignment, ...data } : assignment))
            );
        });
    };

    const sortedAssignments = useMemo(() => {
        const desiredCategories = ["Homework", "Project", "Quiz", "Exam", "Paper", "Presentation"];
        let filteredAssignments = assignments.filter(assignment => 
            desiredCategories.includes(assignment.category)
        );

        if (sortConfig.key !== null) {
            filteredAssignments.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return filteredAssignments;
    }, [assignments, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const categorizedAssignmentList = () => {
        const categories = [...new Set(sortedAssignments.map((assignment) => assignment.category))];
        return categories.map((category) => (
            <div className="task-list-category" key={category}>
                <h1 className="category-title">{category}</h1>
                <div className="category-tasks">
                    {sortedAssignments.filter(assignment => assignment.category === category).map((assignment) => (
                        <Task 
                            task={assignment} 
                            deleteTask={() => deleteAssignment(assignment._id)} 
                            key={assignment._id} 
                            onClick={() => selectedAssignment === assignment._id ? setSelectedAssignment(null) : setSelectedAssignment(assignment._id)}
                            selectedTask={selectedAssignment}
                            updateTask={updateAssignment}
                        />
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <motion.div
            style={currentTheme}
            key='assignment-list'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
        >
            <button hidden disabled className="sort-button" onClick={() => requestSort('priority')}>
                Priority
            </button>
            <Link className="create-task-button" to="/create-task">
                <AddCircleTwoTone />
            </Link>
            <div className="task-list-body">{categorizedAssignmentList()}</div>
        </motion.div>
    );
}
