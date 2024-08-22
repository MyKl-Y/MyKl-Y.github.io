import React, { useState, useEffect } from "react";
import { useTheme } from '../../../../context/theme/ThemeContext';
import { AddCircleTwoTone, CheckCircleTwoTone, CancelTwoTone, DeleteTwoTone, EditTwoTone } from '@mui/icons-material';

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

    const [editMode, setEditMode] = useState(false);
    const [courseToEdit, setCourseToEdit] = useState(null);

    const hasSelectedDegree = !!selectedDegree;
    const hasSelectedConcentration = !!selectedConcentration;
    const hasSelectedRequirement = !!selectedRequirement;

    useEffect(() => {
        if (selectedDegree) {
            fetch(`http://https://student-dashboard.onrender.com/graduation/courses/${selectedDegree._id}`)
            .then((response) => response.json())
            .then((data) => {
                setAllCourses(data);
            })
            .catch((error) => console.error(error));
            if (hasSelectedConcentration && hasSelectedRequirement && selectedRequirement.courses.length > 0) {
                fetch(`http://https://student-dashboard.onrender.com/graduation/course/${selectedDegree._id}/${selectedConcentration._id}/${selectedRequirement._id}`)
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
            const url = editMode
                ? `http://https://student-dashboard.onrender.com/graduation/course/${selectedDegree._id}/${selectedConcentration._id}/${selectedRequirement._id}/${courseToEdit._id}`
                : `http://https://student-dashboard.onrender.com/graduation/course/${selectedDegree._id}/${selectedConcentration._id}/${selectedRequirement._id}`;
            const method = editMode ? "PUT" : "POST";
            fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCourse),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (editMode) {
                        setCourses(courses.map((course) => course._id === courseToEdit._id ? data : course));
                        setEditMode(false);
                        setCourseToEdit(null);
                    } else {
                        onCreateCourse(data);
                        setCourses([...courses, data]);
                    }
                    setNewCourse({ code: "", name: "", credits: 0, prerequisites: [] });
                    calculateTotalUpdates(1);
                })
                .catch((error) => console.error(error));
        }
    };

    const handleEdit = (course) => {
        setEditMode(true);
        setCourseToEdit(course);
        setNewCourse(course);
    };

    const handleDelete = (courseId) => {
        fetch(`http://https://student-dashboard.onrender.com/graduation/course/${selectedDegree._id}/${selectedConcentration._id}/${selectedRequirement._id}/${courseId}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                setCourses(courses.filter((course) => course._id !== courseId));
                calculateTotalUpdates(1);
            })
            .catch((error) => console.error(error));
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

        fetch(`http://https://student-dashboard.onrender.com/graduation/course/${selectedDegree._id}/${selectedConcentration._id}/${selectedRequirement._id}/${selectedCourse._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCourse),
        })
            .then((response) => response.json())
            .then((data) => {
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
                {selectedCourse === "addNew" 
                    ? <button className="toggle-completion-button complete" disabled><CancelTwoTone/></button> 
                    : (selectedCourse 
                        ? (
                            <>
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
                                <button
                                    className="delete-button"
                                    onClick={() => {
                                        handleDelete(selectedCourse._id);
                                        setSelectedCourse(null);
                                    }}
                                >
                                    <DeleteTwoTone/>
                                </button>
                                <button
                                    className="edit-button"
                                    onClick={() => {
                                        handleEdit(selectedCourse);
                                        setShowAddNewForm(true);
                                    }}
                                >
                                    <EditTwoTone/>
                                </button>
                            </>)
                        : <button className="toggle-completion-button complete" disabled><CancelTwoTone/></button>
                )}
                <div className="custom-dropdown-container">
                    <div
                        className={`custom-dropdown-header ${showDropdown ? "active" : ""}`}
                        onClick={toggleDropdown}
                    >
                        <span>
                            {selectedCourse === "addNew" ? "Add New" : 
                            (selectedCourse ? 
                                `${selectedCourse.code}: ${selectedCourse.name} (${
                                    selectedCourse.is_complete 
                                        ? selectedCourse.credits+"/"+selectedCourse.credits
                                        : isRequirementDone
                                            ? "Not Needed"
                                            : "0/"+selectedCourse.credits
                                })` 
                                : "Select a Course")}
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
                    <h3>{editMode ? "Edit Course" : "Add New Course"}</h3>
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
                </div>
            ) : null}
        </div>
    );
};

export default CourseComponent;
