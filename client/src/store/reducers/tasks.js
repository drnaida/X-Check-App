import { SET_TASKS, DELETE_TASK, ADD_TASK, EDIT_TASK } from '../actions/tasks';

const initialState = {
  allTasks: []
};

function tasks(state = initialState, action) {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, allTasks: action.tasks };
    case DELETE_TASK:
      return {
        ...state,
        allTasks: state.allTasks.filter(task => task.id !== action.id)
      };
    case ADD_TASK:
      return { ...state, allTasks: [...state.allTasks, action.task] };
    case EDIT_TASK:
      return {
        ...state,
        allTasks: state.allTasks.map(task =>
          task.id === action.updatedTask.id ? action.updatedTask : task
        )
      };

    default:
      return state;
  }
}

export default tasks;
