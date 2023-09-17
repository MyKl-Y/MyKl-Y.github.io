import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from '../context/ThemeContext';
import CourseCreate from "./courseCreate";
import CourseEdit from "./courseEdit";
import { 
    FaTrashAlt,
    FaEdit,
    FaFolderPlus,
} from 'react-icons/fa';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelect] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const { user } = useAuth();

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

    return (
        <div>
            <h1>My Courses</h1>
            {showCreateForm ? (
                <CourseCreate onCourseCreate={addCourse} onCancel={() => setShowCreateForm(false)} />
            ) : (
                <button onClick={() => setShowCreateForm(true)}>
                    <FaFolderPlus></FaFolderPlus>
                </button>
            )}
            {Object.keys(groupedCourses).map((semester) => (
                <div key={semester}>
                    <h2>{semester}</h2>
                    <ul>
                        {groupedCourses[semester].map((course) => (
                            <li key={course._id}>
                                {selectedCourse === course._id ? (
                                    <CourseEdit
                                        course={course}
                                        onUpdateCourse={updateCourse}
                                        onCancel={deselectCourse}
                                    />
                                ) : (
                                    <div>
                                        <h3>{course.courseName}</h3>
                                        <p>Course Number: {course.courseNumber}</p>
                                        <p>Professor: {course.professor}</p>
                                        {/* Add other course details */}
                                        <p>Meeting Times: {course.meetingTimes}</p>
                                        <p>Created by: {course.user}</p>
                                        {/*<p>Tag: {course.tag}</p>
                                        <p>Links: {course.links}</p>*/}
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
            ))}
        </div>
    );
}

export default Courses;
