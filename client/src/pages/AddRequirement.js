import React, { useState } from 'react';
import './AddRequirement.scss';
import '../index.scss';
const AddRequirement = () => {
  const [requirement, setRequirement] = useState({ title: '', description: '', minScore: 0, maxScore: 0, onlyForMentors: true,  scopeType: ''});
  const [requirements, setRequirements] = useState({basicScope: [], advancedScope: [], extraScope: []});

  return(
    <div className="AddRequirement">
      <h1>Create new requirement</h1>
      <button>Add requirement</button>
    </div>
  );
};

export default AddRequirement;
