// GradeCalculator.js
import React, { useState, useEffect } from "react";
import SingleGradeCalculator from "../components/SingleGradeCalculator";
import { AddCircleTwoTone } from "@mui/icons-material";
import { useTheme } from '../context/ThemeContext';
import '../pages/grades.css';

const GradeCalculator = () => {
    const { isDarkMode } = useTheme();

    const componentStyle = {
        '--background': 
            isDarkMode ? 
            'linear-gradient(60deg, rgba(84,58,183,1) -100%, rgba(0,172,193,1) 200%)' : 
            'linear-gradient(60deg, rgb(53, 29, 150) -100%, rgb(1, 90, 102) 200%)',
        '--text-color': 
            !isDarkMode ? 
            'rgba(9,9,121,1)' : 
            'rgba(255,203,0, 1)',
        '--background-color': 
            !isDarkMode ? 
            'rgba(236,240,243, 1)' : 
            'rgba(12,15,19,1)',
        '--light-shadow': 
            !isDarkMode ? 
            '#fff' : 
            '#222',
        '--dark-shadow': 
            !isDarkMode ? 
            '#ccc' : 
            '#000',
        '--accent-gradient': 
            !isDarkMode ? 
            'linear-gradient(60deg, rgba(255,203,0,1) 0%, rgba(255,143,0,1) 100%)' : 
            'linear-gradient(60deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)',
        '--accent-light':
            isDarkMode ?
            'rgba(255,203,0,1)' :
            'rgba(9,9,121,1)',
        '--accent-dark':
            isDarkMode ?
            'rgba(255,143,0,1)' :
            'rgba(0,212,255,1)',
        '--primary':
            !isDarkMode ?
            'rgba(25, 101, 207, 1)':
            'rgba(255, 173, 0, 1)',
        '--add-light':
            'rgba(70,215,100,1)',
        '--add-primary':
            'rgba(40,165,70,1)',
        '--add-dark':
            'rgba(10,115,40,1)',
        '--remove-light':
            'rgba(255,100,100,1)',
        '--remove-primary':
            'rgba(200,50,50,1)',
        '--remove-dark':
            'rgba(145,0,0,1)',
    };

    const [calculators, setCalculators] = useState([{ id: 1 }]);

    const addCalculator = () => {
        const newId = Math.max(0, ...calculators.map(c => c.id)) + 1;
        setCalculators([...calculators, { id: newId }]);
    };

    const removeCalculator = (id) => {
        setCalculators(calculators.filter(c => c.id !== id));
    };
    
    return (
        <div className="calculator-container" style={componentStyle}>
            {calculators.map(calculator => (
                <>
                    <SingleGradeCalculator
                        key={calculator.id}
                        id={calculator.id}
                        onDelete={removeCalculator}
                    />
                    <br/>
                </>
            ))}
            <button className="add-calculator" onClick={addCalculator}>
                <AddCircleTwoTone />
                Add Calculator
            </button>
        </div>
    )
}

export default GradeCalculator;