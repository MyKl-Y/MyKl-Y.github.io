// App.js
import React from 'react';
import LandingPage from './LandingPage';
import StudentList from './StudentList';
import StudentDetails from './StudentDetails';
import { StudentProvider, useStudentContext } from './StudentContext'; // Import the context provider

function App() {
    const { selectedStudentId, showLandingPage } = useStudentContext();

    const handleStartButtonClick = () => {
        setShowLandingPage(false);
    };

    return (
        <div>
            {showLandingPage && <LandingPage onStartButtonClick={handleStartButtonClick} />}
            {!showLandingPage && selectedStudentId === null && <StudentList />}
            {!showLandingPage && selectedStudentId !== null && <StudentDetails />}
        </div>
    );
}

function AppWithContext() {
    return (
        <StudentProvider>
            <App />
        </StudentProvider>
    );
}

export default AppWithContext;
