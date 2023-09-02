// LandingPage.js
import React from 'react';
import { useStudentContext } from './StudentContext';

function LandingPage() {
    const { setShowLandingPage } = useStudentContext();

    const handleStartButtonClick = () => {
        setShowLandingPage(false);
    };

    const landingPageStyle = {
        background: 'rgba(255, 255, 255, 0.1)', /* Apply transparency */
        backdropFilter: 'blur(10px)', /* Apply blur effect */
        padding: '2rem',
        borderRadius: '20px',
        width: '300px',
        margin: '0 auto',
        textAlign: 'center',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
    };
    
    const buttonStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: 'none',
        color: 'black',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    };
    

    return (
        <div style={landingPageStyle}>
            <h2>Welcome to the Student Dashboard!</h2>
            <p>Click the button below to start exploring.</p>
            <button style={buttonStyle} onClick={handleStartButtonClick}>Enter</button>
        </div>
    );
}

export default LandingPage;
