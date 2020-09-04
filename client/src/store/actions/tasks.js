export const SET_TASKS = 'SET_TASKS';
export const DELETE_TASK = 'DELETE_TASK';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';

export function setTasks(tasks) {
  return { type: SET_TASKS, tasks };
}

export function deleteTask(id) {
  return { type: DELETE_TASK, id };
}

export function addTask(task) {
  return { type: ADD_TASK, task };
}

export function editTask(updatedTask) {
  return { type: EDIT_TASK, updatedTask };
}
