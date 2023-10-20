// DegreeComponent.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { useTheme } from '../context/ThemeContext';
import { useAuth } from "../context/AuthContext";
import ConcentrationComponent from "./ConcentrationComponent";
import "./DegreeComponent.css";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
//import { Select, FormControl, MenuItem, OutlinedInput } from '@mui/material';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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

    const [degrees, setDegrees] = useState([]);
    const [newDegree, setNewDegree] = useState({
        name: "", 
        credits: 0, 
        user: "",
    });

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
                name: newDegree.name,
                credits: newDegree.credits,
                user: user.name,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setDegrees([...degrees, data]);
                setNewDegree({name: "", credits: 0, user: ""});

                // Delay for 2 seconds, then reload the page on success
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            })
            .catch((error) => console.error(error));

    };

    const [showAddNewForm, setShowAddNewForm] = useState(false); // Add state for Add New form


    const handleSelectDegree = (degree) => {
        onSelectDegree(degree);
        setSelectedDegree(degree);
        setShowAddNewForm(false); // Close the Add New forms
    };

    const [createdConcentrations, setCreatedConcentrations] = useState([]);
    const [selectedConcentration, setSelectedConcentration] = useState(null);
    const [selectedDegree, setSelectedDegree] = useState(null);

    // Function to handle the creation of a new concentration
    const onCreateConcentration = (newConcentration) => {
        setCreatedConcentrations([...createdConcentrations, newConcentration]);
    };

    const [showDropdown, setShowDropdown] = useState(false);
    
    // Function to toggle the custom dropdown
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    function makeAbbr(str) {
        let words = str.split(/\s+/);
        let abbreviation = '';
        for (let i = 0; i < words.length; i++) {
            abbreviation += words[i][0];
        }
        return abbreviation.toUpperCase();
    }

    const totalCredits = calculateTotalCredits(selectedDegree);

    function calculateTotalCredits(degree) {
        let total = 0;
        
        if (degree !== "addNew" && degree !== null) {
            degree.concentrations.forEach((concentration) => {
                concentration.requirements.forEach((requirement) => {
                    requirement.courses.forEach((course) => {
                        if (course.is_complete) {
                            total += course.credits;
                        }
                    })
                })
            })
        }
        return total;
    }

    return (
        <div className="tree-container" style={componentStyle}>
            <h2>Degrees</h2>
            {/*<select
                className="degree-select"
                value={selectedDegree === "addNew" ? "addNew" : (selectedDegree ? selectedDegree._id : "none")} // Use the selected degree's ID
                onChange={(e) => {
                    const selectedValue = e.target.value;
                    if (selectedValue === "addNew") {
                        setShowAddNewForm(true); // Show the Add New form
                        setSelectedDegree("addNew");
                    } else if (selectedValue === "none") {
                        setSelectedDegree(null); // Clear selected degree
                    } else {
                        const selected = degrees.find((degree) => degree._id === selectedValue);
                        handleSelectDegree(selected);
                    }
                }}
            >
                <option className="menuItem" value="none" disabled>Select a Degree</option>
                <option className="menuItem" value="addNew">Add New</option>
                {degrees.map((degree) => (
                    <option className="menuItem" key={degree._id} value={degree._id}>
                        {degree.name}
                    </option>
                ))}
            </select>*/}
            <div className="custom-dropdown-container">
                <div
                    className={`custom-dropdown-header ${showDropdown ? "active" : ""}`}
                    onClick={toggleDropdown}
                >
                    <span>
                        {
                            /*selectedDegree === "addNew" ? "Add New" : (selectedDegree ? selectedDegree.name : "Select a Degree")*/
                            selectedDegree === "addNew" 
                                ? "Add New" 
                                : 
                                    (
                                        selectedDegree 
                                            ? 
                                                <abbr
                                                    title={selectedDegree.name}
                                                >
                                                    {makeAbbr(selectedDegree.name)}
                                                </abbr>
                                            : "Select a Degree"
                                    )
                        }
                    </span>
                    <span className="dropdown-icon">{showDropdown ? " ▲" : " ▼"}</span>
                </div>
                {showDropdown && (
                    <div className="custom-dropdown-options">
                        <div
                            className={`custom-dropdown-option none-option ${selectedDegree === null ? "active" : ""}`}
                            onClick={() => 
                                {
                                    handleSelectDegree(null)
                                    setShowAddNewForm(false) // Show the Add New form
                                    toggleDropdown()
                                }
                            }
                        >

                        </div>
                        <div
                            className={`custom-dropdown-option ${selectedDegree === "addNew" ? "active" : ""}`}
                            onClick={() => 
                                {
                                    handleSelectDegree("addNew")
                                    setShowAddNewForm(true) // Show the Add New form
                                    toggleDropdown()
                                }
                            }
                        >
                            Add New
                        </div>
                        {degrees.map((degree) => (
                            <div
                                className={`custom-dropdown-option ${selectedDegree === degree ? "active" : ""}`}
                                key={degree._id}
                                onClick={() => 
                                    {
                                        handleSelectDegree(degree)
                                        toggleDropdown()
                                    }
                                }
                            >
                                {degree.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <TransformWrapper
                defaultScale={1}
                defaultPositionX={200}
                defaultPositionY={100}
                wheel={{step: 50, disabled: false}}
                options={{limitToBounds: false}}
                pinch={{step: 50, disabled: false}}
                doubleClick={{disabled: false}}
                panning={{step: 50, disabled: false}}
            >
            <TransformComponent >
                <div className="transform-container">
            <ul className="tree">
                {/*{degrees.length > 0 && degrees.map((degree) => (
                    <li 
                        className={`degree-node ${selectedDegree === degree ? "active-node" : ""}`} 
                        key={degree._id} 
                    >
                        <p className="degree-name" onClick={() => handleSelectDegree(degree)}>
                            <h3>{degree.name}</h3>
                            Credit Hours: <b>{degree.credits}</b>
                        </p>
                        {selectedDegree && selectedDegree._id === degree._id &&
                            <ConcentrationComponent 
                                selectedDegree={selectedDegree} 
                                onCreateConcentration={onCreateConcentration}
                                onSelectConcentration={(concentration) => setSelectedConcentration(concentration)}
                            /> 
                        }
                    </li>
                ))}
                <li>
                    <div className="node-form">
                        <input
                            type="text"
                            placeholder="Degree Name"
                            value={newDegree.name}
                            onChange={(e) => setNewDegree({...newDegree, name: e.target.value})}
                        />
                        <input
                            type="number"
                            placeholder="Credits"
                            value={newDegree.credits}
                            onChange={(e) =>
                                setNewDegree({
                                ...newDegree,
                                credits: parseInt(e.target.value, 10),
                                })
                            }
                        />
                        <button onClick={handleDegreeSubmit}>
                            <AddCircleTwoToneIcon />
                        </button>
                    </div>
                </li>*/}
                {showAddNewForm ? (
                <li>
                <div className="node-form">
                    <input
                        type="text"
                        placeholder="Degree Name"
                        value={newDegree.name}
                        onChange={(e) => setNewDegree({ ...newDegree, name: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Credits"
                        value={newDegree.credits}
                        onChange={(e) =>
                            setNewDegree({
                                ...newDegree,
                                credits: parseInt(e.target.value, 10),
                            })
                        }
                    />
                    <button onClick={handleDegreeSubmit}>
                        <AddCircleTwoToneIcon />
                    </button>
                </div>
                </li>
            ) : selectedDegree ? (
                <li 
                    className={`degree-node active-node`} 
                >
                        <div 
                            className={`tree-node-content
                                ${
                                    totalCredits >= selectedDegree.credits 
                                        ? "complete-node" 
                                        : ""
                                }`
                            } 
                        >
                            <h3>{selectedDegree.name}</h3>
                            Credit Hours: <b>{`${totalCredits}/${selectedDegree.credits}`}</b>
                        </div>
                        {selectedDegree &&
                            <ConcentrationComponent 
                                selectedDegree={selectedDegree} 
                                onCreateConcentration={onCreateConcentration}
                                onSelectConcentration={(concentration) => setSelectedConcentration(concentration)}
                            /> 
                        }
                    </li>
            ) : null}
            </ul>
            </div>
            </TransformComponent>
            </TransformWrapper>
        </div>
        
    );
};

export default DegreeComponent;