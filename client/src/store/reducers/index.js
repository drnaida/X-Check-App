import { combineReducers } from 'redux';

import { taskReducer } from './task.reducer';
import checkYourself from './checkYourself';

export * from './task.reducer';

export default combineReducers({
  task: taskReducer,
  checkYourself
});
