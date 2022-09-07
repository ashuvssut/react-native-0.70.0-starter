import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {}

type AS = keyof AppState;
type PA<T extends AS> = PayloadAction<AppState[T]>;

const initialState: AppState = {};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {},
});

// Action creators are generated
export const {} = appSlice.actions;

export default appSlice.reducer;
