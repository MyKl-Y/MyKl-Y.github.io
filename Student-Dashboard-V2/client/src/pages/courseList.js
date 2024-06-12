import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useAuth } from "../context/authentication/AuthContext";
import { useTheme } from '../context/theme/ThemeContext';
import CourseCreate from "../components/features/Courses/CourseList/courseCreate";
import CourseEdit from "../components/features/Courses/CourseList/courseEdit";
import { Chip } from "@mui/material";
import "../styles/courseList.css";
import {
    DeleteTwoTone,
    EditTwoTone,
    CreateNewFolderTwoTone,
} from '@mui/icons-material'
import { motion } from "framer-motion";

function Courses() {
    const { currentTheme, } = useTheme();
    const { user } = useAuth();
    const isLoggedIn = !!user;
    
    const [isACourseSelected, setIsACourseSelected] = useState(false);

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelect] = useState(null);
    //const [showCreateForm, setShowCreateForm] = useState(false);
    //const [selectedSemester, setSelectedSemester] = useState("All Semesters"); // Track the selected semester
    const [selectedSemesters, setSelectedSemesters] = useState(["All Semesters"]); // Track the selected semesters
    //const { user } = useAuth();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Track modal state
    const [selectedCourseInfo, setSelectedCourseInfo] = useState(null);
    const [isCourseInfoVisible, setIsCourseInfoVisible] = useState(false);

    // Function to fetch courses from the backend
    const fetchCourses = async () => {
        if (!isLoggedIn) return;
        try {
            const response = await fetch(`http://localhost:5050/courses/user/${user.name}`);
            if (!response.ok) {
                throw new Error("Failed to fetch courses");
            }
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error("Error fetching courses: ", error);
        }
    };

    useEffect(() => {
        // Fetch courses when the component mounts
        fetchCourses();
    }, [isLoggedIn, user]);

    // Function to add a new course
    const addCourse = async (newCourse) => {
        try {
            const response = await fetch("http://localhost:5050/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCourse),
            });
            if (!response.ok) {
                throw new Error("Failed to create course");
            }
            const createdCourse = await response.json();
            setCourses((prevCourses) => [...prevCourses, createdCourse]);

            // Delay for 2 seconds, then reload the page on success
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error("Error creating course: ", error);
        }
    };

    // Function to update an existing course
    const updateCourse = async (editedCourse) => {
        try {
            const response = await fetch(`http://localhost:5050/courses/${editedCourse._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify(editedCourse),
            });
            if (!response.ok) {
                throw new Error("Failed to update course");
            }
            const updatedCourse = await response.json();
            setCourses((prevCourses) =>
                prevCourses.map((course) => 
                    course._id === updatedCourse._id ? updatedCourse : course
                )
            );
            setSelect(null);

            // Delay for 2 seconds, then reload the page on success
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error("Error updating course: ", error);
        }
    };

    // Function to delete a course
    const deleteCourse = (courseId) => {
        // Optimistically update the UI by removing the course from the list
        const updatedCourses = courses.filter((course) => course._id !== courseId);
        setCourses(updatedCourses);

        // Make the DELETE request
        fetch(`http://localhost:5050/courses/${courseId}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                // Check if the delete operation was successful
                if (data.success) {
                    // Course was successfully deleted on the server
                    // No further action needed in this case
                    // Delay for 2 seconds, then reload the page on success
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    // If there was an error, revert the UI to the previous state
                    setCourses((prevCourses) => [...prevCourses, { _id: courseId, ...data.course }]);
                }
            })
            .catch((error) => {
                console.error("Error deleting course:", error);
                // If there was an error with the request, revert the UI to the previous state
                setCourses((prevCourses) => [...prevCourses, { _id: courseId }]);
            });
    };

    // Function to select a course
    const selectCourse = (courseId) => {
        setSelect(courseId);
    };

    // Function to deselect a course
    const deselectCourse = () => {
        setSelect(null);
    };

    // Group courses by semester
    const groupedCourses = courses.reduce((acc, course) => {
        if (!acc[course.semester]) {
            acc[course.semester] = [];
        }
        acc[course.semester].push(course);
        return acc;
    }, {});

    const semesterOptions = [
        "All Semesters", 
        "Fall 2022",
        "Spring 2023",
        "Summer 2023",
        "Fall 2023",
        "Spring 2024",
        "Summer 2024",
        "Fall 2024",
        "Spring 2025",
        "Summer 2025",
        "Fall 2025",
        "Spring 2026",
    ];

    // Sort courses alphabetically within each semester
    const sortedCourses = {};
    Object.keys(groupedCourses).forEach((semester) => {
        sortedCourses[semester] = groupedCourses[semester].sort((a, b) =>
            a.courseName.localeCompare(b.courseName)
        );
    });

    // Get unique semesters
    const uniqueSemesters = ["All Semesters", ...Object.keys(groupedCourses)];


    // Function to handle clicking on a semester chip
    const handleSemesterClick = (semester) => {
        setSelectedSemesters((prevSelectedSemesters) => {
            if (semester === "All Semesters") {
                // If "All Semesters" chip is clicked, clear all selections
                return ["All Semesters"];
            } else {
                const updatedSelections = prevSelectedSemesters.includes(semester)
                    ? prevSelectedSemesters.filter((s) => s !== semester)
                    : [...prevSelectedSemesters, semester];
        
                if (updatedSelections.length === semesterOptions.length - 1) {
                    // If all other semester chips are selected, select "All Semesters"
                    return ["All Semesters"];
                } else if (updatedSelections.length === 0) {
                    // If all semester chips are deselected, select "All Semesters"
                    return ["All Semesters"];
                } else {
                    // Remove "All Semesters" if it was previously selected
                    return updatedSelections.filter((s) => s !== "All Semesters");
                }
            }
        });
    };

    // Function to check if a semester chip is selected
    /*const isSemesterSelected = (semester) => {
        return selectedSemesters.includes(semester);
    };*/

    // Filter courses based on selected semesters
    const filteredCourses = selectedSemesters.includes("All Semesters")
        ? courses
        : courses.filter((course) => selectedSemesters.includes(course.semester));

    // Function to open the "Create Course" modal
    const openCreateModal = () => {
        console.log("Opening modal");

        setIsCreateModalOpen(true);

        console.log("Opened modal");
    };

    // Function to close the "Create Course" modal
    const closeCreateModal = () => {
        console.log("Closing modal");

        setIsCreateModalOpen(false);
        
        console.log("Closed modal");
    };

    // Create a function to get the index of a semester in semesterOptions
    const getSemesterIndex = (semester) => {
        return semesterOptions.indexOf(semester);
    };

    // Sort uniqueSemesters based on the custom order defined in semesterOptions
    const sortedUniqueSemesters = [...uniqueSemesters].sort((a, b) => {
        const indexA = getSemesterIndex(a);
        const indexB = getSemesterIndex(b);
        return indexA - indexB;
    });

    // Function to show additional information for a course when clicked
    const showCourseInfo = (courseId) => {
        setSelectedCourseInfo(courseId);
        setIsACourseSelected(true);
        setIsCourseInfoVisible(true);
    };

    // Function to hide additional information
    const hideCourseInfo = () => {
        setSelectedCourseInfo(null);
        setIsACourseSelected(false);
        setIsCourseInfoVisible(false);
    };

    function getImageURL(courseTag) {
        // Adjust these paths to match your actual image file locations
        const imagePaths = {
            'Computing': '/images/computing.jpg',
            'Engineering': '/images/engineering.jpeg',
            'Math': '/images/math.jpg',
            'Science': '/images/science.jpg',
            'Business': '/images/business.jpg',
            'Social Science': '/images/social-science.jpg',
            'Foreign Language': '/images/foreign-language.jpg',
            'English': '/images/bookshelf.jpg',
            // Add paths for other tags
            'default': '/images/bookshelf.jpg', // Default image if no tag matches
        };
    
        return imagePaths[courseTag] || imagePaths['default'];
    }
    
    return (
            <motion.div 
                className="courses-container" 
                style={currentTheme}
                key='dashboard'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .5 }}
            >
                <div className="course-toolbar">
                <button className="create-course" onClick={openCreateModal}>
                    <CreateNewFolderTwoTone />
                </button>
                <div className="semester-filters">
                    {sortedUniqueSemesters.map((semester) => (
                        <Chip
                            key={semester}
                            label={semester}
                            onClick={() => handleSemesterClick(semester)}
                            //color={selectedSemesters.includes(semester) ? "primary" : "default"}
                            //variant={selectedSemesters.includes(semester) ? "default" : "outlined"}
                            //color={isSemesterSelected(semester) ? "primary" : "default"}
                            //variant={isSemesterSelected(semester) ? "default" : "outlined"}
                            className={selectedSemesters.includes(semester) ? "active-tab" : "inactive-tab"}
                        />
                    ))}
                </div>
                </div>
                <ReactModal
                    isOpen={isCreateModalOpen}
                    onRequestClose={closeCreateModal}
                    ariaHideApp={false} // Disable the warning about appElement
                    contentLabel="Create Course Modal"
                    style={{
                        overlay: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.25)'
                        }
                    }}
                    className="custom-modal" // Add a custom class name for styling
                    overlayClassName="custom-modal-overlay" // Add a custom class name for overlay styling
                >
                    {/* Render the CreateCourseModal component */}
                    <CourseCreate onCourseCreate={addCourse} onCancel={closeCreateModal} />
                </ReactModal>
                {/*showCreateForm ? (
                    <CourseCreate onCourseCreate={addCourse} onCancel={() => setShowCreateForm(false)} />
                ) : (
                    <button className="create-course" onClick={() => setShowCreateForm(true)}>
                        <FaFolderPlus></FaFolderPlus>
                    </button>
                )*/}
                <ul className="courses-list">
                    {filteredCourses.map((course) => (
                        <li 
                            className="single-course" 
                            key={course._id}
                            onClick={
                                isACourseSelected 
                                    ? () => hideCourseInfo(course._id) 
                                    : () => showCourseInfo(course._id)
                            }
                        >
                            {selectedCourse === course._id ? (
                                <CourseEdit
                                    course={course}
                                    onUpdateCourse={updateCourse}
                                    onCancel={deselectCourse}
                                />
                            ) : (
                                <div>
                                    <div className="image-container">
                                        <img 
                                            src={process.env.PUBLIC_URL + getImageURL(course.tag)} 
                                            alt={course.title}
                                            className="course-image"
                                        />
                                    </div>
                                    <h3>{course.courseName}</h3>
                                    <h5>{course.courseNumber}</h5>
                                    <div 
                                        className={`course-info 
                                            ${isCourseInfoVisible && isACourseSelected && selectedCourseInfo === course._id
                                                ? 'show' 
                                                : 'no-show'}`}
                                    >
                                        <p>
                                            <b>Credit Hours</b>: <i>{course.creditHours}</i>
                                        </p>
                                        <p>
                                            <b>Professor</b>: <i>{course.professor}</i>
                                        </p>
                                        <p>
                                            <b>Professor Contact</b>: <i>{course.professorContact}</i>
                                        </p>
                                        <p>
                                            <b>Semester</b>: <i>{course.semester}</i>
                                        </p>
                                        <p>
                                            <b>Meeting Times</b>: <i>{course.meetingTimes}</i>
                                        </p>
                                        <p>
                                            <b>Tags</b>: <i>{course.tag}</i>
                                        </p>
                                        <p>
                                            <b>Links</b>: <i>{course.link}</i>
                                        </p>
                                        <p>
                                            <b>Created By</b>: <i>{course.user}</i>
                                        </p>
                                        <div className="button-holder">
                                            <button onClick={() => selectCourse(course._id)}>
                                                <EditTwoTone />
                                            </button>
                                            <button className="delete-course" onClick={() => deleteCourse(course._id)}>
                                                <DeleteTwoTone />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </motion.div>
        );
}

export default Courses;
