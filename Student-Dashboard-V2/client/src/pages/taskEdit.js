import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router"
import "../styles/tasks.css"

export default function editTask() {
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
    const params = useParams();
    const navigate = useNavigate();

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
                navigate("/tasks");
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
            recurrenceEndDate: form.recurrenceEndDate,
            recurrenceCount: form.recurrenceCount,
            recurrenceDays: form.recurrenceDays,
            recurrenceWeeks: form.recurrenceWeeks,
            recurrenceMonths: form.recurrenceMonths,
            recurrenceYears: form.recurrenceYears,
        };

        await fetch(`http://localhost:5050/task/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedTask),
            headers: {
                "Content-Type": "application/json",
            },
        });

        navigate("/tasks");
    }

    // TODO: Category input using chips refer to courseEdit.js for help
    // This following section will display the form that takes input from the user to update the data.
    return (
        <div className="container">
            <h3>Edit Task</h3>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={form.description}
                        onChange={(e) => updateForm({ description: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dueDate">Due Date: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="dueDate"
                        value={form.dueDate}
                        onChange={(e) => updateForm({ dueDate: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="isCompleteNo"
                            value="No"
                            checked={form.isComplete === "No"}
                            onChange={(e) => updateForm({ isComplete: e.target.value })}
                        />
                        <label className="form-check-label" htmlFor="isCompleteNo">
                            No
                        </label>    
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="isCompleteYes"
                            value="Yes"
                            checked={form.isComplete === "Yes"}
                            onChange={(e) => updateForm({ isComplete: e.target.value })}
                        />
                        <label className="form-check-label" htmlFor="isCompleteYes">
                            Yes
                        </label>    
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="isCompleteIP"
                            value="IP"
                            checked={form.isComplete === "IP"}
                            onChange={(e) => updateForm({ isComplete: e.target.value })}
                        />
                        <label className="form-check-label" htmlFor="isCompleteIP">
                            In-Progress
                        </label>    
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="isCompleteNA"
                            value="NA"
                            checked={form.isComplete === "NA"}
                            onChange={(e) => updateForm({ isComplete: e.target.value })}
                        />
                        <label className="form-check-label" htmlFor="isCompleteNA">
                            Not Applicable
                        </label>    
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            type="number"
                            className="form-check-input"
                            id="priority"
                            value={form.priority}
                            onChange={(e) => updateForm({ priority: e.target.value })}
                        />
                        <label className="form-check-label" htmlFor="priority">
                            Priority
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="isArchived"
                            value={form.isArchived}
                            onChange={(e) => updateForm({ isArchived: e.target.value })}
                        />
                        <label className="form-check-label" htmlFor="isArchived">
                            Archived
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="isDeleted"
                            value={form.isDeleted}
                            onChange={(e) => updateForm({ isDeleted: e.target.value })}
                        />
                        <label className="form-check-label" htmlFor="isDeleted">
                            Deleted
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="isRecurring"
                            value={form.isRecurring}
                            onChange={(e) => updateForm({ isRecurring: e.target.value })}
                        />
                        <label className="form-check-label" htmlFor="isRecurring">
                            Recurring
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="recurrence">Recurrence: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="recurrence"
                        value={form.recurrence}
                        onChange={(e) => updateForm({ recurrence: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="recurrenceInterval">Recurrence Interval: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="recurrenceInterval"
                        value={form.recurrenceInterval}
                        onChange={(e) => updateForm({ recurrenceInterval: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="recurrenceEndDate">Recurrence End Date: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="recurrenceEndDate"
                        value={form.recurrenceEndDate}
                        onChange={(e) => updateForm({ recurrenceEndDate: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="recurrenceCount">Recurrence Count: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="recurrenceCount"
                        value={form.recurrenceCount}
                        onChange={(e) => updateForm({ recurrenceCount: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="recurrenceDays">Recurrence Days: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="recurrenceDays"
                        value={form.recurrenceDays}
                        onChange={(e) => updateForm({ recurrenceDays: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="recurrenceWeeks">Recurrence Weeks: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="recurrenceWeeks"
                        value={form.recurrenceWeeks}
                        onChange={(e) => updateForm({ recurrenceWeeks: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="recurrenceMonths">Recurrence Months: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="recurrenceMonths"
                        value={form.recurrenceMonths}
                        onChange={(e) => updateForm({ recurrenceMonths: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="recurrenceYears">Recurrence Years: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="recurrenceYears"
                        value={form.recurrenceYears}
                        onChange={(e) => updateForm({ recurrenceYears: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
}