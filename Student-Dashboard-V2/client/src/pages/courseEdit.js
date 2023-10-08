import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from '../context/ThemeContext';
import "./courseEdit.css";

function CourseEdit({ course, onUpdateCourse }) {
    const [editedCourse, setEditedCourse] = useState(course);
    const { user } = useAuth();
    const { isDarkMode } = useTheme();

    const componentStyle = {
        '--background': 
            isDarkMode ? 
            'linear-gradient(60deg, rgba(84,58,183,1) -100%, rgba(0,172,193,1) 200%)' : 
            'linear-gradient(60deg, rgb(53, 29, 150) -100%, rgb(1, 90, 102) 200%)',
        '--text-color': 
            !isDarkMode ? 
            'rgba(9,9,121,1)' : 
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
            'linear-gradient(60deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)',
        '--accent-light':
            isDarkMode ?
            'rgba(255,203,0,1)' :
            'rgba(9,9,121,1)',
        '--accent-dark':
            isDarkMode ?
            'rgba(255,143,0,1)' :
            'rgba(0,212,255,1)',
        '--primary':
            !isDarkMode ?
            'rgba(25, 101, 207, 1)':
            'rgba(255, 173, 0, 1)',
        '--add-light':
            'rgba(70,215,100,1)',
        '--add-primary':
            'rgba(40,165,70,1)',
        '--add-dark':
            'rgba(10,115,40,1)',
        '--remove-light':
            'rgba(255,100,100,1)',
        '--remove-primary':
            'rgba(200,50,50,1)',
        '--remove-dark':
            'rgba(145,0,0,1)',
    };

    useEffect(() => {
        // Update the edited course whenever the course prop changes
        setEditedCourse(course);
    }, [course]);

    const handleUpdateCourse = () => {
        // Set the user property of the newCourse object
        editedCourse.user = user.name;
        // Call the onUpdateCourse callback with the edited course data
        onUpdateCourse(editedCourse);
    };

    return (
        <div className="edit-course-container">
            <h2>Edit Course</h2>
            <form>
                <input
                    type="text"
                    placeholder="Course Name"
                    value={editedCourse.courseName}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, courseName: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Course Number"
                    value={editedCourse.courseNumber}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, courseNumber: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Professor"
                    value={editedCourse.professor}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, professor: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Semester"
                    value={editedCourse.semester}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, semester: e.target.value })
                    }
                />
                {/* Add other course properties here */}
                <input
                    type="text"
                    placeholder="Meeting Times"
                    value={editedCourse.meetingTimes}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, meetingTimes: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Tag"
                    value={editedCourse.tag}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, tag: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Professor Contact"
                    value={editedCourse.professorContact}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, professorContact: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Links"
                    value={editedCourse.links}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, links: e.target.value })
                    }
                />
                <button type="button" onClick={handleUpdateCourse}>
                    Update Course
                </button>
            </form>
        </div>
    );
}

export default CourseEdit;
