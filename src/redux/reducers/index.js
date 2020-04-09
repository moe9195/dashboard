import { combineReducers } from "redux";
import reducer from "./data";

const rootReducer = combineReducers({
  data: reducer,
});

export default rootReducer;
