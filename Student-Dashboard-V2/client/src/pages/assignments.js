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

export default function Assignments() {
    const { currentTheme } = useTheme();
    const [assignments, setAssignments] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'priority', direction: 'descending' });

    // This method fetches the records from the database.
    useEffect(() => {
        async function getAssignments() {
            const response = await fetch("http://localhost:5050/task/");

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const assignments = await response.json();
            setAssignments(assignments);
        }

        getAssignments();

        return;
    }, [assignments.length]);

    // This method will delete a task from the database.
    async function deleteAssignment(id) {
        await fetch(`http://localhost:5050/task/${id}`, {
            method: "DELETE",
        });

        const newAssignment = assignments.filter((el) => el._id !== id);
        setAssignments(newAssignment);
    }

    // This method will map out the tasks on the table
    function assignmentList() {
        return sortedAssignments.map((assignment) => {
            return (
                <Task 
                    task={assignment} 
                    deleteTask={() => deleteAssignment(assignment._id)} 
                    key={assignment._id} 
                />
            );
        });
    }

    const desiredCategories = ["Homework", "Project", "Quiz", "Exam", "Paper", "Presentation"];

    const sortedAssignments = useMemo(() => {
        // Filter assignments based on the desired categories
        let filteredAssignments = assignments.filter(assignment => 
            desiredCategories.includes(assignment.category)
        );

        // Sort assignments based on the sortConfig
        if (sortConfig !== null) {
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
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }

    return (
        <motion.div
            style={currentTheme}
            key='assignment-list'
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
                <tbody>{assignmentList()}</tbody>
            </table>
            <Link className="create-task-button" to="/create-task">
                <AddCircleTwoTone />
            </Link>
        </motion.div>
    );
};