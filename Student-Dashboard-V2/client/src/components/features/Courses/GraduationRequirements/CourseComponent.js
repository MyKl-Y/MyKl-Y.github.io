import React, { useState, useEffect } from "react";
import { useTheme } from '../../../../context/theme/ThemeContext';
import { AddCircleTwoTone, CheckCircleTwoTone, CancelTwoTone } from '@mui/icons-material';

const CourseComponent = ({ selectedDegree, selectedConcentration, selectedRequirement, onCreateCourse, onSelectCourse, isRequirementDone, calculateTotalUpdates }) => {
    const { currentTheme } = useTheme();

    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        code: "",
        name: "",
        credits: 0,
        prerequisites: [],
    });
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [allCourses, setAllCourses] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const hasSelectedDegree = !!selectedDegree;
    const hasSelectedConcentration = !!selectedConcentration;
    const hasSelectedRequirement = !!selectedRequirement;

    useEffect(() => {
        if (selectedDegree) {
            fetch(`http://localhost:5050/graduation/courses/${selectedDegree._id}`)
            .then((response) => response.json())
            .then((data) => {
                setAllCourses(data);
            })
            .catch((error) => console.error(error));
            if (hasSelectedConcentration && hasSelectedRequirement && selectedRequirement.courses.length > 0) {
                fetch(`http://localhost:5050/graduation/course/${selectedDegree._id}/${selectedConcentration._id}/${selectedRequirement._id}`)
                .then((response) => response.json())
                .then((data) => {
                    setCourses(data[0].courses);
                })
                .catch((error) => console.error(error));
            } else {
                setCourses([]);
            }
        }
    }, [selectedDegree, selectedRequirement, selectedConcentration, hasSelectedDegree, hasSelectedConcentration, hasSelectedRequirement]);

    const handleCourseSubmit = () => {
        if (hasSelectedDegree && hasSelectedConcentration && hasSelectedRequirement) {
            fetch(`http://localhost:5050/graduation/course/${selectedDegree._id}/${selectedConcentration._id}/${selectedRequirement._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCourse),
            })
                .then((response) => response.json())
                .then((data) => {
                    onCreateCourse(data);
                    setNewCourse({ code: "", name: "", credits: 0, prerequisites: [] });
                    calculateTotalUpdates(1);
                })
                .catch((error) => console.error(error));
        }
    };

    const [showAddNewForm, setShowAddNewForm] = useState(false);

    const handleSelectCourse = (course) => {
        onSelectCourse(course);
        setSelectedCourse(course);
        setShowAddNewForm(false);
    };

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const [updatedCourse, setUpdatedCourse] = useState({
        code: "",
        name: "",
        credits: "",
        is_complete: false,
    });

    const toggleCourseCompleteness = (course) => {
        let updatedCourse;

        if (course.is_complete) {
            updatedCourse = {
                code: course.code,
                name: course.name,
                credits: course.credits,
                is_complete: false
            }
        } else {
            updatedCourse = {
                code: course.code,
                name: course.name,
                credits: course.credits,
                is_complete: true
            }
        }

        fetch(`http://localhost:5050/graduation/course/${selectedDegree._id}/${selectedConcentration._id}/${selectedRequirement._id}/${selectedCourse._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCourse),
        })
            .then((response) => response.json())
            .then((data) => {
                setUpdatedCourse({
                    code: "",
                    name: "",
                    credits: 0,
                    is_complete: false
                });
                calculateTotalUpdates(1);
            })
            .catch((error) => console.error(error));
    };

    const filteredCourses = allCourses.filter(course =>
        course.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        course.code.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div style={currentTheme}>
            <div className="tree-button-container">
                <div className="custom-dropdown-container">
                    <div
                        className={`custom-dropdown-header ${showDropdown ? "active" : ""}`}
                        onClick={toggleDropdown}
                    >
                        <span>
                            {selectedCourse === "addNew" ? "Add New" : 
                            (selectedCourse ? selectedCourse.name : "Select a Course")}
                        </span>
                        <span className="dropdown-icon">{showDropdown ? " ▲" : " ▼"}</span>
                    </div>
                    {showDropdown && (
                        <div className="custom-dropdown-options">
                            <div
                                className={`custom-dropdown-option none-option ${selectedCourse === null ? "active" : ""}`}
                                onClick={() => 
                                    {
                                        handleSelectCourse(null)
                                        setShowAddNewForm(false) // Show the Add New form
                                        toggleDropdown()
                                    }
                                }
                            >

                            </div>
                            <div
                                className={`custom-dropdown-option ${selectedCourse === "addNew" ? "active" : ""}`}
                                onClick={() => 
                                    {
                                        handleSelectCourse("addNew")
                                        setShowAddNewForm(true) // Show the Add New form
                                        toggleDropdown()
                                    }
                                }
                            >
                                Add New
                            </div>
                            {courses.map((course) => (
                                <div
                                    className={`custom-dropdown-option ${selectedCourse === course ? "active" : ""}`}
                                    key={course._id}
                                    onClick={() => 
                                        {
                                            handleSelectCourse(course)
                                            toggleDropdown()
                                        }
                                    }
                                >
                                    {course.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {showAddNewForm ? (
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
                    <AddCircleTwoTone/>
                </button>
            </div>
            ) : selectedCourse ? (
                <div>
                    <div 
                        className={`tree-node-content
                            ${
                                selectedCourse.is_complete ? "complete-node" : ""
                            }`
                        } 
                        onClick={() => handleSelectCourse(selectedCourse)}
                    >
                        <h6>{selectedCourse.code}</h6>
                        <b><i>{selectedCourse.name}</i></b>
                        <br/>
                        {`
                            ${
                                selectedCourse.is_complete 
                                    ? selectedCourse.credits+" / "+selectedCourse.credits
                                    : isRequirementDone
                                        ? ""
                                        : 0+" / "+selectedCourse.credits
                            }`}
                        {!isRequirementDone
                            ? 
                                <button 
                                    className={`toggle-completion-button 
                                        ${selectedCourse.is_complete ? "complete" : "incomplete"}`}
                                    onClick={() => toggleCourseCompleteness(selectedCourse)}
                                >
                                    {selectedCourse.is_complete 
                                        ? <CancelTwoTone/>
                                        : <CheckCircleTwoTone/>
                                    }
                                </button>
                            : selectedCourse.is_complete
                                ? 
                                    <button 
                                        className={`toggle-completion-button 
                                            ${selectedCourse.is_complete ? "complete" : "incomplete"}`}
                                        onClick={() => toggleCourseCompleteness(selectedCourse)}
                                    >
                                        {selectedCourse.is_complete 
                                            ? <CancelTwoTone/>
                                            : <CheckCircleTwoTone/>
                                        }
                                    </button>
                                : null
                        }
                    </div>
                </div>
            ) : null}
            {/*
            {hasSelectedDegree && hasSelectedConcentration && (
                <div>
                    {(
                        hasSelectedRequirement 
                        && selectedRequirement.courses 
                        && selectedRequirement.courses.length > 0 
                    ) ? (
                        <ul>
                            {selectedRequirement.courses.map((course) => (
                                <li 
                                    className={`course-node 
                                        ${
                                            selectedCourse === course ? "active-node" : ""
                                        }`
                                    } 
                                    key={course._id}
                                >
                                    <div 
                                        className={`tree-node-content
                                            ${
                                                course.is_complete ? "complete-node" : ""
                                            }`
                                        } 
                                        onClick={() => handleSelectCourse(course)}
                                    >
                                        <h6>{course.code}</h6>
                                        <b><i>{course.name}</i></b>
                                        <br/>
                                        {`
                                            ${
                                                course.is_complete 
                                                    ? course.credits+" / "+course.credits
                                                    : isRequirementDone
                                                        ? ""
                                                        : 0+" / "+course.credits
                                            }`}
                                        {selectedCourse === course && !isRequirementDone
                                            ? 
                                                <button 
                                                    className={`toggle-completion-button 
                                                        ${course.is_complete ? "complete" : "incomplete"}`}
                                                    onClick={() => toggleCourseCompleteness(selectedCourse)}
                                                >
                                                    {course.is_complete 
                                                        ? <CancelTwoTone/>
                                                        : <CheckCircleTwoTone/>
                                                    }
                                                </button>
                                            : course.is_complete && selectedCourse === course
                                                ? 
                                                    <button 
                                                        className={`toggle-completion-button 
                                                            ${course.is_complete ? "complete" : "incomplete"}`}
                                                        onClick={() => toggleCourseCompleteness(selectedCourse)}
                                                    >
                                                        {course.is_complete 
                                                            ? <CancelTwoTone/>
                                                            : <CheckCircleTwoTone/>
                                                        }
                                                    </button>
                                                : null
                                        }
                                    </div>
                                </li>
                            ))}
                            <li>
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
                                        <AddCircleTwoTone/>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <li>
                                <div className="tree-node-content">No Courses Found</div>
                            </li>
                            <li>
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
                                                prerequisites: Array.from(e.target.selectedOptions, (option) => option.v)
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
                                        <AddCircleTwoTone/>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    )}
                </div>
            )}*/}
        </div>
    );
};

export default CourseComponent;
