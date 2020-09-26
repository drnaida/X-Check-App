export const GET_REVIEW_REQUEST_LIST = 'GET_REVIEW_REQUEST_LIST';

export function getReviewRequestListAction(reviewRequestList) {
  return { type: GET_REVIEW_REQUEST_LIST, payload: reviewRequestList };
}

export const getReviewRequestList = async (request, token) => {
  const res = await request('/review-requests', 'GET', null, { authorization: token });
  return res;
};
