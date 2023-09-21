import React, { useEffect, useState } from "react";
//import { useAuth } from "../context/AuthContext";
import { useTheme } from '../context/ThemeContext';
import CourseCreate from "./courseCreate";
import CourseEdit from "./courseEdit";
import { 
    FaTrashAlt,
    FaEdit,
    FaFolderPlus,
} from 'react-icons/fa';
import "./courseList.css";

function Courses() {
    const { isDarkMode } = useTheme();

    const componentStyle = {
        '--background': 
            isDarkMode ? 
            'linear-gradient(60deg, rgba(84,58,183,1) -100%, rgba(0,172,193,1) 200%)' : 
            'linear-gradient(60deg, rgb(53, 29, 150) -100%, rgb(1, 90, 102) 200%)',
        '--text-color': 
            !isDarkMode ? 
            'rgba(47,62,112,1)' : 
            'rgba(255,203,0, 1)',
        '--background-color': 
            !isDarkMode ? 
            'rgba(236,240,243, 1)' : 
            'rgba(12,15,19,1)',
        '--light-shadow': 
            !isDarkMode ? 
            '#fff' : 
            '#222',
        '--dark-shadow': 
            !isDarkMode ? 
            '#ccc' : 
            '#000',
        '--accent-gradient': 
            !isDarkMode ? 
            'linear-gradient(60deg, rgba(255,203,0,1) 0%, rgba(255,143,0,1) 100%)' : 
            'linear-gradient(60deg, rgba(47,62,112,1) 0%, rgba(255,255,255,1) 100%)',
        '--accent-light':
            isDarkMode ?
            'rgba(255,203,0,1)' :
            'rgba(47,62,112,1)',
        '--accent-dark':
            isDarkMode ?
            'rgba(255,143,0,1)' :
            'rgba(255,255,255,1)',
        '--primary':
            !isDarkMode ?
            'rgba(81, 101, 167, 1)':
            'rgba(255, 173, 0, 1)',
    };

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelect] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState("All Semesters"); // Track the selected semester
    //const { user } = useAuth();

    // Function to fetch courses from the backend
    const fetchCourses = async () => {
        try {
            const response = await fetch("http://localhost:5050/courses");
            if (!response.ok) {
                throw new Error("Failed to fetch courses");
            }
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error("Error fetching courses: ", error);
        }
    };

    useEffect(() => {
        // Fetch courses when the component mounts
        fetchCourses();
    }, []);

    // Function to add a new course
    const addCourse = async (newCourse) => {
        try {
            const response = await fetch("http://localhost:5050/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCourse),
            });
            if (!response.ok) {
                throw new Error("Failed to create course");
            }
            const createdCourse = await response.json();
            setCourses((prevCourses) => [...prevCourses, createdCourse]);

            // Delay for 2 seconds, then reload the page on success
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error("Error creating course: ", error);
        }
    };

    // Function to update an existing course
    const updateCourse = async (editedCourse) => {
        try {
            const response = await fetch(`http://localhost:5050/courses/${editedCourse._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify(editedCourse),
            });
            if (!response.ok) {
                throw new Error("Failed to update course");
            }
            const updatedCourse = await response.json();
            setCourses((prevCourses) =>
                prevCourses.map((course) => 
                    course._id === updatedCourse._id ? updatedCourse : course
                )
            );
            setSelect(null);

            // Delay for 2 seconds, then reload the page on success
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error("Error updating course: ", error);
        }
    };

    // Function to delete a course
    const deleteCourse = (courseId) => {
        // Optimistically update the UI by removing the course from the list
        const updatedCourses = courses.filter((course) => course._id !== courseId);
        setCourses(updatedCourses);

        // Make the DELETE request
        fetch(`http://localhost:5050/courses/${courseId}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                // Check if the delete operation was successful
                if (data.success) {
                    // Course was successfully deleted on the server
                    // No further action needed in this case
                    // Delay for 2 seconds, then reload the page on success
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    // If there was an error, revert the UI to the previous state
                    setCourses((prevCourses) => [...prevCourses, { _id: courseId, ...data.course }]);
                }
            })
            .catch((error) => {
                console.error("Error deleting course:", error);
                // If there was an error with the request, revert the UI to the previous state
                setCourses((prevCourses) => [...prevCourses, { _id: courseId }]);
            });
    };

    // Function to select a course
    const selectCourse = (courseId) => {
        setSelect(courseId);
    };

    // Function to deselect a course
    const deselectCourse = () => {
        setSelect(null);
    };

    // Group courses by semester
    const groupedCourses = courses.reduce((acc, course) => {
        if (!acc[course.semester]) {
            acc[course.semester] = [];
        }
        acc[course.semester].push(course);
        return acc;
    }, {});

    const semesterOptions = [
        "All Semesters", 
        "Fall 2022",
        "Spring 2023",
        "Summer 2023",
        "Fall 2023",
        "Spring 2024",
        "Summer 2024",
        "Fall 2024",
        "Spring 2025",
        "Summer 2025",
        "Fall 2025",
        "Spring 2026",
    ];

    // Sort courses alphabetically within each semester
    const sortedCourses = {};
    Object.keys(groupedCourses).forEach((semester) => {
        sortedCourses[semester] = groupedCourses[semester].sort((a, b) =>
            a.courseName.localeCompare(b.courseName)
        );
    });

    const filteredCourses = selectedSemester === "All Semesters"
        ? courses
        : groupedCourses[selectedSemester] || [];

        return (
            <div className="courses-container" style={componentStyle}>
                {/*<div className="courses-tabs">
                    {semesterOptions.map((semesterOption) => (
                        <button
                            key={semesterOption}
                            onClick={() => setSelectedSemester(semesterOption)}
                            className={selectedSemester === semesterOption ? "active-tab" : ""}
                        >
                            {semesterOption}
                        </button>
                    ))}
                </div>*/}
                <div className="semester-dropdown">
                    <label htmlFor="semester-select">Select Semester:</label>
                    <select
                        id="semester-select"
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                    >
                        {semesterOptions.map((semesterOption) => (
                            <option className="semester-option" key={semesterOption} value={semesterOption}>
                                {semesterOption}
                            </option>
                        ))}
                    </select>
                </div>
                {showCreateForm ? (
                    <CourseCreate onCourseCreate={addCourse} onCancel={() => setShowCreateForm(false)} />
                ) : (
                    <button className="create-course" onClick={() => setShowCreateForm(true)}>
                        <FaFolderPlus></FaFolderPlus>
                    </button>
                )}
                <ul className="courses-list">
                    {filteredCourses.map((course) => (
                        <li className="single-course" key={course._id}>
                            {selectedCourse === course._id ? (
                                <CourseEdit
                                    course={course}
                                    onUpdateCourse={updateCourse}
                                    onCancel={deselectCourse}
                                />
                            ) : (
                                <div>
                                    <h3>{course.courseName}</h3>
                                    <h5>{course.courseNumber}</h5>
                                    <p>Professor: {course.professor}</p>
                                    <p>Meeting Times: {course.meetingTimes}</p>
                                    <p>Created by: {course.user}</p>
                                    <button onClick={() => selectCourse(course._id)}>
                                        <FaEdit></FaEdit>
                                    </button>
                                    <button onClick={() => deleteCourse(course._id)}>
                                        <FaTrashAlt></FaTrashAlt>
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
}

export default Courses;
