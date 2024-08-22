// ConcentrationComponent.js
import React, { useState, useEffect, useCallback } from "react";
import RequirementComponent from "./RequirementComponent";
import { useTheme } from '../../../../context/theme/ThemeContext';
import { AddCircleTwoTone, DeleteTwoTone, EditTwoTone } from '@mui/icons-material';

const ConcentrationComponent = ({ selectedDegree, onCreateConcentration, onSelectConcentration, calculateTotalUpdates }) => {
    const { currentTheme } = useTheme();

    const [concentrations, setConcentrations] = useState([]);
    const [newConcentration, setNewConcentration] = useState({
        name: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [concentrationToEdit, setConcentrationToEdit] = useState(null);
    const [hasConcentrations, setHasConcentrations] = useState(true);

    const fetchConcentrations = useCallback((degreeId) => {
        if (concentrations.length === 0) {
            fetch(`http://student-dashboard.onrender.com/graduation/concentration/${degreeId}`)
                .then((response) => response.json())
                .then((data) => {
                    setConcentrations(data[0].concentrations);
                })
                .catch((error) => console.error(error));
        }
    }, [concentrations]);

    useEffect(() => {
        if (selectedDegree && selectedDegree.concentrations.length > 0 && hasConcentrations) {
            setHasConcentrations(true);
            fetchConcentrations(selectedDegree._id);
        } else {
            setHasConcentrations(false);
            setConcentrations([]);
        }
    }, [selectedDegree, hasConcentrations, fetchConcentrations]);

    const handleConcentrationSubmit = () => {
        if (selectedDegree) {
            const url = editMode
                ? `http://student-dashboard.onrender.com/graduation/concentration/${selectedDegree._id}/${concentrationToEdit._id}`
                : `http://student-dashboard.onrender.com/graduation/concentration/${selectedDegree._id}`;
            const method = editMode ? "PUT" : "POST";
            fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newConcentration),
            })
            .then((response) => response.json())
            .then((data) => {
                if (editMode) {
                    setConcentrations(concentrations.map((concentration) => concentration._id === concentrationToEdit._id ? data : concentration));
                    setEditMode(false);
                    setConcentrationToEdit(null);
                } else {
                    onCreateConcentration(data);
                    setConcentrations([...concentrations, data]);
                }
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

    const handleEdit = (concentration) => {
        setEditMode(true);
        setConcentrationToEdit(concentration);
        setNewConcentration(concentration);
    };

    const handleDelete = (concentrationId) => {
        fetch(`http://student-dashboard.onrender.com/graduation/concentration/${selectedDegree._id}/${concentrationId}`, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then((data) => {
            setConcentrations(concentrations.filter((concentration) => concentration._id !== concentrationId));
            calculateTotalUpdates(1);
        })
        .catch((error) => console.error(error));
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
        <div className="tree-container" style={currentTheme}>
            <div className="tree-button-container">
                {selectedConcentration && (
                    <>
                        <button className="delete-button" onClick={() => handleDelete(selectedConcentration._id)}>
                            <DeleteTwoTone />
                        </button>
                        <button className="edit-button" onClick={() => handleEdit(selectedConcentration)}>
                            <EditTwoTone />
                        </button>
                    </>
                )}
                <div className="custom-dropdown-container">
                    <div
                        className={`custom-dropdown-header ${showDropdown ? "active" : ""}`}
                        onClick={toggleDropdown}
                    >
                        <span>
                            {selectedConcentration === "addNew" ? "Add New" : 
                            (selectedConcentration ? (
                                `${selectedConcentration.name}
                                (${concentrationCompletedCredits(selectedConcentration)}/${concentrationTotalCredits(selectedConcentration)})`
                            ) : "Select a Concentration")}
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
            {showAddNewForm || editMode ? (
                <div className="node-form">
                    <h3>{editMode ? "Edit Concentration" : "Add New Concentration"}</h3>
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
                        <AddCircleTwoTone />
                    </button>
                </div>
            ) : selectedConcentration ? (
                <RequirementComponent
                    selectedDegree={selectedDegree}
                    selectedConcentration={selectedConcentration}
                    selectedRequirement={selectedRequirement}
                    onSelectRequirement={(requirement) => setSelectedRequirement(requirement)}
                    onCreateRequirement={onCreateRequirement}
                    calculateTotalUpdates={calculateTotalUpdates}
                />
            ) : null}
        </div>
    );
};

export default ConcentrationComponent;
