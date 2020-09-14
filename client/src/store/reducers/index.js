import { combineReducers } from 'redux';

import { taskReducer } from './task.reducer';

export * from './task.reducer';

export default combineReducers({
  task: taskReducer
});
