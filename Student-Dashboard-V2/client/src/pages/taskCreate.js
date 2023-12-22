import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../context/theme/ThemeContext";
import "../styles/tasks.css";

export default function CreateTask() {
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
        recurrence: "",
        recurrenceInterval: "",
        recurrenceEndDate: "",
        recurrenceCount: "",
        recurrenceDays: "",
        recurrenceWeeks: "",
        recurrenceMonths: "",
        recurrenceYears: "",
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
    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
        updateForm(prev => ({ ...prev, category: tag }));
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

        //When a post request is sent to the create url, we'll add a new task to the database.
        const newTask = { 
            ...form,
            isArchived: form.isArchived === "on", // Convert checkbox value to boolean
            isDeleted: form.isDeleted === "on", // Convert checkbox value to boolean
            isRecurring: form.isRecurring === "on", // Convert checkbox value to boolean
        };

        await fetch("http://localhost:5050/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        setForm({
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
            recurrence: "",
            recurrenceInterval: "",
            recurrenceEndDate: "",
            recurrenceCount: "",
            recurrenceDays: "",
            recurrenceWeeks: "",
            recurrenceMonths: "",
            recurrenceYears: "",
        });
        setShowRecurrenceFields(false); // Hide recurrence fields
        navigate("/tasks");
    }

    // Toggle the visibility of recurrence fields when the checkbox changes
    function handleRecurringCheckboxChange(category) {
        if (category === "Habit") {
            setForm({
                ...form,
                isRecurring: true,
            })
            setShowRecurrenceFields(true);
        } else {
            setForm((prev) => ({
                ...prev,
                isRecurring: false,
                recurrence: "",
                recurrenceInterval: "",
                recurrenceEndDate: "",
                recurrenceCount: "",
                recurrenceDays: "",
                recurrenceWeeks: "",
                recurrenceMonths: "",
                recurrenceYears: "",
            }));
            setShowRecurrenceFields(false);
        }
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div
            className="task-create-container"
            style={currentTheme}
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
                            onLoad={handleRecurringCheckboxChange}
                            onClick={() => {
                                handleTagSelect(tag); 
                                handleRecurringCheckboxChange(tag);
                            }}
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
                    <label htmlFor="recurrence">Recurrence: </label>
                    <input
                        type="text"
                        id="recurrence"
                        value={form.recurrence}
                        onChange={(e) => updateForm({ recurrence: e.target.value })}
                    />
                    <label htmlFor="recurrenceInterval">Recurrence Interval: </label>
                    <input
                        type="text"
                        id="recurrenceInterval"
                        value={form.recurrenceInterval}
                        onChange={(e) => updateForm({ recurrenceInterval: e.target.value })}
                    />
                    <label htmlFor="recurrenceEndDate">Recurrence End Date: </label>
                    <input
                        type="datetime-local"
                        id="recurrenceEndDate"
                        value={form.recurrenceEndDate}
                        onChange={(e) => updateForm({ recurrenceEndDate: e.target.value })}
                    />
                    <div className="recurrence-container">
                    <div className="recurrence">
                    <label htmlFor="recurrenceCount">Recurrence Count: </label>
                    <br/>
                    <input
                        type="text"
                        id="recurrenceCount"
                        value={form.recurrenceCount}
                        onChange={(e) => updateForm({ recurrenceCount: e.target.value })}
                    />
                    </div>
                    <div className="recurrence">
                    <label htmlFor="recurrenceDays">Recurrence Days: </label>
                    <br/>
                    <input
                        type="text"
                        id="recurrenceDays"
                        value={form.recurrenceDays}
                        onChange={(e) => updateForm({ recurrenceDays: e.target.value })}
                    />
                    </div>
                    <div className="recurrence">
                    <label htmlFor="recurrenceWeeks">Recurrence Weeks: </label>
                    <br/>
                    <input
                        type="text"
                        id="recurrenceWeeks"
                        value={form.recurrenceWeeks}
                        onChange={(e) => updateForm({ recurrenceWeeks: e.target.value })}
                    />
                    </div>
                    <div className="recurrence">
                    <label htmlFor="recurrenceMonths">Recurrence Months: </label>
                    <br/>
                    <input
                        type="text"
                        id="recurrenceMonths"
                        value={form.recurrenceMonths}
                        onChange={(e) => updateForm({ recurrenceMonths: e.target.value })}
                    />
                    </div>
                    <div className="recurrence">
                    <label htmlFor="recurrenceYears">Recurrence Years: </label>
                    <br/>
                    <input
                        type="text"
                        id="recurrenceYears"
                        value={form.recurrenceYears}
                        onChange={(e) => updateForm({ recurrenceYears: e.target.value })}
                    />
                    </div>
                    </div>
                </>
            ) : null}
                <button type="submit">
                    Create Task
                </button>
            </form>
        </div>
    );
}