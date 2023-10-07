// CourseComponent.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { useTheme } from '../context/ThemeContext';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

const CourseComponent = ({ selectedDegree, selectedRequirement, onCreateCourse }) => {
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
    };

    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        code: "",
        name: "",
        credits: 0,
    });
    const [selectedCourse, setSelectedCourse] = useState(null);
    // Check if selectedDegree and selectedRequirement are defined before accessing their properties
    const hasSelectedDegree = !!selectedDegree;
    const hasSelectedRequirement = !!selectedRequirement;

    // if selected degree has requirements then make selectedRequirement default to the first index
    useEffect(()=>{
        if (selectedDegree.requirements.length > 0)
            selectedDegree.selectedRequirement = selectedDegree.requirements[0];
    }
    ,[selectedDegree]);

    useEffect(() => {
        if (hasSelectedDegree && hasSelectedRequirement) {
        // Fetch courses for the selected requirement from the backend
        // You can use fetch or any other method you prefer
        // Update the URL as needed
        fetch(`http://localhost:5050/graduation/course/${selectedDegree._id}/${selectedRequirement._id}`)
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error(error));
        }
    }, [selectedDegree, selectedRequirement, hasSelectedDegree, hasSelectedRequirement]);

    const handleCourseSubmit = () => {
        if (hasSelectedDegree && hasSelectedRequirement) {

            // Send a POST request to create a new course for the selected requirement
            // You can use fetch or any other method you prefer
            // Update the URL and request body as needed
            fetch(`http://localhost:5050/graduation/course/${selectedDegree._id}/${selectedRequirement._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCourse),
            })
            .then((response) => response.json())
            .then((data) => {
                onCreateCourse(data);
                setNewCourse({code: "", name: "", credits: 0});

                // Delay for 2 seconds, then reload the page on success
                //setTimeout(() => {
                //    window.location.reload();
                //}, 500);
            })
            .catch((error) => console.error(error));
        }
    };

    const handleSelectCourse = (course) => {
        setSelectedCourse(course);
    };

    return (
        <div style={componentStyle}>
            {hasSelectedDegree && (
                <div>
                    {/*<h2>Courses for {selectedDegree.name}</h2>*/}
                    {(
                        hasSelectedRequirement 
                        && selectedRequirement.courses 
                        && selectedRequirement.courses.length > 0 
                    ) ? (
                        <ul>
                            {selectedRequirement.courses.map((course) => (
                                <li 
                                    className={`course-node ${
                                        selectedCourse === course ? "active-node" : ""
                                    }`} 
                                    key={course._id}
                                    onClick={() => handleSelectCourse(course)}
                                >
                                    <p>
                                        <h5>{course.code}</h5>
                                        <h5>{course.name}</h5>
                                        Credit Hours: <b>{course.credits}</b>
                                        <br/>
                                        Status: {
                                            course.is_complete ?
                                            <b>Complete</b> :
                                            <b>Incomplete</b>
                                        }
                                        {/*<button onClick={()=>onDeleteCourseClickHandler(course)}>Delete</button>*/}
                                    </p>
                                </li>
                            ))}
                            <li>
                                <div className="node-form">
                                    <input
                                        type="text"
                                        placeholder="Enter course code"
                                        value={newCourse.code}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, code: e.target.value })
                                        }
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter course name"
                                        value={newCourse.name}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, name: e.target.value })
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder="Enter credits"
                                        value={newCourse.credits}
                                        onChange={(e) =>
                                            setNewCourse({
                                            ...newCourse,
                                            credits: parseInt(e.target.value, 10),
                                            })
                                        }
                                    />
                                    <button onClick={handleCourseSubmit}>
                                        <AddCircleTwoToneIcon/>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    ) : (
                        <p>No courses found</p>
                    )}

                </div>
            )}
        </div>
    );
};

export default CourseComponent;
