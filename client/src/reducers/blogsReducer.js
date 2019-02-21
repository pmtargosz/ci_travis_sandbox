import { FETCH_BLOGS, FETCH_BLOG } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_BLOG:
      const blog = action.payload;
      return { ...state, [blog._id]: blog };
    case FETCH_BLOGS:
      return {
        ...state,
        ...action.payload.reduce((acc, cur) => {
          acc[cur._id] = cur;
          return acc;
        }, {})
      };
    default:
      return state;
  }
};
