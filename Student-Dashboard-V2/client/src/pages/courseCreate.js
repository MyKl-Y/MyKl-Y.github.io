import React, { useState } from "react";
//import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
import { useAuth } from "../context/AuthContext";
import { useTheme } from '../context/ThemeContext';
import "./courseCreate.css";

export default function CreateTask({ onCourseCreate, onCancel }) {
    const { user } = useAuth();
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

    const [newCourse, setNewCourse] = useState({
        courseNumber: "",
        courseName: "",
        professor: "",
        semester: "",
        // Add other course properties here
        tag: "",
        professorContact: "",
        links: "",
        meetingTimes: "",
        user: "",
    });

    //const navigate = useNavigate();

    const handleAddCourse = () => {
        // Set the user to property of the newCourse object
        newCourse.user = user.name;
        // Call the onCourseCreate callback with the new course data
        onCourseCreate(newCourse);
        // Clear the form
        setNewCourse({
            courseNumber: "",
            courseName: "",
            professor: "",
            semester: "",
            // Reset other properties
            tag: "",
            professorContact: "",
            links: "",
            meetingTimes: "",
            user: user.name,
        });
    };

    return (
        <div className="create-course-container" style={componentStyle}>
            {/* Add Course Form */}
            <h2>Add a New Course</h2>
            <form>
                <input
                    type="text"
                    placeholder="Course Number"
                    value={newCourse.courseNumber}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, courseNumber: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Course Name"
                    value={newCourse.courseName}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, courseName: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Semester"
                    value={newCourse.semester}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, semester: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Meeting Times"
                    value={newCourse.meetingTimes}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, meetingTimes: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Professor"
                    value={newCourse.professor}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, professor: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Professor Contact"
                    value={newCourse.professorContact}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, professorContact: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Links"
                    value={newCourse.links}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, links: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Tag"
                    value={newCourse.tag}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, tag: e.target.value })
                    }
                />
                <button type="button" onClick={handleAddCourse}>
                    Add Course
                </button>
                <button onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
}