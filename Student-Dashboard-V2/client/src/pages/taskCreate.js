import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useTheme } from "../context/theme/ThemeContext";
import { useAuth } from "../context/authentication/AuthContext";
import "../styles/tasks.css";

export default function CreateTask() {
    const { currentTheme } = useTheme();
    const { userData } = useAuth();
    const isLoggedIn = !!userData;

    const [form, setForm] = useState({
        category: "General",
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
        recurrenceCount: 0,
        user: isLoggedIn ? userData.name : "",
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

    const navigate = useNavigate();
    const [showRecurrenceFields, setShowRecurrenceFields] = useState(false); // New state variable

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        await fetch("https://student-dasboard.onrender.com/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        setForm({
            category: "General",
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
            recurrenceCount: 0,
        });
        setShowRecurrenceFields(false); // Hide recurrence fields
        console.log(form);
        navigate("/Student-Dashboard-V2/client/tasks");
    }

    // TODO: Set defaults for recurrenceInterval to "Sun, Mon, Tue, Wed, Thu, Fri", startDate to today at 12 am, dueDate to today at 11:59 pm
    // This following section will display the form that takes the input from the user.
    return (
        <motion.div
            className="task-create-container"
            style={currentTheme}
            key='task-create'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
        >
            <h3>Create a new task</h3>
            <form onSubmit={onSubmit}>
                <label htmlFor="category">Category: </label>
                <div className="chip-container">
                    {defaultTags.map((tag) => (
                        <div 
                            className={`tag ${
                                selectedTag === tag ? "selected" : ""
                            }`} 
                            key={tag} 
                            onClick={() => handleTagSelect(tag)}
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
                    checked={form.isArchived}
                    onChange={(e) => {updateForm({ isArchived: e.target.checked })}}
                />
                <label htmlFor="isArchived">Archived</label>
                <input
                    type="checkbox"
                    id="isDeleted"
                    checked={form.isDeleted}
                    onChange={(e) => updateForm({ isDeleted: e.target.checked })}
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
                        type="number"
                        id="recurrenceCount"
                        value={form.recurrenceCount}
                        onChange={(e) => updateForm({ recurrenceCount: e.target.value })}
                    />
                </>
            ) : null}
                <button type="submit">
                    Create Task
                </button>
            </form>
        </motion.div>
    );
}