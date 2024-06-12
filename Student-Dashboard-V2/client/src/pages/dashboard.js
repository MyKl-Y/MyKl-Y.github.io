// Dashboard.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/authentication/AuthContext';
import { useTheme } from '../context/theme/ThemeContext';
import '../styles/dashboard.css';
import { 
    ResponsiveContainer,
    Tooltip,
    Legend,
    Sector,
    Cell,

    Sankey,

    Pie,
    PieChart,
} from 'recharts'

// TODO: heat map, line graph, sankey diagram, pie chart, bar graph
/* TODO: Specific features to add to the dashboard:
    - Heat map
        - For tasks
    - Line graph
        - Grade history and prediction and GPA
    - DONE: Sankey diagram
        - Application status
    - Pie chart:
        - Tasks by status
        - DONE: Credits 
    - Bar graph:
        - Grade distribution
    - Text Display:
        - GPA 
        - Major & Minors
        - Expected Graduation Date
        - Number of tasks due today
    - Mini calendar
    - Upcoming 
    - Scatter plot:
        - Grades vs. subjects
*/

const Dashboard = () => {
    const { user } = useAuth();
    const isLoggedIn = !!user;
    const { currentTheme } = useTheme();
    const [courses, setCourses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (!isLoggedIn) return;
        axiosInstance.get(`/courses/user/${user.name}`)
            .then(response => setCourses(response.data))
            .catch(error => console.error(error));

        axiosInstance.get(`/task/user/${user.name}`)
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));

        axiosInstance.get(`/graduation/degree/user/${user.name}`)
            .then(response => setDegrees(response.data))
            .catch(error => console.error(error));

        axiosInstance.get(`/jobs/user/${user.name}`)
            .then(response => setJobs(response.data))
            .catch(error => console.error(error));
    }, [user, isLoggedIn]);

    function makeSankeyData() {
        let nodes = [
            { name: "Applied" },
            { name: "Pending" },
            { name: "Offered" },
            { name: "Rejected" },
            { name: "Declined" },
            { name: "Accepted" },
            { name: "Withdrawn" },
            { name: "Closed" }
        ];
        let links = [];

        jobs.forEach(job => {
            job.previousState.forEach((state, index) => {
                if (!nodes.find(node => node.name === state)) {
                    let idx = parseInt(state.split(" ")[1]);
                    nodes.splice(idx + 1, 0, { name: state });
                }
            });
        });

        jobs.forEach(job => {
            job.previousState.forEach((state, index) => {
                if (index < job.previousState.length - 1) {
                    const sourceIndex = nodes.findIndex(node => node.name === state);
                    const targetIndex = nodes.findIndex(node => node.name === job.previousState[index + 1]);
                    if (sourceIndex !== -1 && targetIndex !== -1) {
                        const existingLink = links.find(link => link.source === sourceIndex && link.target === targetIndex);
                        if (existingLink) {
                            existingLink.value += 1;
                        } else {
                            links.push({
                                source: sourceIndex,
                                target: targetIndex,
                                value: 1
                            });
                        }
                    }
                }
            });
        });

        return { nodes, links };
    }

    function makeDegreePieData() {
        let data = [];
        degrees.forEach(degree => {
            let totalCredits = degree.credits;
            let completedCredits = 0;
            degree.concentrations.forEach(concentration => {
                concentration.requirements.forEach(requirement => {
                    requirement.courses.forEach(course => {
                        if (course.is_complete) {
                            completedCredits += course.credits;
                        }
                    });
                });
            });
            data.push({
                name: degree.name,
                completed: completedCredits,
                remaining: totalCredits - completedCredits
            });
        });

        return data;
    }

    const degreePieData = makeDegreePieData();

    const COLORS = ['var(--add-primary)','var(--remove-primary)'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, degreeName }) => {
        return (
            <text x={cx} y={cy} fill="white" textAnchor={'middle'} dominantBaseline="central" style={
                {
                    fontSize: '14px',
                    fontWeight: 'bold',
                }
            }>
                {`${degreeName}`}
            </text>
        );
    };

    const renderCustomTooltip = ({ payload }) => {
        if (payload && payload.length) {
            return (
                <div className="custom-tooltip" style={
                    {
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: '5px',
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                    }
                
                } >
                    <p className='label' style={
                        {
                            color: 'black',
                            fontWeight: 'bold',
                            margin: '0',
                        }
                    } >{`${payload[0].name}: ${payload[0].value} credits`}</p>
                </div>
            );
        }
        return null;
    };


    return (
        <motion.div
            key='dashboard'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
            className='dashboard-container'
            style={currentTheme}
        >
            {isLoggedIn ? (
                <>
                    <h1>Welcome, {user.name}!</h1>
                    <ResponsiveContainer width='100%' height={300}>
                        <PieChart>
                            {degreePieData.map((degree, index) => (
                                <Pie
                                    key={index}
                                    data={[
                                        { name: 'Completed', value: degree.completed },
                                        { name: 'Remaining', value: degree.remaining }
                                    ]}
                                    nameKey='name'
                                    cx={`${100 / (degreePieData.length * 2) * ((index * degreePieData.length) + 1)}%`}
                                    cy='50%'
                                    innerRadius={90}
                                    outerRadius={140}
                                    fill="#8884d8"
                                    label={({ ...props }) => renderCustomizedLabel({ ...props, degreeName: degree.name })}
                                    labelLine={false}
                                    dataKey='value'
                                >
                                    {degreePieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                            ))}
                            <Tooltip content={renderCustomTooltip} />
                        </PieChart>
                        <Sankey
                            data={makeSankeyData()}
                        >
                            <Tooltip />
                        </Sankey>
                    </ResponsiveContainer>
                </>
            ) : (
                <>
                    <h1>Dashboard</h1>
                    <p>Log in to view your dashboard.</p>
                </>
            )}
        </motion.div>
    );
};

export default Dashboard;
