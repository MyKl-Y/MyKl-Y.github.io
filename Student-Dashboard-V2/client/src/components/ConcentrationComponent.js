// ConcentrationComponent.js
import React, { useState, useEffect } from "react";
import RequirementComponent from "./RequirementComponent";
import { useTheme } from '../context/ThemeContext';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

const ConcentrationComponent = ({ selectedDegree, onCreateConcentration, onSelectConcentration, calculateTotalUpdates }) => {
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
        onSelectConcentration(concentration);
        setSelectedConcentration(concentration);
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


    return (
        <div style={componentStyle}>
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
                        <div className="tree-node-content" onClick={() => handleSelectConcentration(concentration)}>
                            <h4>{concentration.name}</h4>
                            <br/>Required Credits: <b>{concentrationTotalCredits(concentration)}</b>
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
                        <input
                            type="text"
                            placeholder="Name"
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
                            <input
                                type="text"
                                placeholder="Name"
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
