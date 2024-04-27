// SingleGradeCalculator.js
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion/dist/framer-motion';
import { useTheme } from '../../../../context/theme/ThemeContext';
import { 
    RemoveCircleTwoTone,
    AddCircleTwoTone,
} from '@mui/icons-material';
import '../../../../styles/grades.css';

const SingleGradeCalculator = ({ id, onDelete }) => {
    const { currentTheme } = useTheme();

    const [assignments, setAssignments] = useState([
        { id: 1, name: "", grade: null, weight: null },
    ]);
    const [desiredAverage, setDesiredAverage] = useState(95); // Default Desired Average
    const [extraCredit, setExtraCredit] = useState(0);
    const [roundToValue, setRoundToValue] = useState(2);
    const [calculatedGrade, setCalculatedGrade] = useState(0);
    const [additionalGradeNeeded, setAdditionalGradeNeeded] = useState(0);
    const [usePoints, setUsePoints] = useState(false);

    useEffect(() => {
        if (usePoints) {
            const totalWeight = assignments.reduce((acc, assignment) => acc + assignment.weight, 0);
            if (totalWeight > 0) {
                const weightedGrades = assignments.reduce((acc, assignment) => acc + (assignment.grade * assignment.weight), 0);
                let averageGrade = weightedGrades / totalWeight;
                averageGrade += extraCredit;
                setCalculatedGrade(averageGrade);

                const remainingWeight = 100 - totalWeight;
                const additionalGrade = remainingWeight > 0 
                    ? (desiredAverage * 100 - weightedGrades) / remainingWeight
                    : 0;
                setAdditionalGradeNeeded(additionalGrade < 0 ? 0 : additionalGrade);
            }
        } else {
            const maxPoints = assignments.reduce((acc, assignment) => acc + assignment.weight, 0);
            if (maxPoints > 0) {
                const totalPoints = assignments.reduce((acc, assignment) => acc + assignment.grade, 0);
                let averageGrade = totalPoints / maxPoints * 100;
                setCalculatedGrade(averageGrade);
            }
        }
    }, [assignments, desiredAverage, extraCredit]);

    const handleExtraCreditChange = (event) => {
        setExtraCredit(parseFloat(event.target.value) || 0);
    };

    const handleRoundToChange = (event) => {
        setRoundToValue(parseFloat(event.target.value) || 0);
    };

    const handleAssignmentChange = (index, field, value) => {
        const newAssignments = assignments.map((assignment, i) => {
            if (i === index) {
                return { ...assignment, [field]: field === 'name' ? value : parseFloat(value) || 0 };
            }
            return assignment;
        });
        setAssignments(newAssignments);
    };

    const handleDesiredAverageChange = (event) => {
        setDesiredAverage(parseFloat(event.target.value) || 0);
    };

    const addAssignment = () => {
        setAssignments([
            ...assignments, 
            { id: assignments.length + 1, name: "", grade: 0, weight: 0 }
        ]);
    };

    const removeAssignment = (index) => {
        const newAssignments = assignments.filter((_, i) => i !== index);
        setAssignments(newAssignments);
    };

    function roundTo(n, digits) {
        var negative = false;
        if (digits === undefined) {
            digits = 0;
        }
        if (n < 0) {
            negative = true;
            n = n * -1;
        }
        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        n = (Math.round(n) / multiplicator).toFixed(digits);
        if (negative) {
            n = (n * -1).toFixed(digits);
        }
        return n;
    }

    const handleToggleGradingSystem = () => {
        setUsePoints(!usePoints);
    };
    
    return (
        <motion.div 
            className="grade-calculator" 
            style={currentTheme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
        >
            <div className="calculator-header">
                <h1>Grade Calculator {id}</h1>
                <button className="remove-calculator" onClick={() => onDelete(id)}>
                    <RemoveCircleTwoTone />
                </button>
            </div>
            <div className="toggle-switch">
                <input
                    id={`grade-toggle ${id}`}
                    type="checkbox"
                    checked={usePoints}
                    onChange={handleToggleGradingSystem}
                    style={{ display: 'none' }} // Hide the checkbox itself
                />
                <label
                    htmlFor={`grade-toggle ${id}`}
                    className="grade-toggle-container"
                    style={{
                        cursor: 'pointer',
                        display: 'inline-block',
                        width: '60px',
                        height: '34px',
                        background: 'var(--accent-gradient)',
                        position: 'relative',
                        borderRadius: '999px',
                        transition: 'background-color 0.2s',
                        boxShadow: '.2rem .2rem .5rem 0rem var(--dark-shadow), -.2rem -.2rem .5rem 0rem var(--light-shadow)',
                    }}
                >
                    <span style={{
                        display: 'block',
                        width: '26px',
                        height: '26px',
                        background: 'var(--background-color)',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '4px',
                        left: usePoints ? '30px' : '4px',
                        transition: 'left 0.2s',
                        fontSize: '.75rem',
                        color: 'var(--text-color)',
                        textAlign: 'center',
                        paddingTop: '.15rem',
                        boxShadow: 'inset .2rem .2rem .5rem 0rem var(--dark-shadow), inset -.2rem -.2rem .5rem 0rem var(--light-shadow)',
                    }}>
                        {usePoints ? "%" : "Pts"}
                    </span>
                </label>
            </div>

            <h2>Assignments:</h2>
            {assignments.map((assignment, index) => (
                <div key={assignment.id} className="assignment">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        onChange={(event) => handleAssignmentChange(index, "name", event.target.value)} 
                    />
                    {usePoints ? (
                        <>
                            <input 
                                type="number" 
                                placeholder="Grade (%)" 
                                onChange={(event) => handleAssignmentChange(index, "grade", event.target.value)} 
                            />
                            <input 
                                type="number" 
                                placeholder="Weight (%)" 
                                onChange={(event) => handleAssignmentChange(index, "weight", event.target.value)} 
                            />
                        </>
                    ) : (
                        // Assuming 'grade' in 'points' gradingType means the score achieved
                        <>
                            <input 
                                type="number" 
                                placeholder="Points" 
                                onChange={(event) => handleAssignmentChange(index, "grade", event.target.value)} 
                            />
                            <input 
                                type="number" 
                                placeholder="Max Points" 
                                onChange={(event) => handleAssignmentChange(index, "weight", event.target.value)} 
                            />
                        </>
                    )}
                    <button className="remove" onClick={() => removeAssignment(index)}>
                        <RemoveCircleTwoTone />
                    </button>
                </div>
            ))}
            {!usePoints ? (
                <div className="total">
                    <label>Total:</label>
                    <input
                        type="number"
                        placeholder="0"
                        value={assignments.reduce((acc, assignment) => acc + assignment.grade, 0)}
                        disabled
                    />
                    <input
                        type="number"
                        placeholder="0"
                        value={assignments.reduce((acc, assignment) => acc + assignment.weight, 0)}
                        disabled
                    />
                </div>
            ) : (null)}
            <button className="add" onClick={addAssignment}>
                <AddCircleTwoTone />
                Add Assignment
            </button>
            <div className="additional-parameters">
                {usePoints ? (
                    <>
                        <label className="extra-credit">
                            <h2>Extra Credit:</h2>
                            <input
                                type="number"
                                placeholder="0"
                                onChange={handleExtraCreditChange}
                            />
                        </label>
                        <label className="desired-average">
                            <h2>Desired Average:</h2>
                            <input
                                type="number"
                                className="input-average"
                                placeholder="95" 
                                onChange={handleDesiredAverageChange} 
                            />
                            <input
                                className="percent-sign"
                                value={"%"}
                                disabled
                            />
                        </label>
                    </>
                ) : (null)}
                <label className="radio">
                    <h2>Round results to:</h2>
                    <input
                        type="radio"
                        id={`radio0 ${id}`}
                        value="0"
                        name={`roundTo ${id}`}
                        checked={roundToValue === 0}
                        onChange={handleRoundToChange}
                    />
                    <label style={{borderRadius:'.5rem 0rem 0rem .5rem'}} htmlFor={`radio0 ${id}`}>0</label>
                    <input
                        type="radio"
                        id={`radio1 ${id}`}
                        value="1"
                        name={`roundTo ${id}`}
                        checked={roundToValue === 1}
                        onChange={handleRoundToChange}
                    />
                    <label style={{borderRadius:'0rem 0rem 0rem 0rem'}} htmlFor={`radio1 ${id}`}>1</label>
                    <input
                        type="radio"
                        id={`radio2 ${id}`}
                        value="2"
                        name={`roundTo ${id}`}
                        checked={roundToValue === 2}
                        onChange={handleRoundToChange}
                    />
                    <label style={{borderRadius:'0rem .5rem .5rem 0rem'}} htmlFor={`radio2 ${id}`}>2</label>
                </label>
            </div>
            <div className="calculated-grade">
                <label
                    style={
                        usePoints ? {} : {
                            width: '100%',
                            marginRight: '0px',
                        }
                    }
                >
                    <h2>Calculated Grade:</h2>
                    <input 
                        type="number" 
                        value={roundTo(calculatedGrade,roundToValue)} 
                        disabled 
                    />
                </label>
                {usePoints ? (
                    <label>
                        <h2>Additional Grade Needed:</h2>
                        <input 
                            type="number" 
                            value={roundTo(additionalGradeNeeded,roundToValue)} 
                            disabled 
                        />
                    </label>
                ) : (null)}
            </div>
        </motion.div>
    )
}

export default SingleGradeCalculator;