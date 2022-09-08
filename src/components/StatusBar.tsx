import { useCurrentTheme } from "$hooks/theme";
import React, { FC } from "react";
import { StatusBar as RNStatusBar, StatusBarProps } from "react-native";

interface IStatusBar extends StatusBarProps {}

export const StatusBar: FC<IStatusBar> = props => {
	const theme = useCurrentTheme();
	const { surface } = theme.colors;

	return (
		<RNStatusBar
			{...props}
			animated={true}
			backgroundColor={surface}
			barStyle={theme.dark ? "light-content" : "dark-content"}
		/>
	);
};
