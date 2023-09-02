import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="App">
        <header className="App-header">
            <p>
            This is the landing page.
            </p>
            <Link to="/dashboard">Go to Second View</Link>
        </header>
        </div>
    );
}

export default LandingPage;
