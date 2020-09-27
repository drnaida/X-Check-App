import { GET_TASK_LIST } from '../actions';

export function taskListReducer(state = [], { type, payload }) {
  switch (type) {
    case GET_TASK_LIST:
      return payload;

    default:
      return state;
  }
}
