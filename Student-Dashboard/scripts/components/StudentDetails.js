// StudentDetails.js
import React from 'react';
import { useStudentContext } from './StudentContext';

function StudentDetails() {
    const { selectedStudentId } = useStudentContext();

    const students = [
        {
            "id": 1,
            "name": "Michael Yim",
            "year": "Sophomore",
            "school": "University of Georgia",
            "major": "Computer Science",
            "gpa": "3.6"
        },
        {
            "id": 2,
            "name": "Lucie Kimbrell",
            "year": "Sophomore",
            "school": "Georgia State University",
            "major": "Psychology",
            "gpa": "3.0"
        }
    ];

    const selectedStudent = students.find(student => student.id === selectedStudentId);

    if (!selectedStudent) {
        return null; // Handle if selectedStudent is not found
    }

    return (
        <div>
            <h2>Student Details</h2>
            <p>Name: {selectedStudent.name}</p>
            <p>Year: {selectedStudent.year}</p>
            <p>School: {selectedStudent.school}</p>
            <p>Major: {selectedStudent.major}</p>
            <p>GPA: {selectedStudent.gpa}</p>
        </div>
    );
}

export default StudentDetails;
