export const GET_TASK_LIST = 'GET_TASK_LIST';

export function getTaskListAction(taskList) {
  return { type: GET_TASK_LIST, payload: taskList };
}

export const getTaskList = async (request, token) => {
  const res = await request('/tasks', 'GET', null, { authorization: token });
  return res;
};
