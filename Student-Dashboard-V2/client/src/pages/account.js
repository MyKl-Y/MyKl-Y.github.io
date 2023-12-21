import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion'
import { useAuth } from '../context/authentication/AuthContext';

const Account = () => {
    const { user, authLogout } = useAuth();
    const isLoggedIn = !!user;
    const navigate = useNavigate();

    const [majorOptions, setMajorOptions] = useState([]);
    const [minorOptions, setMinorOptions] = useState([]);

    const [editedUser, setEditedUser] = useState({
        userName: "",
        displayName: "",
        email: "",
        majors: [],
        minors: [],
    });
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

    function changeEditingMode() {
        setEditingMode(!editingMode);
    }

    useEffect(() => {
        fetch("http://localhost:5050/graduation/degree")
            .then((res) => res.json())
            .then((data) => {
                const userMajors = 
                    data.filter((major) => 
                        major.user === user.name && major.type.toUpperCase().includes("BACHELOR")
                    );
                const userMinors =
                    data.filter((minor) =>
                        minor.user === user.name && minor.type.toUpperCase().includes("MINOR")
                    );
                setMajorOptions(userMajors);
                setMinorOptions(userMinors);
                setEditedUser({
                    userName: user.name,
                    displayName: user.displayName,
                    email: user.email,
                    majors: [],
                    minors: [],
                })
                fetchUserData();
            })
            .catch((error) => console.error(error));
    }, [user]);

    const handleEditAccount = () => {
        if (isLoggedIn){
            fetch(`http://localhost:5050/register/account/${user.name}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedUser),
            })
            .then((response) => response.json())
            .then((data) => {
                fetchUserData();

                setEditedUser(
                    {
                        displayName: "", 
                        majors: [], 
                        minors: []
                    }
                );
            })
            .catch((error) => console.error(error));
        }
    };

    const fetchUserData = () => {
        fetch(`http://localhost:5050/register/account/${user.name}`)
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
    }


    let creditHours = [0,0];
    let findLargestCreditHour = Math.max(...creditHours);
    let largestCreditHour = [];

    creditHours.forEach((creditHour, index) => creditHour === findLargestCreditHour ? largestCreditHour.push(index): null);

    function calculateTotalCredits(major) {
        let totalCredits = 0;
        if (major) {
            major.concentrations.forEach((concentration) => {
                concentration.requirements.forEach((requirement) =>
                    requirement.courses.forEach((course) => {
                        if (course.is_complete) {
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

    return (
        <motion.div
            key='account'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5 }}
        >
            {isLoggedIn ? (
                editingMode ? (
                    <div>
                        <form>
                            <label>Display Name:</label>
                            <input 
                                type='text' 
                                name='displayname'
                                value={editedUser.displayName}
                                placeholder={"e.g., John Doe III"} 
                                onChange={(event) => 
                                    setEditedUser({
                                        ...editedUser,
                                        displayName: event.target.value
                                    })
                                }
                            />
                            <label>Current Major(s):</label>
                            <select 
                                name='majors' 
                                multiple
                                onChange={(event) => {
                                    const selectedMajors = Array.from(event.target.selectedOptions, option => option.value);
                                    setEditedUser({
                                        ...editedUser,
                                        majors: selectedMajors,
                                    });
                                }}
                            >
                                {majorOptions.map((major) => (
                                    <option value={major._id}>{major.name}</option>
                                ))}
                            </select>
                            <label>Current Minor(s):</label>
                            <select 
                                name='minors' 
                                multiple
                                onChange={(event) => {
                                    const selectedMinors = Array.from(event.target.selectedOptions, option => option.value);
                                    setEditedUser({
                                        ...editedUser,
                                        minors: selectedMinors,
                                    });
                                }}
                            >
                                {minorOptions.map((minor) => (
                                    <option value={minor._id}>{minor.name}</option>
                                ))}
                            </select>
                            <button onClick={handleEditAccount}>Submit</button>
                        </form>
                    </div>
                ) : (
                    // Inside your Account component
                    // TODO: GPA Calculation, School, Grad year, email
                    <div>
                        <h3>{currentUser.displayName} (<b><i>{currentUser.userName}</i></b>)</h3>
                        <p>
                        {/* Allow the user to select degree(s) as their current degree of pursuit from the options fetched from API */}
                        {currentUser.majors && currentUser.majors.length > 0 ? (
                            <text>
                                {currentUser.majors.map((userMajorId, index) => {
                                    const matchedMajor = majorOptions.find(
                                        (major) => major._id === userMajorId
                                    );

                                    creditHours[index] += calculateTotalCredits(matchedMajor);
                                    console.log(index);
                                    console.log(creditHours[index]);

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
                                                    {isFirst && (
                                                        <h4>
                                                            <p>
                                                                {`Current ${determineGradeClassification()} (${creditHours[findLargestCreditHour]})`}
                                                            </p>
                                                        </h4>
                                                    )}
                                                    {isFirst ? "Pursuing " : ""}
                                                    {`a ${matchedMajor.type} in ${matchedMajor.name}`}
                                                    {` (${creditHours[index]}) `}
                                                    {separator}
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
                                                <span>
                                                    {`a ${matchedMinor.type} in ${matchedMinor.name}`}
                                                    {separator}
                                                </span>
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
            <button onClick={changeEditingMode}>{editingMode ? 'Cancel' : 'Edit Account'}</button>
            <button onClick={isLoggedIn ? authLogout : navigate("/auth")}>{isLoggedIn ? 'Logout' : 'Login'}</button>
        </motion.div>
    );
};

export default Account;
