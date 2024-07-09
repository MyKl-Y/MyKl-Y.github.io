import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../../context/theme/ThemeContext';

//TODO: On click of course, set course as complete

const DegreeList = ({ selectedDegree }) => {
    const { currentTheme } = useTheme();
    const [degree, setDegree] = useState(null);

    const [concentrations, setConcentrations] = useState([]);
    const [selectedConcentration, setSelectedConcentration] = useState(null);
    const [showConcentrationAdd, setShowConcentrationAdd] = useState(false);
    const [newConcentration, setNewConcentration] = useState({ name: '' });

    const [requirements, setRequirements] = useState([]);
    const [selectedRequirement, setSelectedRequirement] = useState(null);
    const [showRequirementAdd, setShowRequirementAdd] = useState(false);
    const [newRequirement, setNewRequirement] = useState({ name: '', credits: 0 });

    const [courses, setCourses] = useState([]);
    const [showCourseAdd, setShowCourseAdd] = useState(false);
    const [newCourse, setNewCourse] = useState({ code: '', name: '', credits: 0, prerequisites: []});
    const [allCourses, setAllCourses] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const filteredCourses = allCourses.filter(course =>
        course.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        course.code.toLowerCase().includes(searchInput.toLowerCase())
    );

    useEffect(() => {
        if (selectedDegree) {
            setDegree(selectedDegree);
            setConcentrations(selectedDegree.concentrations);
            fetch(`http://localhost:5050/graduation/courses/${selectedDegree._id}`)
            .then((response) => response.json())
            .then((data) => {
                setAllCourses(data);
            })
            .catch((error) => console.error(error));
        }
    }, [selectedDegree]);

    const handleConcentrationSubmit = () => {
        if (selectedDegree) {
            fetch(`http://localhost:5050/graduation/concentration/${selectedDegree._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newConcentration),
            })
            .then((response) => response.json())
            .then(() => {
                setNewConcentration({name: ""});
                setConcentrations([...concentrations, newConcentration]);
            })
            .catch((error) => console.error(error));
        }
    };
    const handleRequirementSubmit = () => {
        if (selectedConcentration && selectedDegree) {
            fetch(`http://localhost:5050/graduation/requirement/${selectedDegree._id}/${selectedConcentration}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRequirement),
            })
            .then((response) => response.json())
            .then(() => {
                setRequirements([...requirements, newRequirement]);
                setNewRequirement({name: "", credits: 0});
            })
            .catch((error) => console.error(error));
        }
    };

    const handleCourseSubmit = () => {
        if (selectedDegree && selectedConcentration && selectedRequirement) {
            fetch(`http://localhost:5050/graduation/course/${selectedDegree._id}/${selectedConcentration}/${selectedRequirement}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCourse),
            })
                .then((response) => response.json())
                .then(() => {
                    setCourses([...courses, newCourse]);
                    setNewCourse({ code: "", name: "", credits: 0, prerequisites: [] });
                })
                .catch((error) => console.error(error));
        }
    };

    return (
        <div className='degree-list' style={currentTheme}>
            <ul className='degree-list-courses'>
                <li className='degree-list-title'>{degree && degree.name}</li>
                {degree && (
                    <ul>
                        {concentrations.map((concentration) => (
                            <>
                                <li 
                                    onClick={() => {
                                        if (selectedConcentration === concentration._id) {
                                            setSelectedConcentration(null);
                                            setSelectedRequirement(null);
                                            setRequirements([]);
                                        }
                                        else { 
                                            setSelectedConcentration(concentration._id);
                                            setSelectedRequirement(null);
                                            setRequirements(concentration.requirements);
                                        }
                                    }}
                                    key={concentration._id}
                                    className={`degree-list-concentration ${concentration.is_complete ? 'completed' : ''}`}
                                >{concentration.name}</li>
                                {concentration._id === selectedConcentration && (
                                    <ul>
                                        {requirements.map((requirement) => (
                                            <>
                                                <li 
                                                    onClick={() => {
                                                        if (selectedRequirement === requirement._id) {
                                                            setSelectedRequirement(null);
                                                            setCourses([]);
                                                        } else {
                                                            setSelectedRequirement(requirement._id);
                                                            setCourses(requirement.courses);
                                                        }
                                                        }}
                                                    key={requirement._id}
                                                    className={`degree-list-requirement ${requirement.is_complete ? 'completed' : ''} `}
                                                >{requirement.name}</li>
                                                {requirement._id === selectedRequirement && (
                                                    <ul>
                                                        {courses.map((course) => (
                                                            <li
                                                                key={course._id}
                                                                className={`degree-list-course ${course.is_complete || requirement.is_complete ? 'completed' : ''}`}
                                                            >
                                                                <>{course.code + ": " + course.name + " (" + course.credits + ")"}</>
                                                            </li>
                                                        ))}
                                                        <li onClick={() => {
                                                            setShowCourseAdd(!showCourseAdd);
                                                        }}>
                                                            {showCourseAdd ? 'Hide Add Course' : 'Add Course'}
                                                        </li>
                                                        {showCourseAdd && (
                                                            <ul>
                                                                <div className="node-form">
                                                                    <label>
                                                                        Course Code
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="e.g., MATH 1551"
                                                                        value={newCourse.code}
                                                                        onChange={(e) =>
                                                                            setNewCourse({ ...newCourse, code: e.target.value })
                                                                        }
                                                                    />
                                                                    <label>
                                                                        Course Name
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="e.g., Differential Calculus"
                                                                        value={newCourse.name}
                                                                        onChange={(e) =>
                                                                            setNewCourse({ ...newCourse, name: e.target.value })
                                                                        }
                                                                    />
                                                                    <label>
                                                                        Credits
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        placeholder="#"
                                                                        value={newCourse.credits}
                                                                        onChange={(e) =>
                                                                            setNewCourse({
                                                                                ...newCourse,
                                                                                credits: parseInt(e.target.value, 10),
                                                                            })
                                                                        }
                                                                    />
                                                                    <label>
                                                                        Prerequisites
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Search for prerequisites..."
                                                                        value={searchInput}
                                                                        onChange={(e) => setSearchInput(e.target.value)}
                                                                    />
                                                                    <select
                                                                        multiple
                                                                        value={newCourse.prerequisites}
                                                                        onChange={(e) =>
                                                                            setNewCourse({
                                                                                ...newCourse,
                                                                                prerequisites: Array.from(e.target.selectedOptions, (option) => option.value)
                                                                            })
                                                                        }
                                                                    >
                                                                        {filteredCourses.map((course) => (
                                                                            <option key={course._id} value={course._id}>
                                                                                {course.name} ({course.code})
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    <button onClick={handleCourseSubmit}>
                                                                        + Add Course
                                                                    </button>
                                                                </div>
                                                            </ul>
                                                        )}
                                                    </ul>
                                                )}
                                            </>
                                        ))}
                                        <li onClick={() => {
                                            setShowRequirementAdd(!showRequirementAdd);
                                        }}>
                                            {showRequirementAdd ? 'Hide Add Requirement' : 'Add Requirement'}
                                        </li>
                                        {showRequirementAdd && (
                                            <ul>
                                                <div className="node-form">
                                                    <label>
                                                        Requirement Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g., Lab Sciences"
                                                        value={newRequirement.name}
                                                        onChange={(e) =>
                                                            setNewRequirement({ ...newRequirement, name: e.target.value })
                                                        }
                                                    />
                                                    <label>
                                                        Requirement Credits
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="#"
                                                        value={newRequirement.credits}
                                                        onChange={(e) =>
                                                            setNewRequirement({
                                                            ...newRequirement,
                                                            credits: parseInt(e.target.value, 10),
                                                            })
                                                        }
                                                    />
                                                    <button onClick={handleRequirementSubmit}>
                                                        + Add Requirement
                                                    </button>
                                                </div>
                                            </ul>
                                        )}
                                    </ul>
                                )}
                            </>
                        ))}
                        <li onClick={() => {
                            setShowConcentrationAdd(!showConcentrationAdd);
                        }}>
                            {showConcentrationAdd ? 'Hide Add Concentration' : 'Add Concentration'}
                        </li>
                        {showConcentrationAdd && (
                            <ul>
                                <div className="node-form">
                                    <label>
                                        Concentration Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Cybersecurity"
                                        value={newConcentration.name}
                                        onChange={(e) =>
                                            setNewConcentration({ ...newConcentration, name: e.target.value })
                                        }
                                    />
                                    <button onClick={handleConcentrationSubmit}>
                                        + Add Concentration
                                    </button>
                                </div>
                            </ul>
                        )}
                    </ul>
                )}
            </ul>
        </div>
    );
};

export default DegreeList;
