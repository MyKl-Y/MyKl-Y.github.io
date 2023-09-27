import React, { useState } from "react";
import DegreeComponent from "../components/DegreeComponent";
import RequirementComponent from "../components/RequirementComponent";
import CourseComponent from "../components/CourseComponent";
import { useTheme } from '../context/ThemeContext';
import { motion } from "framer-motion/dist/framer-motion";

const GraduationRequirements = () => {
    const [selectedDegree, setSelectedDegree] = useState(null);
    const [selectedRequirement, setSelectedRequirement] = useState(null);
    const [createdRequirements, setCreatedRequirements] = useState([]);
    const [createdCourses, setCreatedCourses] = useState([]);

    // Function to handle the creation of a new requirement
    const onCreateRequirement = (newRequirement) => {
        setCreatedRequirements([...createdRequirements, newRequirement]);
    };

    // Function to handle the creation of a new course
    const onCreateCourse = (newCourse) => {
        setCreatedCourses([...createdCourses, newCourse]);
    };
    
    return (
        <>
            <DegreeComponent 
                onSelectDegree={(degree) => setSelectedDegree(degree)}
            />
                {/*<div>
                selectedDegree && (
                    <>
                        <h2>Selected Degree: {selectedDegree.name}</h2>
                        <RequirementComponent 
                            selectedDegree={selectedDegree}
                            onSelectRequirement={(requirement) => setSelectedRequirement(requirement)}
                            onCreateRequirement={onCreateRequirement}
                        />
                    </>
                )*/}
                {/*selectedRequirement && (
                    <>
                        <h2>Selected Requirement: {selectedRequirement.name}</h2>
                        <CourseComponent 
                            selectedDegree={selectedDegree}
                            selectedRequirement={selectedRequirement} 
                            onCreateCourse={onCreateCourse}
                        />
                    </>
                )
                </div>*/}
        </>
    );
};

export default GraduationRequirements;