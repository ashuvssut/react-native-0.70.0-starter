import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
	uid: string;
}

type US = keyof UserState;
type PA<T extends US> = PayloadAction<UserState[T]>;

const initialState: UserState = {
	uid: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUID(state, action: PA<"uid">) {
			state.uid = action.payload;
		},
	},
});

// Action creators are generated
export const { setUID } = userSlice.actions;

export default userSlice.reducer;
