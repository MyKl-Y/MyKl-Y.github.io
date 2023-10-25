// CourseComponent.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { useTheme } from '../context/ThemeContext';
import { AddCircleTwoTone, CheckCircleTwoTone, CircleTwoTone, CancelTwoTone } from '@mui/icons-material';

const CourseComponent = ({ selectedDegree, selectedConcentration, selectedRequirement, onCreateCourse, isRequirementDone, calculateTotalUpdates }) => {
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

    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        code: "",
        name: "",
        credits: 0,
    });
    const [selectedCourse, setSelectedCourse] = useState(null);
    // Check if selectedDegree and selectedRequirement are defined before accessing their properties
    const hasSelectedDegree = !!selectedDegree;
    const hasSelectedConcentration = !!selectedConcentration;
    const hasSelectedRequirement = !!selectedRequirement;

    // if selected degree has requirements then make selectedRequirement default to the first index
    useEffect(()=>{
        if (selectedDegree.selectedConcentration.requirements.length > 0)
            selectedDegree.selectedConcentration.selectedRequirement = selectedDegree.selectedConcentration.requirements[0];
    }
    ,[selectedDegree, selectedConcentration]);

    useEffect(() => {
        if (hasSelectedDegree && hasSelectedConcentration && hasSelectedRequirement) {
        // Fetch courses for the selected requirement from the backend
        // You can use fetch or any other method you prefer
        // Update the URL as needed
        fetch(`http://localhost:5050/graduation/course/${selectedDegree._id}/${selectedConcentration._id}/${selectedRequirement._id}`)
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error(error));
        }
    }, [selectedDegree, selectedRequirement, selectedConcentration, hasSelectedDegree, hasSelectedConcentration, hasSelectedRequirement]);

    const handleCourseSubmit = () => {
        if (hasSelectedDegree && hasSelectedConcentration && hasSelectedRequirement) {

            // Send a POST request to create a new course for the selected requirement
            // You can use fetch or any other method you prefer
            // Update the URL and request body as needed
            fetch(`http://localhost:5050/graduation/course/${selectedDegree._id}/${selectedConcentration._id}/${selectedRequirement._id}`, {
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
                calculateTotalUpdates(1);
            })
            .catch((error) => console.error(error));
        }
    };

    const handleSelectCourse = (course) => {
        if (selectedCourse === course) {
            setSelectedCourse(null);
        } else {
            setSelectedCourse(course);
        }
    };

    const [updatedCourse, setUpdatedCourse] = useState({
        code: "",
        name: "",
        credits: "",
        is_complete: false,
    });

    const toggleCourseCompleteness = (course) => {
        // Toggle the completeness status of the course
        // selectedDegree.selectedConcentration.selectedRequirement.selectedCourse.is_complete = !selectedDegree.selectedConcentration.selectedRequirement.selectedCourse.is_complete;

        let updatedCourse;

        if (course.is_complete) {
            updatedCourse = {
                code: course.code,
                name: course.name,
                credits: course.credits,
                is_complete: false
            }
        } else {
            updatedCourse = {
                code: course.code,
                name: course.name,
                credits: course.credits,
                is_complete: true
            }
        }

        console.log(updatedCourse);

        // Send a PUT request to update the course with the new completeness status
        // You can use fetch or any other method you prefer
        // Update the URL and request body as needed
        fetch(`http://localhost:5050/graduation/course/${selectedDegree._id}/${selectedConcentration._id}/${selectedRequirement._id}/${selectedCourse._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCourse),
        })
        
        .then((response) => response.json())
        .then((data) => {
            // Call the onUpdateCourse function to update the course in the UI
            //onUpdateCourse(updatedCourse);
            setUpdatedCourse({
                code: "",
                name: "",
                credits: 0,
                is_complete: false
            })

            //setTimeout(() => {
            //    window.location.reload();
            //}, 500);
            calculateTotalUpdates(1);
        })
        .catch((error) => console.error(error));
    };

    //TODO: Make degree, concentrations, requirements, and courses editable and deletable!

    return (
        <div style={componentStyle}>
            {hasSelectedDegree && hasSelectedConcentration && (
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
                                    className={`course-node 
                                        ${
                                            selectedCourse === course ? "active-node" : ""
                                        }`
                                    } 
                                    key={course._id}
                                >
                                    <div 
                                        className={`tree-node-content
                                            ${
                                                course.is_complete ? "complete-node" : ""
                                            }`
                                        } 
                                        onClick={() => handleSelectCourse(course)}
                                    >
                                        <h6>{course.code}</h6>
                                        <b><i>{course.name}</i></b>
                                        <br/>
                                        {`
                                            ${
                                                course.is_complete 
                                                    ? course.credits+" / "+course.credits
                                                    : isRequirementDone
                                                        ? ""
                                                        : 0+" / "+course.credits
                                            }`}
                                        {/*<button onClick={()=>onDeleteCourseClickHandler(course)}>Delete</button>*/}
                                        { selectedCourse === course && !isRequirementDone
                                            ? 
                                                <button 
                                                    className={`toggle-completion-button 
                                                        ${course.is_complete ? "complete" : "incomplete"}`}
                                                    onClick={() => toggleCourseCompleteness(selectedCourse)}
                                                >
                                                    {course.is_complete 
                                                        ? <CancelTwoTone/>
                                                        : <CheckCircleTwoTone/>
                                                    }
                                                </button>
                                            : course.is_complete && selectedCourse === course
                                                ? 
                                                    <button 
                                                        className={`toggle-completion-button 
                                                            ${course.is_complete ? "complete" : "incomplete"}`}
                                                        onClick={() => toggleCourseCompleteness(selectedCourse)}
                                                    >
                                                        {course.is_complete 
                                                            ? <CancelTwoTone/>
                                                            : <CheckCircleTwoTone/>
                                                        }
                                                    </button>
                                                : null
                                        }
                                    </div>
                                </li>
                            ))}
                            <li>
                                <div className="node-form">
                                    <input
                                        type="text"
                                        placeholder="Code"
                                        value={newCourse.code}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, code: e.target.value })
                                        }
                                    />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={newCourse.name}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, name: e.target.value })
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder="Credits"
                                        value={newCourse.credits}
                                        onChange={(e) =>
                                            setNewCourse({
                                            ...newCourse,
                                            credits: parseInt(e.target.value, 10),
                                            })
                                        }
                                    />
                                    <button onClick={handleCourseSubmit}>
                                        <AddCircleTwoTone/>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <li>
                                <div className="tree-node-content">No Courses Found</div>
                            </li>
                            <li>
                                <div className="node-form">
                                    <input
                                        type="text"
                                        placeholder="Code"
                                        value={newCourse.code}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, code: e.target.value })
                                        }
                                    />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={newCourse.name}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, name: e.target.value })
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder="Credits"
                                        value={newCourse.credits}
                                        onChange={(e) =>
                                            setNewCourse({
                                            ...newCourse,
                                            credits: parseInt(e.target.value, 10),
                                            })
                                        }
                                    />
                                    <button onClick={handleCourseSubmit}>
                                        <AddCircleTwoTone/>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    )}

                </div>
            )}
        </div>
    );
};

export default CourseComponent;
