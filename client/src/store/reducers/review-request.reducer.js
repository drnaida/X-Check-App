import {
  SET_REVIEW_REQUEST,
  ADD_TASK_ID,
  ADD_TASK_TITLE,
  ADD_TASK_SOLUTION_LINK,
  ADD_PULL_REQUEST_LINK,
  ADD_SELF_MARK
} from '../actions';

export const reviewRequestInitialState = {
  id: '',
  student: '',
  pullRequestLink: '',
  deployLink: '',
  state: 'DRAFT',
  taskId: '',
  taskTitle: null,
  examiner: [],
  categories: ['Basic', 'Advanced', 'Extra', 'Fines'],
  requirements: []
};

export function reviewRequestReducer(state = reviewRequestInitialState, { type, payload }) {
  switch (type) {
    case SET_REVIEW_REQUEST:
      return { ...state, ...payload };

    case ADD_TASK_ID:
      return { ...state, taskId: payload };

    case ADD_TASK_TITLE:
      return { ...state, taskTitle: payload };

    case ADD_TASK_SOLUTION_LINK:
      return { ...state, deployLink: payload };

    case ADD_PULL_REQUEST_LINK:
      return { ...state, pullRequestLink: payload };

    case ADD_SELF_MARK: {
      const { value, requirementId, itemId } = payload;
      const { requirements } = state;
      const newRequirements = requirements.map(requirement => {
        if (requirement.id === requirementId) {
          const { items } = requirement;
          const newItems = items.map(item => {
            if (item.id === itemId) {
              item.selfMark = value;
            }

            return item;
          });

          return { ...requirement, items: newItems };
        }

        return requirement;
      });
      return { ...state, requirements: newRequirements };
    }

    default:
      return state;
  }
}
