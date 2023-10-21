import React, { useState } from "react";
import DegreeComponent from "../components/DegreeComponent";
import RequirementComponent from "../components/RequirementComponent";
import CourseComponent from "../components/CourseComponent";
import { useTheme } from '../context/ThemeContext';
import { motion } from "framer-motion/dist/framer-motion";
import "../components/DegreeComponent.css";

const GraduationRequirements = () => {
    const [selectedDegree, setSelectedDegree] = useState(null);
    const [selectedConcentration, setSelectedConcentration] = useState(null);
    const [selectedRequirement, setSelectedRequirement] = useState(null);
    const [createdConcentrations, setCreatedConcentrations] = useState([]);
    const [createdRequirements, setCreatedRequirements] = useState([]);
    const [createdCourses, setCreatedCourses] = useState([]);

    // Function to handle the creation of a new concentration
    const onCreateConcentration = (newConcentration) => {
        setCreatedConcentrations([...createdConcentrations, newConcentration]);
    };

    // Function to handle the creation of a new requirement
    const onCreateRequirement = (newRequirement) => {
        setCreatedRequirements([...createdRequirements, newRequirement]);
    };

    // Function to handle the creation of a new course
    const onCreateCourse = (newCourse) => {
        setCreatedCourses([...createdCourses, newCourse]);
    };
    
    return (
        <motion.div
            className='GraduationRequirement'
            key='graduation'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
        >
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
        </motion.div>
    );
};

export default GraduationRequirements;