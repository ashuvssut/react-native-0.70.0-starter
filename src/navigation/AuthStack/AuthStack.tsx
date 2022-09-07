import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnBoarding } from "screens/OnBoarding";
import RegisterStack from "navigation/AuthStack/RegisterStack";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export const AuthStack: FC = () => {
	return (
		<Stack.Navigator initialRouteName="OnBoarding">
			<Stack.Screen
				options={{ header: () => null }}
				name="OnBoarding"
				component={gestureHandlerRootHOC(OnBoarding)}
			/>
			<Stack.Screen
				options={{ header: () => null }}
				name="Register"
				component={RegisterStack}
			/>
		</Stack.Navigator>
	);
};
