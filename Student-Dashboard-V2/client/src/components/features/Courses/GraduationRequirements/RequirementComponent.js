// RequirementComponent.js
import React, { useState, useEffect } from "react";
import CourseComponent from "./CourseComponent";
import { useTheme } from '../../../../context/theme/ThemeContext';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

const RequirementComponent = ({ selectedDegree, selectedConcentration, onCreateRequirement, onSelectRequirement, calculateTotalUpdates }) => {
    const { currentTheme } = useTheme();

    const [requirements, setRequirements] = useState([]);
    const [newRequirement, setNewRequirement] = useState({
        name: "",
        credits: 0,
    });
    const [selectedRequirement, setSelectedRequirement] = useState(false);
    const hasSelectedDegree = !!selectedDegree;
    const hasSelectedConcentration = !!selectedConcentration;

    useEffect(() => {
        if (hasSelectedDegree && hasSelectedConcentration && selectedConcentration.requirements.length > 0) {
            // Fetch requirements for the selected degree from the backend
            // You can use fetch or any other method you prefer
            // Update the URL as needed
            //selectedDegree.selectedConcentration = selectedDegree.concentrations[0];
            fetch(`http://localhost:5050/graduation/requirement/${selectedDegree._id}/${selectedConcentration._id}`)
                .then((response) => response.json())
                .then((data) => setRequirements(data[0].requirements))
                .catch((error) => console.error(error));
        } else {
            setRequirements([]);
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

    const [showAddNewForm, setShowAddNewForm] = useState(false);

    const handleSelectRequirement = (requirement) => {
        onSelectRequirement(requirement);
        setSelectedRequirement(requirement);
        setSelectedCourse(null);
        setShowAddNewForm(false);
    };

    const [createdCourses, setCreatedCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Function to handle the creation of a new course
    const onCreateCourse = (newCourse) => {
        setCreatedCourses([...createdCourses, newCourse]);
    };

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Check if requirement is done if the requirement credit hours <= sum of all courses credit hours
    const isRequirementDone = (requirement) => {
        if (!requirement) {
            return false;
        }
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
        <div className="tree-container" style={currentTheme}>
            <div className="tree-button-container">
                <div className="custom-dropdown-container">
                    <div
                        className={`custom-dropdown-header ${showDropdown ? "active" : ""}`}
                        onClick={toggleDropdown}
                    >
                        <span>
                            {selectedRequirement === "addNew" ? "Add New" : 
                            (selectedRequirement ? (
                                `${selectedRequirement.name}
                                (${requirementTotalCredits(selectedRequirement)}/${selectedRequirement.credits})`
                            ) : "Select a Requirement")}
                        </span>
                        <span className="dropdown-icon">{showDropdown ? " ▲" : " ▼"}</span>
                    </div>
                    {showDropdown && (
                        <div className="custom-dropdown-options">
                            <div
                                className={`custom-dropdown-option none-option ${selectedRequirement === null ? "active" : ""}`}
                                onClick={() => 
                                    {
                                        handleSelectRequirement(null)
                                        setShowAddNewForm(false) // Show the Add New form
                                        toggleDropdown()
                                    }
                                }
                            >

                            </div>
                            <div
                                className={`custom-dropdown-option ${selectedRequirement === "addNew" ? "active" : ""}`}
                                onClick={() => 
                                    {
                                        handleSelectRequirement("addNew")
                                        setShowAddNewForm(true) // Show the Add New form
                                        toggleDropdown()
                                    }
                                }
                            >
                                Add New
                            </div>
                            {requirements.map((requirement) => (
                                <div
                                    className={`custom-dropdown-option ${selectedRequirement === requirement ? "active" : ""}`}
                                    key={requirement._id}
                                    onClick={() => 
                                        {
                                            handleSelectRequirement(requirement)
                                            toggleDropdown()
                                        }
                                    }
                                >
                                    {requirement.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {showAddNewForm ? (
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
            ) : selectedRequirement ? (
                <CourseComponent 
                    selectedDegree={selectedDegree}
                    selectedConcentration={selectedConcentration}
                    selectedRequirement={selectedRequirement} 
                    onSelectCourse={(course) => setSelectedCourse(course)}
                    onCreateCourse={onCreateCourse}
                    isRequirementDone={isRequirementDone(selectedRequirement)}
                    calculateTotalUpdates={calculateTotalUpdates}
                />
            ) : null}
            {/*
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
            )}*/}
        </div>
    );
};

export default RequirementComponent;
