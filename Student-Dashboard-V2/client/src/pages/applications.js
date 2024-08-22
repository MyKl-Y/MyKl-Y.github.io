import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import Job from '../components/features/Jobs/Job'
import { useTheme } from "../context/theme/ThemeContext";
import { useAuth } from "../context/authentication/AuthContext";
import "../styles/jobs.css";

//TODO: Add semester showing based on start date

export default function Applications() {
    const { userData } = useAuth();
    const { currentTheme } = useTheme();
    const [jobs, setJobs] = useState([]); // New state variable
    const [showCreateJob, setShowCreateJob] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("name");

    // get all jobs
    useEffect(() => {
        if (!userData) return;
        async function getJobs() {
            const response = await fetch(`http://https://student-dashboard.onrender.com/jobs/user/${userData.name}`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const jobs = await response.json();
            setJobs(jobs);
        }

        if (jobs.length === 0) {
            getJobs();
        }

        return;
    }, [userData, jobs])

    // Filtering function
    function filterJobs(job) {
        if (!filter) return true;
        return job.company.toLowerCase().includes(filter.toLowerCase()) ||
            job.name.toLowerCase().includes(filter.toLowerCase()) ||
            job.status.toLowerCase().includes(filter.toLowerCase());
    }


    // Sorting function
    function sortJobs(a, b) {
        const isAsc = sortOrder === "asc";
        let comparison = 0;
    
        if (sortBy === "name") {
            comparison = a.name.localeCompare(b.name);
        } else if (sortBy === "company") {
            comparison = a.company.localeCompare(b.company);
        } else if (sortBy === "appliedDate") {
            comparison = new Date(a.appliedDate) - new Date(b.appliedDate);
        } else if (sortBy === "startDate") {
            comparison = new Date(a.startDate) - new Date(b.startDate);
        }
    
        return isAsc ? comparison : -comparison;
    }
    

    function jobList() {
        return jobs.filter(filterJobs).sort(sortJobs).map(job => {
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
        await fetch(`http://https://student-dashboard.onrender.com/jobs/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: userData.name }),
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
            className='job-list-container'
        >
            <div className="job-list-buttons">
                <button className="create-job" onClick={() => setShowCreateJob(!showCreateJob)}>
                    Create Job
                </button>
                <input
                    type="text"
                    className='filter-jobs'
                    placeholder="Filter jobs"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <select className='sortBy-jobs' onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                    <option value="name">Sort by Name</option>
                    <option value="company">Sort by Company</option>
                    <option value="appliedDate">Sort by Applied Date</option>
                    <option value="startDate">Sort by Start Date</option>
                </select>
                <select className='sortOrder-jobs' onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                    <option value="asc">Sort Ascending</option>
                    <option value="desc">Sort Descending</option>
                </select>
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