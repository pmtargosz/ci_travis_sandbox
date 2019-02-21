import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";

import authReducer from "./authReducer";
import blogsReducer from "./blogsReducer";

export default combineReducers({
  form: reduxForm,
  auth: authReducer,
  blogs: blogsReducer
});
