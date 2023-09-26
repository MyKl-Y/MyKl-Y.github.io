// RequirementComponent.js
import React, { useState, useEffect } from "react";
import CourseComponent from "./CourseComponent";

const RequirementComponent = ({ selectedDegree, onCreateRequirement, onSelectRequirement }) => {
    const [requirements, setRequirements] = useState([]);
    const [newRequirement, setNewRequirement] = useState({
        name: "",
        credits: 0,
    });
    const [hasRequirements, setHasRequirements] = useState(false);

    useEffect(()=>{
        if (selectedDegree.requirements.length > 0)
            setHasRequirements(true);
    }
    ,[selectedDegree]);

    useEffect(() => {
        if (selectedDegree && hasRequirements) {
            // Fetch requirements for the selected degree from the backend
            // You can use fetch or any other method you prefer
            // Update the URL as needed
            fetch(`http://localhost:5050/graduation/requirement/${selectedDegree._id}`)
                .then((response) => response.json())
                .then((data) => setRequirements(data))
                .catch((error) => console.error(error));
        }
    }, [selectedDegree]);

    const handleRequirementSubmit = () => {
        if (selectedDegree) {

        // Send a POST request to create a new requirement for the selected degree
        // You can use fetch or any other method you prefer
        // Update the URL and request body as needed
        fetch(`http://localhost:5050/graduation/requirement/${selectedDegree._id}`, {
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
            setTimeout(() => {
                window.location.reload();
            }, 500);
        })
        .catch((error) => console.error(error));
        }
    };

    const handleSelectRequirement = (requirement) => {
        onSelectRequirement(requirement);
        setSelectedRequirement(requirement);
    };

    const [selectedRequirement, setSelectedRequirement] = useState(null);
    const [createdCourses, setCreatedCourses] = useState([]);

    // Function to handle the creation of a new course
    const onCreateCourse = (newCourse) => {
        setCreatedCourses([...createdCourses, newCourse]);
    };

    return (
        <div>
            {/*<h2>Requirements for {selectedDegree.name}</h2>*/}
            {(selectedDegree.requirements && selectedDegree.requirements.length > 0) ? (
            <ul>
                {selectedDegree.requirements.map((requirement) => (
                    <li className="requirements-node" key={requirement._id} onClick={() => handleSelectRequirement(requirement)}>
                        {requirement.name}
                        {requirement.credits}
                        {selectedRequirement && selectedRequirement._id === requirement._id && (
                            <CourseComponent 
                                selectedDegree={selectedDegree}
                                selectedRequirement={selectedRequirement} 
                                onCreateCourse={onCreateCourse}
                            />
                        )}
                    </li>
                ))}
                <li>
                    <input
                        type="text"
                        placeholder="Enter a new requirement name"
                        value={newRequirement.name}
                        onChange={(e) =>
                            setNewRequirement({ ...newRequirement, name: e.target.value })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Enter credits"
                        value={newRequirement.credits}
                        onChange={(e) =>
                            setNewRequirement({
                            ...newRequirement,
                            credits: parseInt(e.target.value, 10),
                            })
                        }
                    />
                    <button onClick={handleRequirementSubmit}>Add Requirement</button>
                </li>
            </ul>
            ) : (
                <p>No requirements found</p>
            )}
        </div>
    );
};

export default RequirementComponent;
