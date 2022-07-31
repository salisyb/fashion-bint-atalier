import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import auth from "./auth";

const reducer = combineReducers({
  // here we will be adding reducers
  auth,
});

const store = configureStore({
  reducer,
});
export default store;
