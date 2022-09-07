import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import compoReducer from "./componentSlice";
import appReducer from "./appSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
	themeReducer,
	compoReducer,
	appReducer,
	userReducer,
});
export default rootReducer;
