// CourseComponent.js
import React, { useState, useEffect } from "react";

const CourseComponent = ({ selectedDegree, selectedRequirement, onCreateCourse }) => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        code: "",
        name: "",
        credits: 0,
    });
    // Check if selectedDegree and selectedRequirement are defined before accessing their properties
    const hasSelectedDegree = !!selectedDegree;
    const hasSelectedRequirement = !!selectedRequirement;

    // if selected degree has requirements then make selectedRequirement default to the first index
    useEffect(()=>{
        if (selectedDegree.requirements.length > 0)
            selectedDegree.selectedRequirement = selectedDegree.requirements[0];
    }
    ,[selectedDegree]);

    useEffect(() => {
        if (hasSelectedDegree && hasSelectedRequirement) {
        // Fetch courses for the selected requirement from the backend
        // You can use fetch or any other method you prefer
        // Update the URL as needed
        fetch(`http://localhost:5050/graduation/course/${selectedDegree._id}/${selectedRequirement._id}`)
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error(error));
        }
    }, [selectedDegree, selectedRequirement, hasSelectedDegree, hasSelectedRequirement]);

    const handleCourseSubmit = () => {
        if (hasSelectedDegree && hasSelectedRequirement) {

            // Send a POST request to create a new course for the selected requirement
            // You can use fetch or any other method you prefer
            // Update the URL and request body as needed
            fetch(`http://localhost:5050/graduation/course/${selectedDegree._id}/${selectedRequirement._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCourse),
            })
            .then((response) => response.json())
            .then((data) => {
                onCreateCourse(data);
                setNewCourse({code: "", name: "", credits: 0});

                // Delay for 2 seconds, then reload the page on success
                //setTimeout(() => {
                //    window.location.reload();
                //}, 500);
            })
            .catch((error) => console.error(error));
        }
    };

    return (
        <div>
            {hasSelectedDegree && (
                <div>
                    {/*<h2>Courses for {selectedDegree.name}</h2>*/}
                    {(
                        hasSelectedRequirement 
                        && selectedRequirement.courses 
                        && selectedRequirement.courses.length > 0 
                    ) ? (
                        <ul>
                            {selectedRequirement.courses.map((course) => (
                                <li className="course-node" key={course._id}>
                                    {course.name}
                                </li>
                            ))}
                        <li>
                            <input
                                type="text"
                                placeholder="Enter course code"
                                value={newCourse.code}
                                onChange={(e) =>
                                    setNewCourse({ ...newCourse, code: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Enter course name"
                                value={newCourse.name}
                                onChange={(e) =>
                                    setNewCourse({ ...newCourse, name: e.target.value })
                                }
                            />
                            <input
                                type="number"
                                placeholder="Enter credits"
                                value={newCourse.credits}
                                onChange={(e) =>
                                    setNewCourse({
                                    ...newCourse,
                                    credits: parseInt(e.target.value, 10),
                                    })
                                }
                            />
                            <button onClick={handleCourseSubmit}>Add Course</button>
                        </li>
                        </ul>
                    ) : (
                        <p>No courses found</p>
                    )}

                </div>
            )}
        </div>
    );
};

export default CourseComponent;
