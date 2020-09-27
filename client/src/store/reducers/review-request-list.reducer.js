import { GET_REVIEW_REQUEST_LIST } from '../actions';

export function reviewRequestListReducer(state = [], { type, payload }) {
  switch (type) {
    case GET_REVIEW_REQUEST_LIST:
      return payload;

    default:
      return state;
  }
}
