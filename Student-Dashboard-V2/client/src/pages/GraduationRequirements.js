import React, { useState } from "react";
import DegreeComponent from "../components/features/Courses/GraduationRequirements/DegreeComponent";
import { motion } from "framer-motion";
import "../styles/DegreeComponent.css";

import DegreeGraph from "../components/features/Courses/GraduationRequirements/DegreeGraph";
import DegreeList from "../components/features/Courses/GraduationRequirements/DegreeList";

const GraduationRequirements = () => {
    const [selectedDegree, setSelectedDegree] = useState(null);
    const [viewType, setViewType] = useState("list");
    
    return (
        <motion.div
            className='GraduationRequirement'
            key='graduation'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
        >
            <form className="view-type-form">
                <label>List</label>
                <input 
                    type="radio" 
                    className="view-type-list"
                    defaultChecked
                    onChange={() => setViewType("list")}
                    checked={viewType === "list"}
                />
                <label>Graph</label>
                <input
                    type="radio"
                    className="view-type-graph"
                    onChange={() => setViewType("graph")}
                    checked={viewType === "graph"}
                />
            </form>
            <DegreeComponent 
                onSelectDegree={(degree) => setSelectedDegree(degree)}
                selectedType={viewType}
            />
            {selectedDegree && selectedDegree !== "addNew" && viewType === "graph" && (
                <DegreeGraph selectedDegree={selectedDegree} />
            )}
            {selectedDegree && selectedDegree !== "addNew" && viewType === "list" && (
                <DegreeList selectedDegree={selectedDegree} />
            )}
        </motion.div>
    );
};

export default GraduationRequirements;