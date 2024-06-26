import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/authentication/AuthContext";
import "../../../../styles/courseEdit.css";

function CourseEdit({ course, onUpdateCourse }) {
    const [editedCourse, setEditedCourse] = useState(course);
    const { userData } = useAuth();

    const defaultTags = [
        "Math", 
        "Science", 
        "Engineering", 
        "Computing",
        "English", 
        "Social Science", 
        "Foreign Language", 
        "Other"
    ];


    useEffect(() => {
        const updatedCourse = { ...course, tag: course.tag || "Other" };
        // Update the edited course whenever the course prop changes
        setEditedCourse(updatedCourse);
    }, [course]);

    const handleTagSelect = (tag) => {
        setEditedCourse(prevCourse => ({ ...prevCourse, tag: tag }));
    };

    const handleUpdateCourse = () => {
        // Set the user property of the newCourse object
        editedCourse.user = userData.name;
        // Call the onUpdateCourse callback with the edited course data
        onUpdateCourse(editedCourse);
    };

    return (
        <div className="edit-course-container">
            <h2>Edit Course</h2>
            <form>
                <label>Course Name</label>
                <input
                    type="text"
                    placeholder="e.g., Differential Calculus"
                    value={editedCourse.courseName}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, courseName: e.target.value })
                    }
                />
                <label>Course Number</label>
                <input
                    type="text"
                    placeholder="e.g., MATH 1552"
                    value={editedCourse.courseNumber}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, courseNumber: e.target.value })
                    }
                />
                <label>Credit Hours</label>
                <input
                    type="number"
                    placeholder="e.g., 3"
                    value={editedCourse.creditHours}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, creditHours: e.target.value })
                    }
                />
                <label>Professor</label>
                <input
                    type="text"
                    placeholder="e.g., Dr. Stark"
                    value={editedCourse.professor}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, professor: e.target.value })
                    }
                />
                <label>Professor Contact</label>
                <input
                    type="text"
                    placeholder="e.g., tstark@mit.edu, (426) 476-6626"
                    value={editedCourse.professorContact}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, professorContact: e.target.value })
                    }
                />
                <label>Semester</label>
                <input
                    type="text"
                    placeholder="Fall 2022"
                    value={editedCourse.semester}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, semester: e.target.value })
                    }
                />
                {/* Add other course properties here */}
                <label>Meeting Times</label>
                <input
                    type="text"
                    placeholder="e.g., Thu 10:20am-11:35am, Wed 3:00pm-4:00pm (Sun, Mon, Tue, Wed, Thu, Fri, Sat)"
                    pattern="^(Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s+\d{1,2}:\d{2}[ap]m-\d{1,2}:\d{2}[ap]m(, (Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s+\d{1,2}:\d{2}[ap]m-\d{1,2}:\d{2}[ap]m)*$"
                    value={editedCourse.meetingTimes}
                    onChange={(e) =>
                        setEditedCourse({ ...editedCourse, meetingTimes: e.target.value })
                    }
                />
                <label>Tag</label>
                <div className="tag-selector">
                    {defaultTags.map((tag) => (
                        <div
                            key={tag}
                            className={`tag ${editedCourse.tag === tag ? 'selected' : ''}`}
                            onClick={() => handleTagSelect(tag)}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
                <label>Links</label>
                <input
                    type="text"
                    placeholder="e.g., https://www.mathway.com/Calculus"
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
