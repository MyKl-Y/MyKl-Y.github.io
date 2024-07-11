// Dashboard.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import axiosInstance from '../axiosConfig';
import { useTheme } from '../context/theme/ThemeContext';
import { useAuth } from '../context/authentication/AuthContext';
import { useSettings } from '../context/settings/SettingsContext';
import '../styles/dashboard.css';
import { 
    ResponsiveContainer,
    Tooltip,
    Legend,
    //Sector,
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
        - GPA over time (by semester)
    - DONE: Sankey diagram
        - DONE: Application status
    - DONE: Pie chart:
        - DONE: Tasks by status
        - DONE: Tasks by category
        - DONE: Credits 
    - Bar graph:
        - Grade distribution
    - Text Display:
        - DONE: GPA 
        - DONE: Major & Minors
        - DONE: Expected Graduation Date
        - Number of tasks due today
    - Mini calendar
    - Upcoming 
    - Scatter plot:
        - Grades vs. subjects
*/

const Dashboard = (props) => {
    const { userData } = useAuth();
    const isLoggedIn = !!userData;
    const { currentTheme } = useTheme();
    const { getGrade } = useSettings();

    const [courses, setCourses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [jobs, setJobs] = useState([]);

    const [gpa, setGpa] = useState(0);

    const [graduationDate, setGraduationDate] = useState(null);

    useEffect(() => {
        function calculateGPA() {
            let weightedGradesSum = 0;
            let totalCredits = 0;
            courses.forEach(course => {
                if (course.assignments.length > 0) {
                    totalCredits += parseInt(course.creditHours);
                    let grades = 0;
                    course.assignments.forEach(assignment => {
                        if (!assignment.usePoints) {
                            grades += (assignment.grade / assignment.weight) * 100;
                        } else {
                            grades += (assignment.grade / 100) * assignment.weight;
                        }
                    });
                    weightedGradesSum += getGrade(grades) * course.creditHours;
                }
            });
            setGpa(weightedGradesSum / totalCredits);
        }

        function calculateGraduationDate() {
            let credits = 0;
            const completedCourses = new Set();
            let degreeCredits = [];

            degrees.forEach(degree => {
                if (degree.type.toLowerCase() === 'minor' || !userData.majors.find(e => e === degree._id)) return;
                degree.concentrations.forEach(concentration => {
                    concentration.requirements.forEach(requirement => {
                        requirement.courses.forEach(course => {
                            if (course.is_complete && !completedCourses.has(course.code)) {
                                completedCourses.add(course.code);
                                credits += course.credits;
                            }
                        });
                    });
                });
                degreeCredits.push({ credits, name: degree.name, type: degree.type});
                credits = 0;
            });

            let creditsLeft = [];
            let currentYear = new Date().getFullYear();

            degreeCredits.forEach(degree => {
                let upperBound = 0;
                let lowerBound = 0;
                let semestersLeftUpper = Math.ceil(degree.credits / 21);
                let semestersLeftLower = Math.ceil(degree.credits / 16.5);
                let upperYears = Math.floor(semestersLeftUpper / 2);
                let lowerYears = Math.floor(semestersLeftLower / 2);

                upperBound = `${semestersLeftUpper % 2 === 1 ? 'Fall' : 'Spring'} ${currentYear + upperYears}`;
                lowerBound = `${semestersLeftLower % 2 === 1 ? 'Fall' : 'Spring'} ${currentYear + lowerYears}`;

                creditsLeft.push({upperBound: upperBound, lowerBound: lowerBound, name: degree.name, type: degree.type});
            });

            setGraduationDate(creditsLeft);
        }

        if (!isLoggedIn) return;
        if (courses.length === 0) {
            axiosInstance.get(`/courses/user/${userData.name}`)
                .then(response => setCourses(response.data))
                .catch(error => console.error(error));
        }
        if (tasks.length === 0) {
            axiosInstance.get(`/task/user/${userData.name}`)
                .then(response => setTasks(response.data))
                .catch(error => console.error(error));
        }
        if (degrees.length === 0) {
            axiosInstance.get(`/graduation/degree/user/${userData.name}`)
                .then(response => setDegrees(response.data))
                .catch(error => console.error(error));
        }
        if (jobs.length === 0) {
        axiosInstance.get(`/jobs/user/${userData.name}`)
            .then(response => setJobs(response.data))
            .catch(error => console.error(error));
        }

        calculateGPA();
        calculateGraduationDate();
    }, [userData, isLoggedIn, gpa, getGrade, courses, tasks, degrees, jobs]);

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
            if (degree.type.toLowerCase() === 'minor') return;
            let totalCredits = degree.credits;
            let completedCredits = 0;
            const completedCourses = new Set();
            degree.concentrations.forEach(concentration => {
                concentration.requirements.forEach(requirement => {
                    requirement.courses.forEach(course => {
                        if (course.is_complete && !completedCourses.has(course.code)) {
                            completedCourses.add(course.code);
                            completedCredits += course.credits;
                        }
                    });
                });
            });
            data.push({
                name: degree.name,
                completed: completedCredits,
                remaining: totalCredits - completedCredits,
                _id: degree._id
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

    function getDegrees() {
        let majors = [];
        let minors = [];
        let minorCount = 0;
        let majorCount = 0;
        let returnVal = [];
        degrees.filter(degree => {
            if (degree.type.toLowerCase() === 'minor' && userData.minors.find(e => e === degree._id)) minors.push(degree) && minorCount++;
            else if (userData.majors.find(e => e === degree._id)) majors.push(degree) && majorCount++;
            return null;
        });
        if (majorCount > 0) {
            returnVal.push(<p><b>{majorCount > 1 ? 'Majors' : 'Major'}</b>: {majors.map((major, index) => <span key={index}>{major.name}{index < majorCount - 1 ? ', ' : ''}</span>)}</p>);
        }
        if (minorCount > 0) {
            returnVal.push(<p><b>{minorCount > 1 ? "Minors" : "Minor"}</b>: {minors.map((minor, index) => <span key={index}>{minor.name}{index < minorCount - 1 ? ', ' : ''}</span>)}</p>);
        }

        return returnVal;
    };

    const taskColors = {
        "In Progress": "var(--primary)",
        "Complete": "var(--add-primary)",
        "Incomplete": "var(--remove-primary)",
        "Not Applicable": "grey",
        "General": "#FF003F",
        "Habit": "#3EB489",
        "Homework": "#0F52BA",
        "Project": "#0080FF",
        "Quiz": "#6593F5",
        "Exam": "#588BAE",
        "Paper": "#73C2FB",
        "Presentation": "#BAE1FF",
        "School": "#DC6601",
        "Work": "#FFDB58",
        "Event": "#9966CB",
        "Other": "#8C92AC",
    };
    function makeTaskPieData() {
        let data = [];
        let statusData = [];
        let categoryData = [];
        let statuses = ["IP", "Yes", "No", ""];
        let tags = [
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
        ]
        let statusNames = {
            "IP": "In Progress",
            "Yes": "Complete",
            "No": "Incomplete",
            "": "Not Applicable"
        }

        statuses.forEach(status => {
            let count = 0;
            tasks.forEach(task => {
                if (task.isComplete === status) {
                    count++;
                }
            });
            statusData.push({
                name: statusNames[status],
                value: count
            });
        });

        tags.forEach(tag => {
            let count = 0;
            tasks.forEach(task => {
                if (task.category === tag) {
                    count++;
                }
            });
            categoryData.push({
                name: tag,
                value: count
            });
        });

        data.push(statusData);
        data.push(categoryData);
        return data;
    };
    const taskPieData = makeTaskPieData();

    function makeAbbr(str) {
        let words = str.split(/\s+/);
        let abbreviation = '';
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            if (word !== '' && /^[A-Z][a-z]*$/.test(word)) {
                abbreviation += (words[i][0] + ".");
            }
        }
        return abbreviation.toUpperCase();
    }

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
                    <h1>Welcome, {userData.name}!</h1>
                    <>
                        {getDegrees()}
                    </>
                    <>
                        <p><b>GPA</b>: {gpa.toFixed(2)}</p>
                    </>
                    <>
                        <p><b>Expected Graduation Date</b>: {graduationDate ? graduationDate.map((degree, index) => <span key={index}>{makeAbbr(degree.type)} {degree.name}: {degree.upperBound} - {degree.lowerBound}{index < graduationDate.length - 1 ? ', ' : ''}</span>) : 'N/A'}</p>
                    </>
                    <ResponsiveContainer width='100%' height={300}>
                        {taskPieData.map((task, index) => (
                            <PieChart>
                                <Pie
                                    key={index}
                                    data={
                                        task
                                    }
                                    nameKey='name'
                                    //cx={`${100 / (taskPieData.length * 2) * ((index * taskPieData.length) + 1)}%`}
                                    cx='50%'
                                    cy='50%'
                                    fill="#8884d8"
                                    dataKey='value'
                                >
                                    {task.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={taskColors[entry.name]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        ))}
                        <PieChart>
                            {degreePieData.map((degree, index) => (
                                userData.majors.find(e => e === degree._id) || userData.minors.find(e => e === degree._id)
                            ) ? (
                                <Pie
                                    key={index}
                                    data={[
                                        { name: 'Completed', value: degree.completed },
                                        { name: 'Remaining', value: degree.remaining }
                                    ]}
                                    nameKey='name'
                                    cx={`${userData.majors.length > 1 ? 25 + 50 * index : 50}%`}
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
                            ) : null)}
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
