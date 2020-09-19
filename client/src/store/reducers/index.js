import { combineReducers } from 'redux';

import tasks from './tasks';
import checkYourself from './checkYourself';

export default combineReducers({
  tasks,
  checkYourself
});
