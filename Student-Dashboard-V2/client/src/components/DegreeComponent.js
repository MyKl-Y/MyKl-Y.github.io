// DegreeComponent.js
import React, { useState, useEffect } from "react";
import { useTheme } from '../context/ThemeContext';
import { motion } from "framer-motion/dist/framer-motion";
import RequirementComponent from "./RequirementComponent";
import "./DegreeComponent.css";

const DegreeComponent = ({ onSelectDegree }) => {
    const [degrees, setDegrees] = useState([]);
    const [newDegree, setNewDegree] = useState("");

    useEffect(() => {
        fetch("http://localhost:5050/graduation/degree")
            .then((res) => res.json())
            .then((data) => setDegrees(data))
            .catch((error) => console.error(error));
    }, []);

    const handleDegreeSubmit = () => {
        fetch("http://localhost:5050/graduation/degree", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newDegree }),
        })
            .then((res) => res.json())
            .then((data) => {
                setDegrees([...degrees, data]);
                setNewDegree("");

                // Delay for 2 seconds, then reload the page on success
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            })
            .catch((error) => console.error(error));

    };

    const handleSelectDegree = (degree) => {
        onSelectDegree(degree);
        setSelectedDegree(degree);
    };

    const [createdRequirements, setCreatedRequirements] = useState([]);
    const [selectedRequirement, setSelectedRequirement] = useState(null);
    const [selectedDegree, setSelectedDegree] = useState(null);

    // Function to handle the creation of a new requirement
    const onCreateRequirement = (newRequirement) => {
        setCreatedRequirements([...createdRequirements, newRequirement]);
    };

    return (
        <div className="tree-container">
            <h2>Degrees</h2>
            <ul class="tree">
                {degrees.map((degree) => (
                    <li className="degree-node" key={degree._id} onClick={() => handleSelectDegree(degree)}>
                        {degree.name}
                        {selectedDegree &&
                            <RequirementComponent 
                                selectedDegree={selectedDegree} 
                                onCreateRequirement={onCreateRequirement}
                                onSelectRequirement={(requirement) => setSelectedRequirement(requirement)}
                            /> 
                        }
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Enter a new degree"
                value={newDegree}
                onChange={(e) => setNewDegree(e.target.value)}
            />
            <button onClick={handleDegreeSubmit}>Add Degree</button>
        </div>
        
    );
};

export default DegreeComponent;