import React from "react";
import { Screen } from "components/Screen";
import { StatusBar } from "react-native";
import { TProfileScreen } from "navigation/AppStack/AppStack";

export const Profile: TProfileScreen = () => {
	return (
		<>
			<StatusBar />
			<Screen bgColor="surface"></Screen>
		</>
	);
};
