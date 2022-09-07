import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
	theme: "default" | "dark";
}

const initialState: ThemeState = {
	theme: "default",
};

export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleTheme: state => {
			state.theme = state.theme === "default" ? "dark" : "default"; // mutable way
			// return state.theme === "dark" ? { theme: "default" } : { theme: "dark" }; // immutable way
		},
	},
});

// Action creators are generated
export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
