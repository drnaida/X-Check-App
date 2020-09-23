export const ADD_DRAFT_MY_CHECK = 'ADD_DRAFT_MY_CHECK';
export const EDIT_DRAFT_MY_CHECK = 'EDIT_DRAFT_MY_CHECK';
export const PUBLISH_MY_CHECK = 'PUBLISH_MY_CHECK';

export function addDraftTask(task) {
  return { type: ADD_DRAFT_MY_CHECK, task };
}

export function editDraftTask(task) {
  return { type: EDIT_DRAFT_MY_CHECK, task };
}

export function savePublishTask(task) {
  return { type: PUBLISH_MY_CHECK, task };
}
