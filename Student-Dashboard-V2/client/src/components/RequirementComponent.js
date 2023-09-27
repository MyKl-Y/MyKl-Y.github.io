// RequirementComponent.js
import React, { useState, useEffect } from "react";
import CourseComponent from "./CourseComponent";
import { useTheme } from '../context/ThemeContext';

const RequirementComponent = ({ selectedDegree, onCreateRequirement, onSelectRequirement }) => {
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

    const [requirements, setRequirements] = useState([]);
    const [newRequirement, setNewRequirement] = useState({
        name: "",
        credits: 0,
    });
    const [hasRequirements, setHasRequirements] = useState(false);

    useEffect(()=>{
        if (selectedDegree.requirements.length > 0)
            setHasRequirements(true);
    }
    ,[selectedDegree]);

    useEffect(() => {
        if (selectedDegree && hasRequirements) {
            // Fetch requirements for the selected degree from the backend
            // You can use fetch or any other method you prefer
            // Update the URL as needed
            fetch(`http://localhost:5050/graduation/requirement/${selectedDegree._id}`)
                .then((response) => response.json())
                .then((data) => setRequirements(data))
                .catch((error) => console.error(error));
        }
    }, [selectedDegree]);

    const handleRequirementSubmit = () => {
        if (selectedDegree) {

        // Send a POST request to create a new requirement for the selected degree
        // You can use fetch or any other method you prefer
        // Update the URL and request body as needed
        fetch(`http://localhost:5050/graduation/requirement/${selectedDegree._id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequirement),
        })
        .then((response) => response.json())
        .then((data) => {
            onCreateRequirement(data);
            setNewRequirement({name: "", credits: 0});

            // Delay for 2 seconds, then reload the page on success
            setTimeout(() => {
                window.location.reload();
            }, 500);
        })
        .catch((error) => console.error(error));
        }
    };

    const handleSelectRequirement = (requirement) => {
        onSelectRequirement(requirement);
        setSelectedRequirement(requirement);
    };

    const [selectedRequirement, setSelectedRequirement] = useState(null);
    const [createdCourses, setCreatedCourses] = useState([]);

    // Function to handle the creation of a new course
    const onCreateCourse = (newCourse) => {
        setCreatedCourses([...createdCourses, newCourse]);
    };

    return (
        <div style={componentStyle}>
            {/*<h2>Requirements for {selectedDegree.name}</h2>*/}
            {(selectedDegree.requirements && selectedDegree.requirements.length > 0) ? (
            <ul>
                {selectedDegree.requirements.map((requirement) => (
                    <li 
                        className={`requirements-node ${
                            selectedRequirement === requirement ? "active-node" : ""
                        }`} 
                        key={requirement._id} 
                        onClick={() => handleSelectRequirement(requirement)}
                    >
                        <p>
                            <h4>{requirement.name}</h4>
                            Credit Hours: <b>{requirement.credits}</b>
                            <br/>
                            Status: 
                            <b>
                                {
                                    requirement.is_complete ?
                                    " Complete" :
                                    " Incomplete"
                                }
                            </b>
                        </p>
                        {selectedRequirement && selectedRequirement._id === requirement._id && (
                            <CourseComponent 
                                selectedDegree={selectedDegree}
                                selectedRequirement={selectedRequirement} 
                                onCreateCourse={onCreateCourse}
                            />
                        )}
                    </li>
                ))}
                <li>
                    <div className="node-form">
                        <input
                            type="text"
                            placeholder="Enter requirement name"
                            value={newRequirement.name}
                            onChange={(e) =>
                                setNewRequirement({ ...newRequirement, name: e.target.value })
                            }
                        />
                        <input
                            type="number"
                            placeholder="Enter credits"
                            value={newRequirement.credits}
                            onChange={(e) =>
                                setNewRequirement({
                                ...newRequirement,
                                credits: parseInt(e.target.value, 10),
                                })
                            }
                        />
                        <button onClick={handleRequirementSubmit}>Add Requirement</button>
                    </div>
                </li>
            </ul>
            ) : (
                <p>No requirements found</p>
            )}
        </div>
    );
};

export default RequirementComponent;
