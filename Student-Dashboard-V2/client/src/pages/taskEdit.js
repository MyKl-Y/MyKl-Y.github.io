import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router"
import { motion } from "framer-motion";
import { useTheme } from "../context/theme/ThemeContext";
import "../styles/tasks.css"

export default function EditTask() {
    const { currentTheme } = useTheme();

    const [form, setForm] = useState({
        category: "",
        name: "",
        description: "",
        startDate: "",
        dueDate: "",
        isComplete: "",
        priority: 0,
        isArchived: false,
        isDeleted: false,
        isRecurring: false,
        recurrence: [],
        recurrenceInterval: "",
    });

    const defaultTags = [
        "General",
        "Habit", 
        "Homework",
        "Project",
        "Quiz",
        "Exam",
        "Paper",
        "Presentation",
        "School",
        "Work",
        "Event",
        "Other",
    ];
    const [selectedTag, setSelectedTag] = useState("General");
    function handleTagSelect(tag) {
        setSelectedTag(tag);

        setForm(prevForm => ({
            ...prevForm,
            category: tag,
            isRecurring: tag === "Habit"
        }))

        setShowRecurrenceFields(tag === "Habit");
    };

    const params = useParams();
    const navigate = useNavigate();
    const [showRecurrenceFields, setShowRecurrenceFields] = useState(false); // New state variable

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5050/task/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const task = await response.json();
            if (!task) {
                window.alert(`Task with id ${id} not found`);
                navigate("/Student-Dashboard-V2/client/tasks");
                return;
            }

            setForm(task);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value, };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedTask = {
            category: form.category,
            name: form.name,
            description: form.description,
            startDate: form.startDate,
            dueDate: form.dueDate,
            isComplete: form.isComplete,
            priority: form.priority,
            isArchived: form.isArchived,
            isDeleted: form.isDeleted,
            isRecurring: form.isRecurring,
            recurrence: form.recurrence,
            recurrenceInterval: form.recurrenceInterval,
            recurrenceCount: form.recurrenceCount,
        };

        await fetch(`http://localhost:5050/task/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedTask),
            headers: {
                "Content-Type": "application/json",
            },
        });

        setShowRecurrenceFields(false); // Hide recurrence fields
        navigate("/Student-Dashboard-V2/client/tasks");
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <motion.div
            className="task-edit-container"
            style={currentTheme}
            key='task-edit'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
        >
            <h3>Edit a task</h3>
            <form onSubmit={onSubmit}>
                <label htmlFor="category">Category: </label>
                <div className="chip-container">
                    {defaultTags.map((tag) => (
                        <div 
                            className={`tag ${
                                selectedTag === tag ? "selected" : ""
                            }`} 
                            key={tag} 
                            onClick={() => {handleTagSelect(tag)}}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
                <label htmlFor="isComplete">Status: </label>
                <br/>
                <input
                    type="radio"
                    id="isCompleteNo"
                    value="No"
                    checked={form.isComplete === "No"}
                    onChange={(e) => updateForm({ isComplete: e.target.value })}
                />
                <label htmlFor="isCompleteNo">
                    No
                </label>    
                <input
                    type="radio"
                    id="isCompleteYes"
                    value="Yes"
                    checked={form.isComplete === "Yes"}
                    onChange={(e) => updateForm({ isComplete: e.target.value })}
                />
                <label htmlFor="isCompleteYes">
                    Yes
                </label>    
                <input
                    type="radio"
                    id="isCompleteIP"
                    value="IP"
                    checked={form.isComplete === "IP"}
                    onChange={(e) => updateForm({ isComplete: e.target.value })}
                />
                <label htmlFor="isCompleteIP">
                    In-Progress
                </label>    
                <input
                    type="radio"
                    id="isCompleteNA"
                    value="NA"
                    checked={form.isComplete === "NA"}
                    onChange={(e) => updateForm({ isComplete: e.target.value })}
                />
                <label htmlFor="isCompleteNA">
                    Not Applicable
                </label>
                <input
                    type="checkbox"
                    id="isArchived"
                    value={form.isArchived}
                    onChange={(e) => updateForm({ isArchived: e.target.value })}
                />
                <label htmlFor="isArchived">Archived</label>
                <input
                    type="checkbox"
                    id="isDeleted"
                    value={form.isDeleted}
                    onChange={(e) => updateForm({ isDeleted: e.target.value })}
                />
                <label htmlFor="isDeleted">Deleted</label>
                <br/>
                <label htmlFor="priority">Priority:</label>
                <input
                    type="number"
                    id="priority"
                    value={form.priority}
                    onChange={(e) => updateForm({ priority: e.target.value })}
                />
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                />
                <label htmlFor="description">Description: </label>
                <input
                    type="text"
                    id="description"
                    value={form.description}
                    onChange={(e) => updateForm({ description: e.target.value })}
                />
                <label htmlFor="dueDate">Start Date: </label>
                <input
                    type="datetime-local"
                    id="startDate"
                    value={form.startDate}
                    onChange={(e) => updateForm({ startDate: e.target.value })}
                />
                <label htmlFor="dueDate">Due Date: </label>
                <input
                    type="datetime-local"
                    id="dueDate"
                    value={form.dueDate}
                    onChange={(e) => updateForm({ dueDate: e.target.value })}
                />
            {/* Conditionally render recurrence fields based on the checkbox */}
            {showRecurrenceFields ? (
                <>
                    <label htmlFor="recurrenceInterval">Recurrence Interval: </label>
                    <input
                        type="text"
                        id="recurrenceInterval"
                        value={form.recurrenceInterval}
                        onChange={(e) => updateForm({ recurrenceInterval: e.target.value })}
                    />
                    <label htmlFor="recurrenceCount">Recurrence Count: </label>
                    <input
                        type="text"
                        id="recurrenceCount"
                        value={form.recurrenceCount}
                        onChange={(e) => updateForm({ recurrenceCount: e.target.value })}
                    />
                </>
            ) : null}
                <button type="submit">
                    Submit Edit to Task
                </button>
            </form>
        </motion.div>
    );
}