export const SET_REVIEW_REQUEST = 'SET_REVIEW_REQUEST';
export const ADD_TASK_ID = 'ADD_TASK_ID';
export const ADD_TASK_TITLE = 'ADD_TASK_TITLE';
export const ADD_TASK_SOLUTION_LINK = 'ADD_TASK_SOLUTION_LINK';
export const ADD_PULL_REQUEST_LINK = 'ADD_PULL_REQUEST_LINK';
export const ADD_SELF_MARK = 'ADD_SELF_MARK';

export function setReviewRequestAction(reviewRequest) {
  return { type: SET_REVIEW_REQUEST, payload: reviewRequest };
}

export function addTaskIdAction(taskId) {
  return { type: ADD_TASK_ID, payload: taskId };
}

export function addTaskTitleAction(taskTitle) {
  return { type: ADD_TASK_TITLE, payload: taskTitle };
}

export function addTaskSolutionLinkAction(solutionLink) {
  return { type: ADD_TASK_SOLUTION_LINK, payload: solutionLink };
}

export function addPullRequestLinkAction(pullRequestLink) {
  return { type: ADD_PULL_REQUEST_LINK, payload: pullRequestLink };
}

export function addSelfMakrAction(selfMark) {
  return { type: ADD_SELF_MARK, payload: selfMark };
}

export const getReviewRequestById = async (id, request, token) => {
  const res = await request(`/review-requests/${id}`, 'GET', null, { authorization: token });
  return res;
};

export const addReviewRequest = async (reviewRequest, request, token) => {
  const res = await request(
    '/review-requests',
    'POST',
    { ...reviewRequest },
    { authorization: token }
  );
  return res;
};

export const editReviewRequest = async (id, reviewRequest, request, token) => {
  const res = await request(
    `/review-requests/${id}`,
    'PUT',
    { ...reviewRequest },
    { authorization: token }
  );
  return res;
};

export const deleteReviewRequest = async (id, request, token) => {
  const res = await request(`/review-requests/${id}`, 'DELETE', null, { authorization: token });
  return res;
};
