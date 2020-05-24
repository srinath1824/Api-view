import { combineReducers } from "redux";
import AuthReducer from "../reducers";
import deleteReducer from "../reducers/delete";
//One root reducer for the whole app. This is done so that the app will have one single reducer to manage lots of other resources.
// And also communication between the reducers will be easier to maintain.

const rootReducer = combineReducers({
  postCall: AuthReducer,
  deleteCall: deleteReducer,
});

export default rootReducer;
