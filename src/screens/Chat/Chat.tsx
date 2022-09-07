import React, { FC } from "react";
import { INavProps } from "$types/INavProps";
import { Screen } from "components/Screen";
import { useCurrentTheme } from "$hooks/theme";
import { StatusBar } from "react-native";

export interface IChat extends INavProps {}

export const Chat: FC<IChat> = ({ navigation }) => {
	const theme = useCurrentTheme();
	const { surface } = theme.colors;

	return (
		<>
			<StatusBar
				animated={true}
				backgroundColor={surface}
				barStyle={theme.dark ? "light-content" : "dark-content"}
			/>
			<Screen bgColor="surface">
			</Screen>
		</>
	);
};
