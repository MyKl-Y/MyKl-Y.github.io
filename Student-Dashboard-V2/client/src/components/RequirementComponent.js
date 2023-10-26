// RequirementComponent.js
import React, { useState, useEffect } from "react";
import CourseComponent from "./CourseComponent";
import { useTheme } from '../context/ThemeContext';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

const RequirementComponent = ({ selectedDegree, selectedConcentration, onCreateRequirement, onSelectRequirement, calculateTotalUpdates }) => {
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

    const [requirements, setRequirements] = useState([]);
    const [newRequirement, setNewRequirement] = useState({
        name: "",
        credits: 0,
    });
    const [selectedRequirement, setSelectedRequirement] = useState(false);
    const hasSelectedDegree = !!selectedDegree;
    const hasSelectedConcentration = !!selectedConcentration;

    useEffect(()=>{
        if (selectedDegree.concentrations.length > 0)
            selectedDegree.selectedConcentration = selectedDegree.concentrations[0];
    }
    ,[selectedDegree]);

    useEffect(() => {
        if (hasSelectedDegree && hasSelectedConcentration) {
            // Fetch requirements for the selected degree from the backend
            // You can use fetch or any other method you prefer
            // Update the URL as needed
            fetch(`http://localhost:5050/graduation/requirement/${selectedDegree._id}/${selectedConcentration._id}`)
                .then((response) => response.json())
                .then((data) => setRequirements(data))
                .catch((error) => console.error(error));
        }
    }, [selectedDegree, selectedConcentration, hasSelectedConcentration, hasSelectedDegree]);

    const handleRequirementSubmit = () => {
        if (hasSelectedConcentration && hasSelectedDegree) {

        // Send a POST request to create a new requirement for the selected degree
        // You can use fetch or any other method you prefer
        // Update the URL and request body as needed
        fetch(`http://localhost:5050/graduation/requirement/${selectedDegree._id}/${selectedConcentration._id}`, {
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
            //setTimeout(() => {
            //    window.location.reload();
            //}, 500);
            calculateTotalUpdates(1);
        })
        .catch((error) => console.error(error));
        }
    };

    const handleSelectRequirement = (requirement) => {
        if (selectedRequirement === requirement) {
            setSelectedRequirement(null);
            onSelectRequirement(null);
        } else {
            onSelectRequirement(requirement);
            setSelectedRequirement(requirement);
        }
    };

    const [createdCourses, setCreatedCourses] = useState([]);

    // Function to handle the creation of a new course
    const onCreateCourse = (newCourse) => {
        setCreatedCourses([...createdCourses, newCourse]);
    };

    // Check if requirement is done if the requirement credit hours <= sum of all courses credit hours
    const isRequirementDone = (requirement) => {
        let sum = 0;
        requirement.courses.forEach((course) => {
            if (course.is_complete && course.credits) {
                sum += course.credits;
            }
        })
        return requirement.credits <= sum;
    }
    const requirementTotalCredits = (requirement) => {
        let sum = 0;
        requirement.courses.forEach((course) => {
            if (course.is_complete && course.credits) {
                sum += course.credits;
            }
        })
        return sum;
    }

    return (
        <div style={componentStyle}>
            {/*<h2>Requirements for {selectedDegree.name}</h2>*/}
            {(
                hasSelectedConcentration
                && selectedConcentration.requirements 
                && selectedConcentration.requirements.length > 0
            ) ? (
                <ul>
                    {selectedConcentration.requirements.map((requirement) => (
                        <li 
                            className={`requirements-node ${
                                selectedRequirement === requirement ? "active-node" : ""
                            }`} 
                            key={requirement._id} 
                        >
                            <div 
                                className={`tree-node-content
                                    ${
                                        isRequirementDone(requirement) ? "complete-node" : ""
                                    }`
                                }
                                onClick={() => handleSelectRequirement(requirement)}
                            >
                                <h5>{requirement.name}</h5>
                                {`
                                    ${
                                        requirementTotalCredits(requirement)
                                    }
                                /
                                    ${
                                        requirement.credits
                                    }
                                `}
                            </div>
                            {selectedRequirement && selectedRequirement._id === requirement._id && (
                                <CourseComponent 
                                    selectedDegree={selectedDegree}
                                    selectedConcentration={selectedConcentration}
                                    selectedRequirement={selectedRequirement} 
                                    onCreateCourse={onCreateCourse}
                                    isRequirementDone={isRequirementDone(requirement)}
                                    calculateTotalUpdates={calculateTotalUpdates}
                                />
                            )}
                        </li>
                    ))}
                    <li>
                        <div className="node-form">
                            <label>
                                Requirement Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Lab Sciences"
                                value={newRequirement.name}
                                onChange={(e) =>
                                    setNewRequirement({ ...newRequirement, name: e.target.value })
                                }
                            />
                            <label>
                                Requirement Credits
                            </label>
                            <input
                                type="number"
                                placeholder="#"
                                value={newRequirement.credits}
                                onChange={(e) =>
                                    setNewRequirement({
                                    ...newRequirement,
                                    credits: parseInt(e.target.value, 10),
                                    })
                                }
                            />
                            <button onClick={handleRequirementSubmit}>
                                <AddCircleTwoToneIcon />
                            </button>
                        </div>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li>
                        <div className="tree-node-content">No Requirements Found</div>
                    </li>
                    <li>
                        <div className="node-form">
                            <label>
                                Requirement Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Lab Sciences"
                                value={newRequirement.name}
                                onChange={(e) =>
                                    setNewRequirement({ ...newRequirement, name: e.target.value })
                                }
                            />
                            <label>
                                Requirement Credits
                            </label>
                            <input
                                type="number"
                                placeholder="#"
                                value={newRequirement.credits}
                                onChange={(e) =>
                                    setNewRequirement({
                                    ...newRequirement,
                                    credits: parseInt(e.target.value, 10),
                                    })
                                }
                            />
                            <button onClick={handleRequirementSubmit}>
                                <AddCircleTwoToneIcon />
                            </button>
                        </div>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default RequirementComponent;
