// ConcentrationComponent.js
import React, { useState, useEffect } from "react";
import RequirementComponent from "./RequirementComponent";
import { useTheme } from '../context/ThemeContext';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

const ConcentrationComponent = ({ selectedDegree, onCreateConcentration, onSelectConcentration, calculateTotalUpdates }) => {
    const { currentTheme, changeTheme, toggleMode } = useTheme();

    const [concentrations, setConcentrations] = useState([]);
    const [newConcentration, setNewConcentration] = useState({
        name: "",
    });
    const [hasConcentrations, setHasConcentrations] = useState(false);

    useEffect(()=>{
        if (selectedDegree.concentrations.length > 0)
            setHasConcentrations(true);
    }
    ,[selectedDegree]);

    useEffect(() => {
        if (selectedDegree && hasConcentrations) {
            // Fetch requirements for the selected degree from the backend
            // You can use fetch or any other method you prefer
            // Update the URL as needed
            fetch(`http://localhost:5050/graduation/concentration/${selectedDegree._id}`)
                .then((response) => response.json())
                .then((data) => setConcentrations(data))
                .catch((error) => console.error(error));
        }
    }, [selectedDegree]);

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

    const handleSelectConcentration = (concentration) => {
        if (selectedConcentration === concentration) {
            setSelectedConcentration(null);
            onSelectConcentration(null);
        } else {
            onSelectConcentration(concentration);
            setSelectedConcentration(concentration);
        }
    };

    const [selectedConcentration, setSelectedConcentration] = useState(null);
    const [createdRequirements, setCreatedRequirements] = useState([]);
    const [selectedRequirement, setSelectedRequirement] = useState(null);

    // Function to handle the creation of a new course
    const onCreateRequirement = (newRequirement) => {
        setCreatedRequirements([...createdRequirements, newRequirement]);
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
            {/*<h2>Requirements for {selectedDegree.name}</h2>*/}
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
            )}
        </div>
    );
};

export default ConcentrationComponent;
