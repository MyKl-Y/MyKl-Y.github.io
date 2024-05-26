// ConcentrationComponent.js
import React, { useState, useEffect } from "react";
import RequirementComponent from "./RequirementComponent";
import { useTheme } from '../../../../context/theme/ThemeContext';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

const ConcentrationComponent = ({ selectedDegree, onCreateConcentration, onSelectConcentration, calculateTotalUpdates }) => {
    const { currentTheme } = useTheme();

    const [concentrations, setConcentrations] = useState([]);
    const [newConcentration, setNewConcentration] = useState({
        name: "",
    });
    const [hasConcentrations, setHasConcentrations] = useState(true);

    useEffect(() => {
        if (selectedDegree && selectedDegree.concentrations.length > 0) {
            setHasConcentrations(true);
            fetchConcentrations(selectedDegree._id);
        } else {
            setHasConcentrations(false);
            setConcentrations([]);
        }
    }, [selectedDegree]);

    const fetchConcentrations = (degreeId) => {
        fetch(`http://localhost:5050/graduation/concentration/${degreeId}`)
            .then((response) => response.json())
            .then((data) => {
                setConcentrations(data[0].concentrations);
            })
            .catch((error) => console.error(error));
    };

    const handleConcentrationSubmit = () => {
        if (selectedDegree) {

        // Send a POST request to create a new requirement for the selected degree
        // You can use fetch or any other method you prefer
        // Update the URL and request body as needed
        fetch(`http://localhost:5050/graduation/concentration/${selectedDegree._id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newConcentration),
        })
        .then((response) => response.json())
        .then((data) => {
            onCreateConcentration(data);
            setNewConcentration({name: ""});

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

    const handleSelectConcentration = (concentration) => {
        onSelectConcentration(concentration);
        setSelectedConcentration(concentration);
        setSelectedRequirement(null);
        setShowAddNewForm(false);
    };

    const [selectedConcentration, setSelectedConcentration] = useState(null);
    const [createdRequirements, setCreatedRequirements] = useState([]);
    const [selectedRequirement, setSelectedRequirement] = useState(null);

    // Function to handle the creation of a new course
    const onCreateRequirement = (newRequirement) => {
        setCreatedRequirements([...createdRequirements, newRequirement]);
    };

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Function to get all credits for a concentration
    const concentrationTotalCredits = (concentration) => {
        let sum = 0;
        concentration.requirements.forEach((requirement) => {
            
                sum += requirement.credits;

        })
        return sum;
    }
    // Function to get all completed credits for a concentration
    const concentrationCompletedCredits = (concentration) => {
        let sum = 0;
        concentration.requirements.forEach((requirement) => {
            requirement.courses.forEach((course) => {
                if (course.is_complete) {
                    sum += course.credits;
                }
            })
        })
        return sum;
    }


    return (
        <div style={currentTheme}>
            <div className="tree-button-container">
                <div className="custom-dropdown-container">
                    <div
                        className={`custom-dropdown-header ${showDropdown ? "active" : ""}`}
                        onClick={toggleDropdown}
                    >
                        <span>
                            {selectedConcentration === "addNew" ? "Add New" : 
                            (selectedConcentration ? selectedConcentration.name : "Select a Concentration")}
                        </span>
                        <span className="dropdown-icon">{showDropdown ? " ▲" : " ▼"}</span>
                    </div>
                    {showDropdown && (
                        <div className="custom-dropdown-options">
                            <div
                                className={`custom-dropdown-option none-option ${selectedConcentration === null ? "active" : ""}`}
                                onClick={() => 
                                    {
                                        handleSelectConcentration(null)
                                        setShowAddNewForm(false) // Show the Add New form
                                        toggleDropdown()
                                    }
                                }
                            >

                            </div>
                            <div
                                className={`custom-dropdown-option ${selectedConcentration === "addNew" ? "active" : ""}`}
                                onClick={() => 
                                    {
                                        handleSelectConcentration("addNew")
                                        setShowAddNewForm(true) // Show the Add New form
                                        toggleDropdown()
                                    }
                                }
                            >
                                Add New
                            </div>
                            {concentrations.map((concentration) => (
                                <div
                                    className={`custom-dropdown-option ${selectedConcentration === concentration ? "active" : ""}`}
                                    key={concentration._id}
                                    onClick={() => 
                                        {
                                            handleSelectConcentration(concentration)
                                            toggleDropdown()
                                        }
                                    }
                                >
                                    {concentration.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {showAddNewForm ? (
                <div className="node-form">
                <label>
                    Concentration Name
                </label>
                <input
                    type="text"
                    placeholder="e.g., Cybersecurity"
                    value={newConcentration.name}
                    onChange={(e) =>
                        setNewConcentration({ ...newConcentration, name: e.target.value })
                    }
                />
                <button onClick={handleConcentrationSubmit}>
                    <AddCircleTwoToneIcon />
                </button>
            </div>
            ) : selectedConcentration ? (
                <div>
                    <div 
                        className={`tree-node-content
                            ${
                                concentrationCompletedCredits(selectedConcentration) === concentrationTotalCredits(selectedConcentration) 
                                    ? "complete-node" 
                                    : ""
                            }`
                        } 
                        onClick={() => handleSelectConcentration(selectedConcentration)}
                    >
                        <h4>{selectedConcentration.name}</h4>
                        <b className="credit-hours">{concentrationCompletedCredits(selectedConcentration)} / {concentrationTotalCredits(selectedConcentration)}</b>
                    </div>
                    <RequirementComponent
                        selectedDegree={selectedDegree}
                        selectedConcentration={selectedConcentration}
                        onSelectRequirement={(requirement) => setSelectedRequirement(requirement)}
                        onCreateRequirement={onCreateRequirement}
                        calculateTotalUpdates={calculateTotalUpdates}
                    />
                </div>
            ) : null}
            {/*
            {(selectedDegree.concentrations && selectedDegree.concentrations.length > 0) ? (
            <ul>
                {selectedDegree.concentrations.map((concentration) => (
                    <li 
                        className={`concentrations-node ${
                            selectedConcentration === concentration ? "active-node" : ""
                        }`} 
                        key={concentration._id} 
                    >
                        <div 
                            className={`tree-node-content
                                ${
                                    concentrationCompletedCredits(concentration) === concentrationTotalCredits(concentration) 
                                        ? "complete-node" 
                                        : ""
                                }`
                            } 
                            onClick={() => handleSelectConcentration(concentration)}
                        >
                            <h4>{concentration.name}</h4>
                            <b className="credit-hours">{concentrationCompletedCredits(concentration)} / {concentrationTotalCredits(concentration)}</b>
                        </div>
                        {selectedConcentration && selectedConcentration._id === concentration._id && (
                            <RequirementComponent
                                selectedDegree={selectedDegree}
                                selectedConcentration={selectedConcentration}
                                onSelectRequirement={(requirement) => setSelectedRequirement(requirement)}
                                onCreateRequirement={onCreateRequirement}
                                calculateTotalUpdates={calculateTotalUpdates}
                            />
                        )}
                    </li>
                ))}
                <li>
                    <div className="node-form">
                        <label>
                            Concentration Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Cybersecurity"
                            value={newConcentration.name}
                            onChange={(e) =>
                                setNewConcentration({ ...newConcentration, name: e.target.value })
                            }
                        />
                        <button onClick={handleConcentrationSubmit}>
                            <AddCircleTwoToneIcon />
                        </button>
                    </div>
                </li>
            </ul>
            ) : (
                <ul>
                    <li>
                        <div className="tree-node-content">No Concentrations Found</div>
                    </li>
                    <li>
                        <div className="node-form">
                            <label>
                                Concentration Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Cybersecurity"
                                value={newConcentration.name}
                                onChange={(e) =>
                                    setNewConcentration({ ...newConcentration, name: e.target.value })
                                }
                            />
                            <button onClick={handleConcentrationSubmit}>
                                <AddCircleTwoToneIcon />
                            </button>
                        </div>
                    </li>
                </ul>
            )}*/}
        </div>
    );
};

export default ConcentrationComponent;
