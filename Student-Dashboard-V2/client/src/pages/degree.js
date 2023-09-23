import React from 'react';
import SubRequirementList from './subrequirementList';
import RequirementList from './requirementList';


const Degree = ({ degree }) => {
  return (
    <div>
      <h3>{degree.name}</h3>
      <ul>
        {degree.requirements.map((requirement) => (
          <li key={requirement.name}>
            {requirement.name}
            {requirement.subRequirements && requirement.subRequirements.length > 0 && (
              <RequirementList requirements={requirement.subRequirements} />
            )}
            {requirement.courses && requirement.courses.length > 0 && (
              <SubRequirementList courses={requirement.courses} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Degree;