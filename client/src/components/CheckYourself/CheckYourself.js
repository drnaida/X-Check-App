import React, { useState } from 'react';

import './CheckYourself.scss';
import { useSelector, useDispatch } from 'react-redux';

import { Radio } from 'antd';

import { getAllMyTaskScore } from '../../store/selectors/checkYourself';
import { addDraftTask, editDraftTask, savePublishTask } from '../../store/actions/checkYourself';

const taskID = 'simple-task-v1';
const mockData = [
  {
    id: 1,
    category: 'basic',
    title: 'Design',
    items: [{ id: 1, description: 'Red button', maxScore: 30, onlyForMentors: false }]
  },
  {
    id: 2,
    category: 'advanced',
    title: 'Design',
    items: [{ id: 2, description: 'Yellow text', maxScore: 15, onlyForMentors: false }]
  },
  {
    id: 3,
    category: 'extra',
    title: 'Design',
    items: [{ id: 3, description: 'Add hover', maxScore: 10, onlyForMentors: true }]
  },
  {
    id: 4,
    category: 'fines',
    title: 'Console errors',
    items: [{ id: 4, description: 'Fetch errors', maxScore: -10, onlyForMentors: false }]
  }
];

const CheckYourSelf = () => {
  const allMyTaskScore = useSelector(state => getAllMyTaskScore(state));
  const [result, setResult] = useState({});
  const dispatch = useDispatch();
  const saveDraft = () => {
    if (allMyTaskScore.find(checklist => checklist.task === taskID)) {
      dispatch(editDraftTask({ id: taskID, data: result }));
    } else {
      dispatch(addDraftTask({ id: taskID, data: result }));
    }
  };
  const savePublish = () => {
    if (
      !allMyTaskScore.find(
        checklist => checklist.task === taskID && checklist.state === 'PUBLISHED'
      )
    ) {
      dispatch(savePublishTask({ id: taskID, data: result }));
    }
  };
  const findItem = id => {
    let foundItem;
    mockData.forEach(data => {
      if (data.items.find(item => item.id === id)) {
        foundItem = data.items.find(item => item.id === id);
      }
    });
    return foundItem;
  };
  const onChangeChecklist = id => e => {
    const item = findItem(id);
    setResult({ ...result, [id]: item.maxScore * e.target.value });
  };
  const onChangeInput = id => e => {
    setResult({ ...result, [id]: e.target.value });
  };
  return (
    <>
      <h2>Check yourself</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Max Score</th>
            <th>Decision</th>
            <th>Actual Score</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map(requirement => (
            <React.Fragment key={requirement.id}>
              <tr>
                <td colSpan="4">{requirement.category}</td>
              </tr>
              <tr>
                <td colSpan="4">{requirement.title}</td>
              </tr>
              {requirement.items.map(item => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.maxScore}</td>
                  {requirement.category === 'Fines' ? (
                    <td>
                      <Radio.Group onChange={onChangeChecklist(item.id)}>
                        <Radio value={0}>No</Radio>
                        <Radio value={1}>Yes</Radio>
                      </Radio.Group>
                    </td>
                  ) : (
                    <td>
                      <Radio.Group onChange={onChangeChecklist(item.id)}>
                        <Radio value={0}>Failed</Radio>
                        <Radio value={0.5}>Partially</Radio>
                        <Radio value={1}>Done</Radio>
                      </Radio.Group>
                    </td>
                  )}
                  <td>
                    <input
                      type="number"
                      max={requirement.category === 'Fines' ? 0 : item.maxScore}
                      min={requirement.category === 'Fines' ? item.maxScore : 0}
                      value={result[item.id] || 0}
                      onChange={onChangeInput(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <p>Total score:</p>
      <button type="button" onClick={saveDraft}>
        Save
      </button>
      <button type="button" onClick={savePublish}>
        Publish
      </button>
    </>
  );
};

export default CheckYourSelf;
