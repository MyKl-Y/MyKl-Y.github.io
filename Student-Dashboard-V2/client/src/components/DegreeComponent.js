// DegreeComponent.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { useTheme } from '../context/ThemeContext';
import { useAuth } from "../context/AuthContext";
import RequirementComponent from "./RequirementComponent";
import "./DegreeComponent.css";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

const DegreeComponent = ({ onSelectDegree }) => {
    const { user } = useAuth();
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
            body: JSON.stringify({ 
                name: newDegree,
                user: user.name,
            }),
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
        <div className="tree-container" style={componentStyle}>
            <h2>Degrees</h2>
            <ul className="tree">
                {degrees.map((degree) => (
                    <li 
                        className={`degree-node ${selectedDegree === degree ? "active-node" : ""}`} 
                        key={degree._id} 
                        onClick={() => handleSelectDegree(degree)}
                    >
                        <p className="degree-name"><h3>{degree.name}</h3></p>
                        {selectedDegree && selectedDegree._id === degree._id &&
                            <RequirementComponent 
                                selectedDegree={selectedDegree} 
                                onCreateRequirement={onCreateRequirement}
                                onSelectRequirement={(requirement) => setSelectedRequirement(requirement)}
                            /> 
                        }
                    </li>
                ))}
            </ul>
            <div className="node-form">
                <input
                    type="text"
                    placeholder="Degree Name"
                    value={newDegree}
                    onChange={(e) => setNewDegree(e.target.value)}
                />
                <button onClick={handleDegreeSubmit}>
                    <AddCircleTwoToneIcon />
                </button>
            </div>
        </div>
        
    );
};

export default DegreeComponent;