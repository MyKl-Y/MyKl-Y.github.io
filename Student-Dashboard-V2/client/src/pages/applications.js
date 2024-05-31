import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import Job from '../components/features/Jobs/Job'
import { useTheme } from "../context/theme/ThemeContext";
import "../styles/jobs.css";

//TODO: Add filtering and sorting
//TODO: Add semester showing based on start date

export default function Applications() {
    const { currentTheme } = useTheme();
    const [jobs, setJobs] = useState([]); // New state variable
    const [showCreateJob, setShowCreateJob] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // get all jobs
    useEffect(() => {
        async function getJobs() {
            const response = await fetch("http://localhost:5050/jobs/");

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const jobs = await response.json();
            setJobs(jobs);
        }

        getJobs();

        return;
    }, [])

    function jobList() {
        return jobs.map(job => {
            return (
                <Job
                    job={job}
                    setJobs={setJobs}
                    jobs={jobs}
                    selectedJob={selectedJob}
                    setSelectedJob={setSelectedJob}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    onClick={() => selectedJob === job._id ? setSelectedJob(null) : setSelectedJob(job._id)}
                    deleteJob={deleteJob}
                    setShowCreateJob={setShowCreateJob}
                />
            )
        })
    }

    async function deleteJob(id) {
        await fetch(`http://localhost:5050/jobs/${id}`, {
            method: "DELETE",
        });

        const newJobs = jobs.filter((el) => el._id !== id);
        setJobs(newJobs);
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
            style={currentTheme}
        >
            <div className="job-list-buttons">
                <button className="create-job" onClick={() => setShowCreateJob(!showCreateJob)}>
                    Create Job
                </button>
            </div>
            {showCreateJob ? (
                <Job 
                    job="add"
                    setShowCreateJob={setShowCreateJob}
                    selectedJob={selectedJob}
                    setSelectedJob={setSelectedJob}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    onClick={null}
                    deleteJob={deleteJob}
                    setJobs={setJobs}
                    jobs={jobs}
                />
            ) : null}
            <div className="job-list">
                {jobList()}
            </div>
        </motion.div>
    );
};