// DegreeComponent.js
import React, { useState, useEffect } from "react";
import { useTheme } from '../../../../context/theme/ThemeContext';
import { useAuth } from "../../../../context/authentication/AuthContext";
import ConcentrationComponent from "./ConcentrationComponent";
import "../../../../styles/DegreeComponent.css";
import { AddCircleTwoTone, Refresh, HelpTwoTone } from '@mui/icons-material';
//import { Select, FormControl, MenuItem, OutlinedInput } from '@mui/material';
import { Badge, Tooltip } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const DegreeComponent = ({ onSelectDegree }) => {
    const { user } = useAuth();
    const { currentTheme } = useTheme();

    const [degrees, setDegrees] = useState([]);
    const [newDegree, setNewDegree] = useState({
        name: "", 
        credits: 0, 
        user: "",
        type: "",
    });

    useEffect(() => {
        fetch("http://localhost:5050/graduation/degree")
            .then((res) => res.json())
            .then((data) => {
                const userDegrees = data.filter((degree) => degree.user === user.name);
                setDegrees(userDegrees);
            })
            .catch((error) => console.error(error));
    }, [user]);

    const handleDegreeSubmit = () => {
        fetch("http://localhost:5050/graduation/degree", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                name: newDegree.name,
                credits: newDegree.credits,
                type: newDegree.type,
                user: user.name,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setDegrees([...degrees, data]);
                setNewDegree({name: "", credits: 0, type: "", user: ""});

                // Delay for 2 seconds, then reload the page on success
                //setTimeout(() => {
                //    window.location.reload();
                //}, 500);
                calculateTotalUpdates(1);
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
            const word = words[i];
            if (word !== '' && /^[A-Z][a-z]*$/.test(word)) {
                abbreviation += (words[i][0] + ".");
            }
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

    // Refresh Page Button Function
    const refreshPage = () => {
        window.location.reload();
    }

    // calculateTotalUpdates
    const [updatesCount, setUpdatesCount] = useState(0);
    const calculateTotalUpdates = (data) => {
        let total = 0;
        total += data;
        setUpdatesCount(total);
    }

    //The U.S. Department of Education recognized degrees.
    const degreeTypeAbbreviations = {
        "Minor": "Minor",

        "Associate of Arts": "A.A.",
        "Associate of Science": "A.S.",
        "Associate of Applied Science": "A.A.S.",

        "Bachelor of Architecture": "B.Arch.",
        "Bachelor of Arts": "B.A.",
        "Bachelor of Applied Arts": "B.A.A.",
        "Bachelor of Applied Science": "B.A.S.",
        "Bachelor of Business Administration": "B.B.A.",
        "Bachelor of Engineering": "B.Eng.",
        "Bachelor of Fine Arts": "B.F.A.",
        "Bachelor of Science": "B.S.",

        "Master of Arts": "M.A.",
        "Master of Architecture": "M.Arch.",
        "Master of Science": "M.S.",
        "Master of Business Administration": "M.B.A.",
        "Master of Education": "M.Ed.",
        "Master of Engineering": "M.Eng.",
        "Master of Fine Arts": "M.F.A.",
        "Master of Laws": "LL.M.",
        "Master of Public Administration": "M.P.A.",
        "Master of Public Health": "M.P.H.",
        "Master of Public Policy": "M.P.P.",
        "Master of Social Work": "M.S.W.",

        "Doctor of Education": "Ed.D.",
        "Doctor of Medicine": "M.D.",
        "Doctor of Philosophy": "Ph.D.",
        "Doctor of Psychology": "Psy.D.",
        "Doctor of Business Administration": "D.B.A.",
        "Doctor of Engineering": "D.Eng.",
        "Juris Doctor": "J.D.",
        "Doctor of Pharmacy": "Pharm.D.",
        "Doctor of Nursing Practice": "D.N.P.",
    };

    // Function to get the abbreviation for a degree type
    function getDegreeTypeAbbreviation(degreeType) {
        return degreeTypeAbbreviations[degreeType] || makeAbbr(degreeType);
    }

    // TODO: Automatically mark course complete if there is a course in the course collection with same code
    // TODO: Zoom in and out buttons
    
    return (
        <div className="tree-container" style={currentTheme}>
            <div className="tree-button-container">
                <Badge color="warning" variant="dot" invisible={1 > updatesCount}>
                    <div className="refresh-button" onClick={refreshPage}>
                            <Refresh/>
                    </div>
                </Badge>
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
                                                    /*<abbr
                                                        title={selectedDegree.name}
                                                    >
                                                        {makeAbbr(selectedDegree.name)}
                                                    </abbr>*/
                                                    selectedDegree.name
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
                                    {degree.name + ", " + getDegreeTypeAbbreviation(degree.type)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Tooltip 
                    title=
                        "Select a degree, input fields, refresh when you want to update!"
                    placement="right"
                >
                    <HelpTwoTone className="help-icon"/>
                </Tooltip>
            </div>
            <TransformWrapper
                wheel={{step: 100, disabled: false}}
                options={{limitToBounds: false}}
                pinch={{step: 50, disabled: false}}
                doubleClick={{disabled: true}}
                panning={{step: 50, disabled: false, activationKeys: ["Control"]}}
                limitToBounds={false}
                minScale={0.5}
                initialScale={.65}
                centerOnInit={true}
            >
                <TransformComponent
                    wrapperStyle={{ width: '100%', display: 'flex' }}
                    componentStyle={{ flex: 1 }}
                >
                        <ul className="tree">
                            {showAddNewForm ? (
                            <li>
                            <div className="node-form">
                                <h3>Add New Degree</h3>
                                <label>
                                    Degree Type
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Bachelor of Science"
                                    value={newDegree.type}
                                    onChange={(e) =>
                                        setNewDegree({
                                            ...newDegree,
                                            type: e.target.value,
                                        })
                                    }
                                />
                                <label>
                                    Degree Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Computer Science"
                                    value={newDegree.name}
                                    onChange={(e) => 
                                        setNewDegree({ 
                                            ...newDegree, 
                                            name: e.target.value 
                                        })
                                    }
                                />
                                <label>
                                    Number of Credits
                                </label>
                                <input
                                    type="number"
                                    placeholder="#"
                                    value={newDegree.credits}
                                    onChange={(e) =>
                                        setNewDegree({
                                            ...newDegree,
                                            credits: parseInt(e.target.value, 10),
                                        })
                                    }
                                />
                                <button onClick={handleDegreeSubmit}>
                                    <AddCircleTwoTone />
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
                                        <h3>
                                                <abbr title={selectedDegree.type}>
                                                    {getDegreeTypeAbbreviation(selectedDegree.type)}
                                                </abbr>
                                                {" in "} 
                                                {selectedDegree.name}
                                        </h3>
                                        Credit Hours: <b>{`${totalCredits}/${selectedDegree.credits}`}</b>
                                    </div>
                                    {selectedDegree &&
                                        <ConcentrationComponent 
                                            selectedDegree={selectedDegree} 
                                            onCreateConcentration={onCreateConcentration}
                                            onSelectConcentration={(concentration) => setSelectedConcentration(concentration)}
                                            calculateTotalUpdates={calculateTotalUpdates}
                                        /> 
                                    }
                                </li>
                        ) : null}
                        </ul>
                </TransformComponent>
            </TransformWrapper>
        </div>
        
    );
};

export default DegreeComponent;