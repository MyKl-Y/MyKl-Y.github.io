import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function CourseEdit({ course, onUpdateCourse }) {
    const [editedCourse, setEditedCourse] = useState(course);
    const { user } = useAuth();

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
        <div>
            <h2>Edit Course</h2>
            <form>
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
                    placeholder="Course Name"
                    value={editedCourse.courseName}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, courseName: e.target.value })
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
