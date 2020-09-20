import {
  ADD_DRAFT_MY_CHECK,
  EDIT_DRAFT_MY_CHECK,
  PUBLISH_MY_CHECK
} from '../actions/checkYourself';

const initialState = {
  myTaskScore: []
};

function tasks(state = initialState, action) {
  switch (action.type) {
    case ADD_DRAFT_MY_CHECK:
      return {
        ...state,
        myTaskScore: [
          ...state.myTaskScore,
          {
            task: action.task.id,
            state: 'DRAFT',
            items: { ...action.task.data }
          }
        ]
      };
    case EDIT_DRAFT_MY_CHECK:
      return {
        ...state,
        myTaskScore: state.myTaskScore.map(checklist => {
          return checklist.task === action.task.id && checklist.state === 'DRAFT'
            ? { ...checklist, items: { ...action.task.data } }
            : checklist;
        })
      };
    case PUBLISH_MY_CHECK:
      return {
        ...state,
        myTaskScore: [
          ...state.myTaskScore,
          {
            task: action.task.id,
            state: 'PUBLISHED',
            items: { ...action.task.data }
          }
        ]
      };

    default:
      return state;
  }
}

export default tasks;
