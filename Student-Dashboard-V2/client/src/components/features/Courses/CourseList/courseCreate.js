import React, { useState } from "react";
//import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
import { useAuth } from "../../../../context/authentication/AuthContext";
import { useTheme } from '../../../../context/theme/ThemeContext';
import "../../../../styles/courseCreate.css";
import { motion } from "framer-motion";

export default function CreateTask({ onCourseCreate, onCancel }) {
    const { user } = useAuth();
    const { currentTheme } = useTheme();

    //TODO: more tags

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
    const [selectedTag, setSelectedTag] = useState("Other");

    const [newCourse, setNewCourse] = useState({
        courseNumber: "",
        courseName: "",
        professor: "",
        semester: "",
        // Add other course properties here
        tag: "Other",
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
            tag: "Other",
            professorContact: "",
            links: "",
            meetingTimes: "",
            user: user.name,
        });
    };

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
        setNewCourse(prevCourse => ({ ...prevCourse, tag: tag }));
    };

    return (
        <motion.div 
            className="create-course-container" 
            style={currentTheme}
            key='create-course'
            initial={{ opacity: 0, scaleY: 0, scaleX: .75, translateY: '-16.5rem' }}
            animate={{ opacity: 1, scaleY: .75, scaleX: .75, translateY: 0 }}
            exit={{ opacity: 0, scaleY: 0, scaleX: .75, translateY: '-16.5rem' }}
            transition={{ duration: .5 }}
        >
            {/* Add Course Form */}
            <h2>Add a New Course</h2>
            <form>
                <label htmlFor="courseNumber">
                    Course Number
                </label>
                <input
                    type="text"
                    placeholder="e.g., MATH 1552"
                    value={newCourse.courseNumber}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, courseNumber: e.target.value })
                    }
                />
                <label htmlFor="courseName">
                    Course Name
                </label>
                <input
                    type="text"
                    placeholder="e.g., Differential Calculus"
                    value={newCourse.courseName}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, courseName: e.target.value })
                    }
                />
                <label htmlFor="semester">
                    Semester
                </label>
                <input
                    type="text"
                    placeholder="e.g., Fall 2022"
                    value={newCourse.semester}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, semester: e.target.value })
                    }
                />
                {/* Add other course properties here */}
                <label htmlFor="meetingTimes">
                    Meeting Times
                </label>
                <input
                    type="text"
                    placeholder="e.g., Thu 10:20 am-11:35 am, Wed 3:00 pm-4:00 pm (Sun, Mon, Tue, Wed, Thu, Fri, Sat)"
                    pattern="^([A-Za-z, ]+)\s+(\d{1,2}:\d{2} [ap]m-\d{1,2}:\d{2} [ap]m, )*[A-Za-z, ]+\s+(\d{1,2}:\d{2} [ap]m-\d{1,2}:\d{2} [ap]m)$"
                    value={newCourse.meetingTimes}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, meetingTimes: e.target.value })
                    }
                />
                <label htmlFor="professor">
                    Professor
                </label>
                <input
                    type="text"
                    placeholder="e.g., Dr. Stark"
                    value={newCourse.professor}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, professor: e.target.value })
                    }
                />
                <label htmlFor="professorContact">
                    Professor Contact
                </label>
                <input
                    type="text"
                    placeholder="e.g., tstark@mit.edu, (426) 476-6626"
                    value={newCourse.professorContact}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, professorContact: e.target.value })
                    }
                />
                <label htmlFor="links">
                    Links
                </label>
                <input
                    type="text"
                    placeholder="e.g., https://www.mathway.com/Calculus"
                    value={newCourse.links}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, links: e.target.value })
                    }
                />
                <label htmlFor="tag">
                    Tag
                </label>
                {/*<input
                    type="text"
                    placeholder="e.g., Mathematics, Calculus, STEM"
                    value={newCourse.tag}
                    onChange={(e) =>
                        setNewCourse({ ...newCourse, tag: e.target.value })
                    }
                />*/}
                <div className="chip-container">
                    {defaultTags.map((tag) => (
                        <div 
                            className={`chip ${selectedTag === tag ? 'selected' : ''}`}
                            onClick={() => handleTagSelect(tag)}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
                <div className="create-course-buttons">
                    <button className="Add-Course" type="button" onClick={handleAddCourse}>
                        Add 
                    </button>
                    <button className='Cancel-Add-Course' onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
}