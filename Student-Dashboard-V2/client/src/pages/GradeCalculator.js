// GradeCalculator.js
import React, { useState } from "react";
import SingleGradeCalculator from "../components/features/Grades/Calculators/SingleGradeCalculator";
import { AddCircleTwoTone } from "@mui/icons-material";
import { useTheme } from '../context/theme/ThemeContext';
import '../styles/grades.css';

const GradeCalculator = () => {
    const { currentTheme } = useTheme();

    const [calculators, setCalculators] = useState([{ id: 1 }]);

    const addCalculator = () => {
        const newId = Math.max(0, ...calculators.map(c => c.id)) + 1;
        setCalculators([...calculators, { id: newId }]);
    };

    const removeCalculator = (id) => {
        setCalculators(calculators.filter(c => c.id !== id));
    };
    
    return (
        <div className="calculator-container" style={currentTheme}>
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