import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Job(props) {
    const [form, setForm] = useState({
        name: props.job.name || "",
        company: props.job.company || "",
        type: props.job.type || "",
        role: props.job.role || "",
        format: props.job.format || "",
        location: props.job.location || "",
        status: props.job.status || "",
        response: props.job.response || "",
        description: props.job.description || "",
        deadline: props.job.deadline || "",
        appliedDate: props.job.appliedDate || "",
        salary: props.job.salary || "",
        hours: props.job.hours || "",
        benefits: props.job.benefits || "",
        requirements: props.job.requirements || "",
        source: props.job.source || "",
        contact: props.job.contact || "",
        notes: props.job.notes || "",
        startDate: props.job.startDate || "",
    });

    const [selectedStatus, setSelectedStatus] = useState(props.job.status || "Not Started");
    const statusOptions = [
        "Applied",
        "In Progress",
        "Not Started",
    ];

    function handleStatusSelect(status) {
        setSelectedStatus(status);
    }

    const [selectedResponse, setSelectedResponse] = useState(props.job.response || "Pending");
    const responseOptions = [
        "Pending",
        "Interview",
        "Accepted",
        "Hired",
        "Offered",
        "Rejected",
        "Declined",
        "Closed",
        "Withdrawn",
    ];

    function handleResponseSelect(response) {
        setSelectedResponse(response);
    }

    const [selectedType, setSelectedType] = useState(props.job.type || "Job");
    const typeOptions = [
        "Job",
        "Internship",
        "Co-op",
        "Volunteer",
        "Freelance",
    ];

    function handleTypeSelect(type) {
        setSelectedType(type);
    }

    const [selectedRole, setSelectedRole] = useState(props.job.role || "Full-time");
    const roleOptions = [
        "Full-time",
        "Part-time",
        "Contract",
        "Temporary",
        "Seasonal",
    ];

    function handleRoleSelect(role) {
        setSelectedRole(role);
    }

    const [selectedFormat, setSelectedFormat] = useState(props.job.format || "On-site");
    const formatOptions = [
        "On-site",
        "Remote",
        "Hybrid",
    ];

    function handleFormatSelect(format) {
        setSelectedFormat(format);
    }

    function updateForm(data) {
        setForm({ ...form, ...data });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const updatedJob = {
            ...form,
            status: selectedStatus,
            response: selectedResponse,
            type: selectedType,
            role: selectedRole,
            format: selectedFormat,
        };
        const response = await fetch(`http://localhost:5050/jobs/${props.job === 'add' && !props.isEditing ? '' : props.job._id}`, {
            method: `${props.job === 'add' && !props.isEditing ? 'POST' : 'PATCH'}`,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedJob),
        });

        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            console.log(message);
            return;
        }

        props.setShowCreateJob(false);
        props.setIsEditing(false);
        props.setSelectedJob(null);
        if (props.job === 'add') {
            props.setJobs([...props.jobs, updatedJob]);
        } else {
            const newJobs = props.jobs.map((job) => {
                if (job._id === props.job._id) {
                    return updatedJob;
                }
                return job;
            });
            props.setJobs(newJobs);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
            className="job-container"
            key={props.job._id}
        >
            {(props.isEditing && props.selectedJob === props.job._id) || props.job === 'add' ? (
                <form onSubmit={onSubmit}>
                    <div className="job-top">
                        <div className="job-header-container">
                            <h3 className="job-header">
                                <input
                                    type="text"
                                    placeholder="Job Name"
                                    value={form.name}
                                    onChange={(e) => updateForm({ name: e.target.value })}
                                    required
                                />
                                @
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={form.company}
                                    onChange={(e) => updateForm({ company: e.target.value })}
                                    required
                                />
                            </h3>
                            <p className="job-sub-header">
                                <select
                                    value={selectedType}
                                    onChange={(e) => handleTypeSelect(e.target.value)}
                                    required
                                >
                                    {typeOptions.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                |
                                <select
                                    value={selectedRole}
                                    onChange={(e) => handleRoleSelect(e.target.value)}
                                    required
                                >
                                    {roleOptions.map((role) => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                                |
                                <select
                                    value={selectedFormat}
                                    onChange={(e) => handleFormatSelect(e.target.value)}
                                    required
                                >
                                    {formatOptions.map((format) => (
                                        <option key={format} value={format}>{format}</option>
                                    ))}
                                </select>
                                |
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={form.location}
                                    onChange={(e) => updateForm({ location: e.target.value })}
                                    required
                                />
                            </p>
                        </div>
                        <h5 className="job-status">
                            <select
                                value={selectedStatus}
                                onChange={(e) => handleStatusSelect(e.target.value)}
                                required
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            &rarr; 
                            <select
                                value={selectedResponse}
                                onChange={(e) => handleResponseSelect(e.target.value)}
                                required
                            >
                                {responseOptions.map((response) => (
                                    <option key={response} value={response}>{response}</option>
                                ))}
                            </select>
                        </h5>
                    </div>
                    <div className="job-body">
                        <textarea
                            placeholder="Job Description"
                            value={form.description}
                            onChange={(e) => updateForm({ description: e.target.value })}
                        />
                        <ul>
                            <li><b>Deadline</b>: 
                                <input
                                    type="date"
                                    value={form.deadline}
                                    onChange={(e) => updateForm({ deadline: e.target.value })}
                                /> 
                                &rarr; 
                                <b> Applied on</b>:
                                <input
                                    type="date"
                                    value={form.appliedDate}
                                    onChange={(e) => updateForm({ appliedDate: e.target.value })}
                                    required
                                />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    placeholder="Salary (also include currency symbol and frequency)"
                                    value={form.salary}
                                    onChange={(e) => updateForm({ salary: e.target.value })}
                                />
                                for
                                <input
                                    type="text"
                                    placeholder="Hours"
                                    value={form.hours}
                                    onChange={(e) => updateForm({ hours: e.target.value })}
                                />
                                hours/week with
                                <input
                                    type="text"
                                    placeholder="Benefits"
                                    value={form.benefits}
                                    onChange={(e) => updateForm({ benefits: e.target.value })}
                                />
                            </li>
                            <li><b>Requirements</b>: 
                                <input
                                    type="text"
                                    placeholder="Requirements"
                                    value={form.requirements}
                                    onChange={(e) => updateForm({ requirements: e.target.value })}
                                />
                            </li>
                            <li><b>Found on</b>: 
                                <input
                                    type="text"
                                    placeholder="Source Link"
                                    value={form.source}
                                    onChange={(e) => updateForm({ source: e.target.value })}
                                    required
                                />
                            </li>
                            <li><b>Contact</b>: 
                                <input
                                    type="text"
                                    placeholder="Contact"
                                    value={form.contact}
                                    onChange={(e) => updateForm({ contact: e.target.value })}
                                />
                            </li>
                            <li><b>Notes</b>:
                                <textarea
                                    placeholder="Notes"
                                    value={form.notes}
                                    onChange={(e) => updateForm({ notes: e.target.value })}
                                />
                            </li>
                            <li><b>Start Date</b>:
                                <input
                                    type="date"
                                    value={form.startDate}
                                    onChange={(e) => updateForm({ startDate: e.target.value })}
                                />
                            </li>
                        </ul>
                        <button type="submit">Save Job</button>
                        <button onClick={() => props.setIsEditing(false)}>Cancel</button>
                    </div>
                </form>
            ) : ( 
                <div className="job-top" onClick={props.onClick}>
                    <div className="job-header-container">
                        <h3 className="job-header">
                            <u>{props.job.name}</u>
                            @
                            <i>{props.job.company}</i>
                        </h3>
                        <p className="job-sub-header"><b>{props.job.type}</b> | <b>{props.job.role}</b> | <b>{props.job.format}</b> ({props.job.location})</p>
                    </div>
                    <h5 className="job-status">
                        <b className={props.job.status}>{props.job.status}</b> 
                        &rarr; 
                        <i className={props.job.response}>{props.job.response}</i>
                    </h5>
                </div>
            )}
            {props.job !== 'add' && props.job !== 'edit' && !props.isEditing && props.selectedJob === props.job._id ? (
                <div className="job-body">
                    <p>"{props.job.description}"</p>
                    <ul>
                        <li><b>Deadline</b>: {props.job.deadline} &rarr; <b>Applied</b>: {props.job.appliedDate}</li>
                        <li>$<u className="job-salary">{props.job.salary}</u> for <b className="job-hours">{props.job.hours}</b> hours/week with <i>{props.job.benefits}</i></li>
                        <li><b>Requirements</b>: {props.job.requirements}</li>
                        <li><b>Found on</b>: <Link to={props.job.source} target="_blank" rel="noopener noreferrer" >This Link</Link></li>
                        <li><b>Contact</b>: {props.job.contact}</li>
                        <li><b>Notes</b>: "{props.job.notes}"</li>
                        <li><b>Start Date</b>: {props.job.startDate}</li>
                    </ul>
                    <button className="job-edit" onClick={() => props.setIsEditing(true)}>Edit</button>
                    <button className="job-delete" onClick={() => props.deleteJob(props.job._id)}>Delete</button>
                </div>
            ) : null}
        </motion.div>
    );
}
