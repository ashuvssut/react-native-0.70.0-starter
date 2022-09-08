import React from "react";
import { Screen } from "components/Screen";
import { useCurrentTheme } from "$hooks/theme";
import { StatusBar } from "react-native";

export const Profile = ({ navigation }) => {
	const theme = useCurrentTheme();
	const { surface } = theme.colors;

	return (
		<>
			<StatusBar />
			<Screen bgColor="surface"></Screen>
		</>
	);
};
