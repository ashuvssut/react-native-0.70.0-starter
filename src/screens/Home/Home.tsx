import React from "react";
import { Screen } from "components/Screen";
import { StatusBar } from "components/StatusBar";
import { THomeScreen } from "navigation/AppStack/AppStack";

export const Home: THomeScreen = ({}) => {
	return (
		<>
			<StatusBar />
			<Screen bgColor="surface"></Screen>
		</>
	);
};
