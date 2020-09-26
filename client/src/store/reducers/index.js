import { combineReducers } from 'redux';

import { taskReducer } from './task.reducer';
import { taskListReducer } from './task-list.reducer';
import { reviewRequestReducer } from './review-request.reducer';
import { reviewRequestListReducer } from './review-request-list.reducer';

export * from './task.reducer';

export default combineReducers({
  task: taskReducer,
  taskList: taskListReducer,
  reviewRequest: reviewRequestReducer,
  reviewRequestList: reviewRequestListReducer
});
