import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';

function LandingPage() {
    return (
        <section className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='text-center glass-morphism'>
                        <h1 className='lead heading1'> Student </h1>
                        <h1 className='lead heading2'> Dashboard </h1>
                        <p className='lead'>
                            A simple dashboard to help students keep track of their tasks.
                        </p>
                        <Link to='/dashboard' className='btn btn-lg btn-primary mr-2'>
                            Enter
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandingPage;