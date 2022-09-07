import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IsoCodes } from "screens/SingleInput/countries";

interface PhNumberData {
	isoCode: IsoCodes;
	phNum: string;
}
export interface CompoState {
	slideIndex: number;
	phNumberData: PhNumberData;
	isDestinationTabUp: boolean
}

type CS = keyof CompoState;
type PA<T extends CS> = PayloadAction<CompoState[T]>;

const initialState: CompoState = {
	slideIndex: 0,
	phNumberData: {
		isoCode: "IN",
		phNum: "",
	},
	isDestinationTabUp: false
};

export const componentSlice = createSlice({
	name: "compo",
	initialState,
	reducers: {
		setSlideIndex(state, action: PA<"slideIndex">) {
			state.slideIndex = action.payload;
		},
		setPhNumberData(state, action: PA<"phNumberData">) {
			state.phNumberData = action.payload;
		},
		setIsTabUp(state, action: PA<"isDestinationTabUp">) {
			state.isDestinationTabUp = action.payload;
		},
	},
});

// Action creators are generated
export const { setSlideIndex, setPhNumberData, setIsTabUp } =
	componentSlice.actions;

export default componentSlice.reducer;
