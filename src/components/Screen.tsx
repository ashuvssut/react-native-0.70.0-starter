import { useCurrentTheme } from "$hooks/theme";
import { FCC } from "$types/IReact";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface IScreen {
	bgColor?: "primary" | "background" | "surface";
}

export const Screen: FCC<IScreen> = ({ children, bgColor = "primary" }) => {
	const theme = useCurrentTheme();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors[bgColor] }}>
			{children}
		</SafeAreaView>
	);
};
