import React from "react";
import { Screen } from "components/Screen";
import { useCurrentTheme } from "$hooks/theme";
import { StatusBar } from "components/StatusBar";

export const Home = ({ navigation }) => {
	const theme = useCurrentTheme();
	const { surface } = theme.colors;

	return (
		<>
			<StatusBar />
			<Screen bgColor="surface"></Screen>
		</>
	);
};
