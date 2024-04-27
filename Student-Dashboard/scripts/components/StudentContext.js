// StudentContext.js
import React, { createContext, useContext, useState } from 'react';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [showLandingPage, setShowLandingPage] = useState(true);

    return (
        <StudentContext.Provider value={{ selectedStudentId, setSelectedStudentId, showLandingPage, setShowLandingPage }}>
            {children}
        </StudentContext.Provider>
    );
};

export const useStudentContext = () => {
    return useContext(StudentContext);
};
