import React from 'react';

const SubRequirementList = ({ courses }) => {
  return (
    <ul>
      {courses.map((course) => (
        <li key={course.name}>
          {course.name} - {course.credits} credits
        </li>
      ))}
    </ul>
  );
};

export default SubRequirementList;