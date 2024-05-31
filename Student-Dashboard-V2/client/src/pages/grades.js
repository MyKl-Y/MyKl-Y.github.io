import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/theme/ThemeContext';
import '../styles/grades.css';
import axiosInstance from '../axiosConfig';

export default function Grades() {
    const { currentTheme } = useTheme();

    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [update, setUpdate] = useState({
        name: '',
        grade: '',
        weight: '',
        usePoints: false
    });

    useEffect(() => {
        axiosInstance.get('/courses')
            .then((res) => {
                setCourses(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    function deleteAssignment(courseId, assignmentId) {
        axiosInstance.delete(`/courses/${courseId}/assignments/${assignmentId}`)
            .then(() => {
                setCourses(courses.map(course => {
                    if (course._id === courseId) {
                        return {
                            ...course,
                            assignments: course.assignments.filter(assignment => assignment._id !== assignmentId)
                        };
                    }
                    return course;
                }));
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function updateAssignment(courseId, assignmentId, updates) {
        axiosInstance.patch(`/courses/${courseId}/assignments/${assignmentId}`, updates)
            .then(() => {
                setCourses(courses.map(course => {
                    if (course._id === courseId) {
                        return {
                            ...course,
                            assignments: course.assignments.map(assignment => {
                                if (assignment._id === assignmentId) {
                                    return { ...assignment, ...updates };
                                }
                                return assignment;
                            })
                        };
                    }
                    return course;
                }));
                setUpdate({
                    name: '',
                    grade: '',
                    weight: '',
                    usePoints: false
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function createAssignment(courseId, updates) {
        axiosInstance.post(`/courses/${courseId}/assignments`, { assignments: [updates], usePoints: updates.usePoints })
            .then((response) => {
                setCourses(courses.map(course => {
                    if (course._id === courseId) {
                        return {
                            ...course,
                            assignments: [...course.assignments, updates]
                        };
                    }
                    return course;
                }));
                setIsCreating(false);
                setUpdate({
                    name: '',
                    grade: '',
                    weight: '',
                    usePoints: false
                });
            })
            .catch(error => console.error(error));
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='grades-container'
            style={currentTheme}
        >
            <input type='text' placeholder='Search for a course...'
                value={search} onChange={e => setSearch(e.target.value)}
            />
            <div className='grade-list'>
                {courses.map(course => (
                    (course.courseName.toLowerCase().includes(search.toLowerCase()) || course.courseNumber.toLowerCase().includes(search.toLowerCase()))
                    &&
                    <div className='course-grade' key={course._id}>
                        <h3 onClick={
                            () => {
                                selectedCourse === course._id ? setSelectedCourse(null) : setSelectedCourse(course._id);
                                setSelectedAssignment(null);
                                setIsCreating(false);
                                setIsUpdating(false);
                            }
                        }><b>{course.courseNumber}</b> - {course.courseName}</h3>
                        {selectedCourse === course._id && (
                            <ul>
                                {course.assignments.length > 0 ? (
                                    (course.assignments.map(assignment => (
                                        <li key={assignment._id}>
                                            {selectedAssignment === assignment._id && isUpdating ? (
                                                <div>
                                                    <input type='text' placeholder='Name' value={update.name} onChange={
                                                        e => setUpdate({ ...update, name: e.target.value })
                                                    } defaultValue={assignment.name} />
                                                    <input type='text' placeholder='Grade' value={update.grade} onChange={
                                                        e => setUpdate({ ...update, grade: e.target.value })
                                                    } defaultValue={assignment.grade} />
                                                    <input type='text' placeholder='Weight/Points' value={update.weight} onChange={
                                                        e => setUpdate({ ...update, weight: e.target.value })
                                                    } defaultValue={assignment.weight} />
                                                    <label>
                                                        <input type='checkbox' checked={update.usePoints} onChange={
                                                            e => setUpdate({ ...update, usePoints: e.target.checked })
                                                        } />
                                                        Use Weight (%) Instead of Points (pts)
                                                    </label>
                                                    <button className='save' onClick={
                                                        () => {
                                                            updateAssignment(course._id, assignment._id, update);
                                                            setIsUpdating(false);
                                                        }
                                                    }>Save</button>
                                                    <button className='cancel' onClick={
                                                        () => {
                                                            setIsUpdating(false);
                                                            setUpdate({
                                                                name: '',
                                                                grade: '',
                                                                weight: '',
                                                                usePoints: false
                                                            });
                                                        }
                                                    }>Cancel</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div onClick={
                                                        () => {
                                                            setSelectedAssignment(selectedAssignment === assignment._id ? null : assignment._id);
                                                            if (selectedAssignment !== assignment._id) {
                                                                setUpdate({
                                                                    name: assignment.name,
                                                                    grade: assignment.grade,
                                                                    weight: assignment.weight,
                                                                    usePoints: assignment.usePoints
                                                                });
                                                            }
                                                        }
                                                    }>
                                                        <h4>{assignment.name}</h4>
                                                        <p>Grade: {assignment.grade}</p>
                                                        <p>{!assignment.usePoints ? `Points: ${assignment.weight} pts` : `Weight: ${assignment.weight}%`}</p>
                                                    </div>
                                                    {selectedAssignment === assignment._id && !isUpdating && (
                                                        <>
                                                            <button className='delete' onClick={
                                                                () => deleteAssignment(course._id, assignment._id)
                                                            }>Delete</button>
                                                            <button className='update' onClick={
                                                                () => setIsUpdating(true)
                                                            }>Update</button>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </li>
                                    )))
                                ) : (
                                    <li>
                                        <p>No assignments found for this course.</p>
                                    </li>
                                )}
                                {isCreating && (
                                    <div>
                                        <input type='text' placeholder='Name' value={update.name} onChange={
                                            e => setUpdate({ ...update, name: e.target.value })
                                        } />
                                        <input type='text' placeholder='Grade' value={update.grade} onChange={
                                            e => setUpdate({ ...update, grade: e.target.value })
                                        } />
                                        <input type='text' placeholder='Weight/Points' value={update.weight} onChange={
                                            e => setUpdate({ ...update, weight: e.target.value })
                                        } />
                                        <label>
                                            <input type='checkbox' checked={update.usePoints} onChange={
                                                e => setUpdate({ ...update, usePoints: e.target.checked })
                                            } />
                                            Use Weight (%) Instead of Points (pts)
                                        </label>
                                        <button className='save' onClick={
                                            () => createAssignment(course._id, update)
                                        }>Save</button>
                                        <button className='cancel' onClick={
                                            () => {
                                                setIsCreating(false);
                                                setUpdate({
                                                    name: '',
                                                    grade: '',
                                                    weight: '',
                                                    usePoints: false
                                                });
                                            }
                                        }>Cancel</button>
                                    </div>
                                )}
                                <button className='add' onClick={
                                    () => setIsCreating(true)
                                }>Add Assignment</button>
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
