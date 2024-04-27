// StudentList.js
import React from 'react';
import { useStudentContext } from './StudentContext';

function StudentList() {
    const { setSelectedStudentId } = useStudentContext();

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

    const handleStudentClick = studentId => {
        setSelectedStudentId(studentId);
    };

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {students.map(student => (
                    <li key={student.id} onClick={() => handleStudentClick(student.id)}>
                        {student.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudentList;
