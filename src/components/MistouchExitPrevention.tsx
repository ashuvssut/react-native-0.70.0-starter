import React, { ReactNode, useEffect } from "react";
import { View, BackHandler, Alert } from "react-native";

interface MistouchExitPreventionProps {
  children: ReactNode
}

const MistouchExitPrevention = ({children}: MistouchExitPreventionProps) => {
	const backAction = () => {
		Alert.alert("Confirm Exit", "Are you sure you Exit the app?", [
			{
				text: "Cancel",
				onPress: () => null,
				style: "cancel",
			},
			{ text: "YES", onPress: () => BackHandler.exitApp() },
		]);
		return true;
	};

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", backAction);

		return () =>
			BackHandler.removeEventListener("hardwareBackPress", backAction);
	}, []);

	return <View style={{ flex: 1 }}>{children}</View>;
};

export default MistouchExitPrevention;
