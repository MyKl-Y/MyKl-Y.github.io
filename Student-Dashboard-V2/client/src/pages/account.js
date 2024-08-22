import React, {useEffect, useState, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { useAuth } from '../context/authentication/AuthContext';
import { useSettings } from '../context/settings/SettingsContext';
import { useTheme } from '../context/theme/ThemeContext';
import '../styles/account.css';

const Account = () => {
    const { userData, authLogout } = useAuth();
    const { currentTheme } = useTheme();
    const isLoggedIn = !!userData;
    const navigate = useNavigate();
    const { getGrade } = useSettings();

    const [majorOptions, setMajorOptions] = useState([]);
    const [minorOptions, setMinorOptions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [gpa, setGpa] = useState(0);
    const [currentUser, setCurrentUser] = useState(
        {
            userName: "",
            displayName: "",
            email: "",
            majors: [],
            minors: [],
        }
    );

    const [editingMode, setEditingMode] = useState(false);

    const fetchUserData = useCallback(() => {
        if (!isLoggedIn) return;
        fetch(`https://student-dasboard.onrender.com/auth/account/${userData.name}`)
            .then((response) => response.json())
            .then((data) => {
                setCurrentUser({
                    userName: data.name,
                    displayName: data.displayName,
                    email: data.email,
                    majors: data.majors,
                    minors: data.minors,
                });
            })
            .catch((error) => console.error(error));
    }, [userData, isLoggedIn]);

    function changeEditingMode() {
        setEditingMode(!editingMode);
    }

    useEffect(() => {
        if (!isLoggedIn) return;
        fetch(`https://student-dasboard.onrender.com/graduation/degree/user/${userData.name}`)
            .then((res) => res.json())
            .then((data) => {
                const userMajors = 
                    data.filter((major) => 
                        major.user === userData.name && major.type.toUpperCase().includes("BACHELOR")
                    );
                const userMinors =
                    data.filter((minor) =>
                        minor.user === userData.name && minor.type.toUpperCase().includes("MINOR")
                    );
                setMajorOptions(userMajors);
                setMinorOptions(userMinors);
                setForm({
                    userName: userData.name,
                    displayName: userData.displayName,
                    email: userData.email,
                    majors: userData.majors,
                    minors: userData.minors,
                })
                fetchUserData();
            })
            .catch((error) => console.error(error));
        fetch(`https://student-dasboard.onrender.com/courses/user/${userData.name}`)
            .then((res) => res.json())
            .then((data) => {
                setCourses(data);
            })
            .catch((error) => console.error(error));
        let weightedGradesSum = 0;
        let totalCredits = 0;
        courses.forEach(course => {
            if (course.assignments.length > 0) {
                totalCredits += parseInt(course.creditHours);
                let grades = 0;
                course.assignments.forEach(assignment => {
                    if (!assignment.usePoints) {
                        grades += (assignment.grade / assignment.weight) * 100;
                    } else {
                        grades += (assignment.grade / 100) * assignment.weight;
                    }
                });
                weightedGradesSum += getGrade(grades) * course.creditHours;
            }
        });
        setGpa(weightedGradesSum / totalCredits);
    }, [userData, fetchUserData, courses, setCourses, getGrade, isLoggedIn]);

    async function handleEditAccount(e) {
        e.preventDefault();
        if (isLoggedIn){
            const updatedUser = {
                displayName: form.displayName,
                majors: selectedMajors,
                minors: selectedMinors,
            }
            await fetch(`https://student-dasboard.onrender.com/auth/account/${userData.name}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            })
            .then((response) => response.json())
            .then((data) => {
                fetchUserData();
                changeEditingMode();
                setForm(
                    {
                        ...updatedUser
                    }
                );
            })
            .catch((error) => console.error(error));
        }
    };

    let creditHours = [0,0];
    let findLargestCreditHour = Math.max(...creditHours);
    let largestCreditHour = [];

    creditHours.forEach((creditHour, index) => creditHour === findLargestCreditHour ? largestCreditHour.push(index): null);

    function calculateTotalCredits(major) {
        let totalCredits = 0;
        let completedCourse = new Set();
        if (major) {
            major.concentrations.forEach((concentration) => {
                concentration.requirements.forEach((requirement) =>
                    requirement.courses.forEach((course) => {
                        if (course.is_complete && !completedCourse.has(course.code)) {
                            completedCourse.add(course.code);
                            totalCredits += course.credits;
                        }
                    })
                )
            })
        }
        return totalCredits;
    }

    function determineGradeClassification() {
        if (creditHours[findLargestCreditHour] >= 90) {
            return "Senior";
        } else if (creditHours[findLargestCreditHour] >= 60) {
            return "Junior";
        } else if (creditHours[findLargestCreditHour] >= 30) {
            return "Sophomore";
        } else {
            return "Freshman";
        }
    }

    const [selectedMajors, setSelectedMajors] = useState([]);
    const [selectedMinors, setSelectedMinors] = useState([]);
    const [form, setForm] = useState({
        displayName: "",
        majors: [],
        minors: [],
    });

    const handleMajorsSelection = (event) => {
        const selectedMajors = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedMajors(selectedMajors);
        form.majors = selectedMajors;
        console.log(form);
    }

    const handleMinorsSelection = (event) => {
        const selectedMinors = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedMinors(selectedMinors);
        form.minors = selectedMinors;
    }

    const handleFormChange = (data) => {
        setForm({
            ...form,
            ...data
        });
    }

    return (
        <motion.div
            key='account'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
            style={currentTheme}
            className='account-page-container'
        >
            {isLoggedIn ? (
                editingMode ? (
                    <div>
                        <form onSubmit={handleEditAccount}>
                            <label>Display Name:</label>
                            <input 
                                type='text' 
                                name='displayname'
                                value={form.displayName}
                                placeholder={"e.g., John Doe III"} 
                                onChange={(event) => handleFormChange({ displayName: event.target.value })}
                            />
                            <label>Current Major(s):</label>
                            <select 
                                name='majors' 
                                multiple
                                onChange={(event) => handleMajorsSelection(event)}
                            >
                                {majorOptions.map((major) => (
                                    <option value={major._id}>{major.name}</option>
                                ))}
                            </select>
                            <label>Current Minor(s):</label>
                            <select 
                                name='minors' 
                                multiple
                                onChange={(event) => handleMinorsSelection(event)}
                            >
                                {minorOptions.map((minor) => (
                                    <option value={minor._id}>{minor.name}</option>
                                ))}
                            </select>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                ) : (
                    // Inside your Account component
                    // TODO: School
                    <div className='account-info'>
                        <h3>{currentUser.displayName} (<b><i>{currentUser.userName}</i></b>)</h3>
                        <h4><b>Email</b>: {currentUser.email}</h4>
                        <p>
                        {/* Allow the user to select degree(s) as their current degree of pursuit from the options fetched from API */}
                        {currentUser.majors && currentUser.majors.length > 0 ? (
                            <text>
                                {currentUser.majors.map((userMajorId, index) => {
                                    const matchedMajor = majorOptions.find(
                                        (major) => major._id === userMajorId
                                    );

                                    creditHours[index] += calculateTotalCredits(matchedMajor);

                                    const isLast = index === currentUser.majors.length - 1;
                                    const isSecondToLast = index === currentUser.majors.length - 2;
                                    const isFirst = index === 0;

                                    let separator = "";
                                    
                                    if (currentUser.majors.length === 2) {
                                        separator = isLast ? "" : " & ";
                                    } else if (currentUser.majors.length === 1) {
                                        separator = "";
                                    } else {
                                        separator = isLast ? "" : isSecondToLast ? " & " : ", ";
                                    }
                                    return (
                                        <text key={userMajorId}>
                                            {matchedMajor && (
                                                <span>
                                                    <h4>
                                                        {isFirst && (
                                                            <>
                                                                <p>
                                                                    Current <b>{determineGradeClassification()}</b> ({creditHours[findLargestCreditHour]} Credits)
                                                                </p>
                                                                <p><b>GPA</b>: {gpa.toFixed(2)}</p>
                                                                <p><b>Expected Graduation Year</b>: {new Date().getFullYear() + Math.min(Math.round((matchedMajor.credits - creditHours[findLargestCreditHour]) / 30), Math.round((matchedMajor.credits - creditHours[findLargestCreditHour]) / 42))}</p>
                                                            </>
                                                        )}
                                                        {isFirst ? "Pursuing " : ""}
                                                        a <b>{matchedMajor.type}</b> in <b>{matchedMajor.name}</b>
                                                        {` (${creditHours[index]}/${matchedMajor.credits}) `}
                                                        {separator}
                                                    </h4>
                                                </span>
                                            )}
                                        </text>
                                    );
                                })}
                            </text>
                        ) : (
                            <p>No majors selected</p>
                        )}
                        {currentUser.minors && currentUser.minors.length > 0 ? (
                            <text>
                                {"with "}
                                {currentUser.minors.map((userMinorId, index) => {
                                    const matchedMinor = minorOptions.find(
                                        (minor) => minor._id === userMinorId
                                    );
                                    const isLast = index === currentUser.minors.length - 1;
                                    const isSecondToLast = index === currentUser.minors.length - 2;
                                    //const isFirst = index === 0;

                                    let separator = "";
                                    
                                    if (currentUser.minors.length === 2) {
                                        separator = isLast ? "" : " & ";
                                    } else if (currentUser.minors.length === 1) {
                                        separator = "";
                                    } else {
                                        separator = isLast ? "" : isSecondToLast ? " & " : ", ";
                                    }
                                    return (
                                        <text key={userMinorId}>
                                            {matchedMinor && (
                                                <h4>
                                                    a <b>{matchedMinor.type}</b> in <b>{matchedMinor.name}</b>
                                                    {separator}
                                                </h4>
                                            )}
                                        </text>
                                    );
                                })}
                            </text>
                        ) : (
                            <p>No minors selected</p>
                        )}
                        </p>
                    </div>
                )
            ) : (
                <div>
                    <h3>Please login to view your account</h3>
                </div>
            )}
            <button className='edit-account' onClick={changeEditingMode}>{editingMode ? 'Cancel' : 'Edit Account'}</button>
            <button className='logout' onClick={isLoggedIn ? authLogout : navigate("/Student-Dashboard-V2/client/auth")}>{isLoggedIn ? 'Logout' : 'Login'}</button>
        </motion.div>
    );
};

export default Account;
