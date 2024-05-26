import React, { useState } from "react";
import DegreeComponent from "../components/features/Courses/GraduationRequirements/DegreeComponent";
import { motion } from "framer-motion/dist/framer-motion";
import "../styles/DegreeComponent.css";

import DegreeGraph from "../components/features/Courses/GraduationRequirements/DegreeGraph";

const GraduationRequirements = () => {
    const [selectedDegree, setSelectedDegree] = useState(null);
    
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
            {selectedDegree && selectedDegree !== "addNew" && (
                <DegreeGraph selectedDegree={selectedDegree} />
            )}
        </motion.div>
    );
};

export default GraduationRequirements;