// GPACalculator.js
import React, { useState, useEffect, useCallback } from "react";
import { motion } from 'framer-motion';
import { useTheme } from '../../../../context/theme/ThemeContext';
import { 
    RemoveCircleTwoTone,
    AddCircleTwoTone,
} from '@mui/icons-material';
import '../../../../styles/grades.css';

const SingleGPACalculator = ({ id, onDelete }) => {
    const { currentTheme } = useTheme();

    const [courses, setCourses] = useState([
        { id: 1, name: "", grade: "", credits: null },
    ]);
    const [roundValue, setRoundValue] = useState(2);
    const [calculatedGPA, setCalculatedGPA] = useState(0);
    const [totalCredits, setTotalCredits] = useState(0);
    const [previousGPA, setPreviousGPA] = useState(0);
    const [previousCredits, setPreviousCredits] = useState(0);
    const [usePercentage, setUsePercentage] = useState(false);

    const handlePreviousGPAChange = (event) => {
        setPreviousGPA(parseFloat(event) || 0);
    };

    const handlePreviousCreditsChange = (event) => {
        setPreviousCredits(parseInt(event, 10) || 0);
    };

    const handleRoundChange = (event) => {
        setRoundValue(parseFloat(event.target.value) || 0);
    };

    const handleToggleGradingSystem = () => {
        setUsePercentage(!usePercentage);
    };

    const determinePoints = useCallback((grade) => {
        if (!usePercentage) {
            switch (grade.toLowerCase()) {
                case "a+":
                    return 4.0;
                case "a":
                    return 4.0;
                case "a-":
                    return 3.7;
                case "b+":
                    return 3.3;
                case "b":
                    return 3.0;
                case "b-":
                    return 2.7;
                case "c+":
                    return 2.3;
                case "c":
                    return 2.0;
                case "c-":
                    return 1.7;
                case "d+":
                    return 1.3;
                case "d":
                    return 1.0;
                case "d-":
                    return 0.7;
                case "f":
                    return 0.0;
                default:
                    return 0.0;
            }
        } else {
            // Convert percentage to GPA points
            const percentage = parseFloat(grade);
            if (percentage >= 93) {
                return 4.0;
            } else if (percentage >= 90) {
                return 3.7;
            } else if (percentage >= 87) {
                return 3.3;
            } else if (percentage >= 83) {
                return 3.0;
            } else if (percentage >= 80) {
                return 2.7;
            } else if (percentage >= 77) {
                return 2.3;
            } else if (percentage >= 73) {
                return 2.0;
            } else if (percentage >= 70) {
                return 1.7;
            } else if (percentage >= 67) {
                return 1.3;
            } else if (percentage >= 65) {
                return 1.0;
            } else {
                return 0.0;
            }
        }
    }, [usePercentage]);

    useEffect(() => {
        const credits = courses.reduce((acc, course) => acc + course.credits, 0);
        setTotalCredits(credits + previousCredits);
        if (totalCredits > 0) {
            const qualityPoints = courses.reduce((acc, course) => acc + (determinePoints(course.grade) * course.credits), 0);
            let gpa = (qualityPoints + previousGPA * previousCredits) / (credits + previousCredits);
            setCalculatedGPA(gpa);
        }
    }, [courses, previousCredits, previousGPA, totalCredits, determinePoints]);

    const handleCourseChange = (index, field, value) => {
        const newCourses = courses.map((course, i) => {
            if (i === index) {
                if (field === 'grade') {
                    return { ...course, [field]: value, points: determinePoints(value) };
                } else {
                    return { ...course, [field]: field === 'name' ? value : parseFloat(value) || 0 };
                }
            }
            return course;
        });
        setCourses(newCourses);
    };

    const addCourse = () => {
        setCourses([
            ...courses, 
            { id: courses.length + 1, name: "", grade: "", credits: 0 }
        ]);
    };

    const removeCourse = (index) => {
        const newCourses = courses.filter((_, i) => i !== index);
        setCourses(newCourses);
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
    
    return (
        <motion.div 
            className="gpa-calculator" 
            style={currentTheme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
        >
            <div className="calculator-header">
                <h1>GPA Calculator {id}</h1>
                <button className="remove-calculator" onClick={() => onDelete(id)}>
                    <RemoveCircleTwoTone />
                </button>
            </div>
            <div className="toggle-switch">
                <input
                    id={`grade-toggle ${id}`}
                    type="checkbox"
                    checked={usePercentage}
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
                        background:'var(--accent-gradient)',
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
                        left: usePercentage ? '30px' : '4px',
                        transition: 'left 0.2s',
                        fontSize: '.75rem',
                        color: 'var(--text-color)',
                        textAlign: 'center',
                        paddingTop: '.15rem',
                        boxShadow: 'inset .2rem .2rem .5rem 0rem var(--dark-shadow), inset -.2rem -.2rem .5rem 0rem var(--light-shadow)',
                    }}>
                        {usePercentage ? "%" : "A+"}
                    </span>
                </label>
            </div>
            <h2>Courses:</h2>
            {courses.map((course, index) => (
                <div key={course.id} className="gpa-courses">
                    <input 
                        type="text" 
                        placeholder={`Course #${course.id}`} 
                        value={course.name} 
                        onChange={(event) => handleCourseChange(index, "name", event.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder={`${usePercentage ? "Number" : "Letter"} Grade`} 
                        onChange={(event) => handleCourseChange(index, "grade", event.target.value)} 
                    />
                    <input 
                        type="number" 
                        placeholder="Credits" 
                        onChange={(event) => handleCourseChange(index, "credits", event.target.value)} 
                    />
                    <button onClick={() => removeCourse(index)} className="remove">
                        <RemoveCircleTwoTone/>
                    </button>
                </div>
            ))}
            <button onClick={addCourse} className="add">
                <AddCircleTwoTone />
                Add Course
            </button>
            <div className="additional-parameters">
                <label className="previous-gpa">
                    <h2>Previous Cumulative GPA/Credits:</h2>
                    <input
                        type="number"
                        placeholder="Previous GPA"
                        onChange={(event) => handlePreviousGPAChange(event.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Previous Credits"
                        onChange={(event) => handlePreviousCreditsChange(event.target.value)}
                    />
                </label>
                <label className="radio">
                    <h2>Round results to:</h2>
                    <input
                        type="radio"
                        id={`radio3 ${id}`}
                        value="0"
                        name={`roundTo ${id}`}
                        checked={roundValue === 0}
                        onChange={handleRoundChange}
                    />
                    <label style={{borderRadius:'.5rem 0rem 0rem .5rem'}} htmlFor={`radio3 ${id}`}>0</label>
                    <input
                        type="radio"
                        id={`radio4 ${id}`}
                        value="1"
                        name={`roundTo ${id}`}
                        checked={roundValue === 1}
                        onChange={handleRoundChange}
                    />
                    <label style={{borderRadius:'0rem 0rem 0rem 0rem'}} htmlFor={`radio4 ${id}`}>1</label>
                    <input
                        type="radio"
                        id={`radio5 ${id}`}
                        value="2"
                        name={`roundTo ${id}`}
                        checked={roundValue === 2}
                        onChange={handleRoundChange}
                    />
                    <label style={{borderRadius:'0rem .5rem .5rem 0rem'}} htmlFor={`radio5 ${id}`}>2</label>
                </label>
            </div>
            <div className="calculated-gpa">
                <label>
                    <h2>Calculated GPA:</h2>
                    <input type="number" value={roundTo(calculatedGPA,roundValue)} disabled />
                </label>
                <label>
                    <h2>Total Credits:</h2>
                    <input type="number" value={totalCredits} disabled />
                </label>
            </div>
        </motion.div>
    )
}

export default SingleGPACalculator;