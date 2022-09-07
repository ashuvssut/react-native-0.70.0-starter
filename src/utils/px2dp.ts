import { PixelRatio } from "react-native";

export const dp = (px: number) => {
	// console.log("PixelRatio.get()", PixelRatio.get());
	return px / PixelRatio.get();
};

export const sp = (px: number) => {
	// console.log("PixelRatio.getFontScale()", PixelRatio.getFontScale());
	return px / (PixelRatio.getFontScale() * PixelRatio.get());
};
