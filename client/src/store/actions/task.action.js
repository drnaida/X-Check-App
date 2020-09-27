export const SET_TASK = 'SET_TASK';
export const ADD_REQUIREMENT = 'ADD_REQUIREMENT';
export const EDIT_REQUIREMENT = 'EDIT_REQUIREMENT';
export const ADD_TASK_NAME = 'ADD_TASK_NAME';
export const ADD_DEADLINE = 'ADD_DEADLINE';
export const DELETE_REQUIREMENT = 'DELETE_REQUIREMENT';

export function setTaskAction(task) {
  return { type: SET_TASK, payload: task };
}

export function addRequirementAction(requirement) {
  return { type: ADD_REQUIREMENT, payload: requirement };
}

export function editRequirementAction(requirements) {
  return { type: EDIT_REQUIREMENT, payload: requirements };
}

export function deleteRequirementAction(requirementId) {
  return { type: DELETE_REQUIREMENT, payload: requirementId };
}

export function addTaskNameAction(taskName) {
  return { type: ADD_TASK_NAME, payload: taskName };
}

export function addDeadlineAction(deadline) {
  return { type: ADD_DEADLINE, payload: deadline };
}

export const getTaskById = async (id, request, token) => {
  const res = await request(`/tasks/${id}`, 'GET', null, { authorization: token });
  return res;
};

export const addTask = async (task, request, token) => {
  const res = await request('/tasks', 'POST', { ...task }, { authorization: token });
  return res;
};

export const editTask = async (id, task, request, token) => {
  const res = await request(`/tasks/${id}`, 'PUT', { ...task }, { authorization: token });
  return res;
};

export const deleteTask = async (id, request, token) => {
  const res = await request(`/tasks/${id}`, 'DELETE', null, { authorization: token });
  return res;
};
