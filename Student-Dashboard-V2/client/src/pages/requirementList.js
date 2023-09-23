import React from 'react';
import SubRequirementList from './subrequirementList';

const RequirementList = ({ requirements }) => {
  return (
    <ul>
      {requirements.map((requirement) => (
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
  );
};

export default RequirementList;