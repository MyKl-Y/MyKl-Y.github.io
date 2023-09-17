import React, { useState } from "react";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
import { useAuth } from "../context/AuthContext";

export default function CreateTask({ onCourseCreate, onCancel }) {
    const { user } = useAuth();

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

    const navigate = useNavigate();

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
        <div>
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