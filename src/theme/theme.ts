//https://github.com/callstack/react-native-paper/blob/main/example/src/index.tsx
import { configureFonts, DefaultTheme } from "react-native-paper";
import { useAppSelector } from "$hooks/redux";
import { Fonts } from "react-native-paper/lib/typescript/types";

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace ReactNativePaper {
		interface ThemeColors {
			secondaryText: string;
		}

		// interface Theme {
		// 	myOwnProperty: string;
		// }
	}
}

const commonFontConfig: Fonts = {

	regular: {
		fontFamily: "SFProDisplayRegular",
		fontWeight: "normal",
	},
	medium: {
		fontFamily: "SFProDisplayMedium",
		fontWeight: "normal",
	},
	light: {
		fontFamily: "SFMonoRegular",
		fontWeight: "normal",
	},
	thin: {
		fontFamily: "SFMonoLight",
		fontWeight: "normal",
	},
};

const fontConfig = {
	web: commonFontConfig,
	ios: commonFontConfig,
	android: commonFontConfig,
};

// Theme Schmas based on https://callstack.github.io/react-native-paper/theming.html
export const defaultTheme: ReactNativePaper.Theme = {
	...DefaultTheme,
	dark: false,
	mode: "adaptive",
	// myOwnProperty: "",
	colors: {
		...DefaultTheme.colors,
		primary: "#FEF4F4",
		accent: "#FF5959",
		background: "#E5E5E5",
		surface: "#FFFFFF",
		text: "#210B0B",
		secondaryText: "#767676", // custom colorProperty
		placeholder: "#A3A3A3",
	},
	fonts: configureFonts(fontConfig),
};

export const darkTheme: ReactNativePaper.Theme = {
	...DefaultTheme,
	dark: true,
	mode: "adaptive",
	colors: {
		...DefaultTheme.colors,
		primary: "#18191A",
		accent: "#FF5959",
		background: "#121212",
		surface: "#121212",
		text: "#FFFFFF",
		secondaryText: "#808080", // custom colorProperty
		placeholder: "#B0B3B8",
	},
	fonts: configureFonts(fontConfig),
};

export const useCurrentTheme = () => {
	let theme = useAppSelector(state => state.themeReducer.theme);
	// theme = "darkk";
	return theme === "dark" ? darkTheme : defaultTheme;
};
