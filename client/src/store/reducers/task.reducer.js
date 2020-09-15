import {
  SET_TASK,
  ADD_REQUIREMENT,
  EDIT_REQUIREMENT,
  DELETE_REQUIREMENT,
  ADD_TASK_NAME
} from '../actions';

export const taskInitialState = {
  id: '',
  title: '',
  author: '',
  categories: ['Basic', 'Advanced', 'Extra', 'Fines'],
  requirements: []
};

export function taskReducer(state = taskInitialState, { type, payload }) {
  switch (type) {
    case SET_TASK:
      return { ...state, ...payload };

    case ADD_REQUIREMENT:
      return { ...state, requirements: [...state.requirements, payload] };

    case EDIT_REQUIREMENT:
      return { ...state, requirements: payload };

    case DELETE_REQUIREMENT:
      return {
        ...state,
        requirements: state.requirements.filter(requirement => requirement.id !== payload)
      };

    case ADD_TASK_NAME:
      return { ...state, title: payload };

    default:
      return state;
  }
}
