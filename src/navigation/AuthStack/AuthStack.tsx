import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnBoarding } from "screens/OnBoarding";
import RegisterStack, {
	RegisterStackParamList,
} from "navigation/AuthStack/RegisterStack";
import { NativeStackScreenProps as NSSProps } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

export type AuthStackParamList = {
	OnBoarding: undefined; // type of initialParams prop e.g. { userId: string }, or undefined;
	RegisterStack: NavigatorScreenParams<RegisterStackParamList>;
};
export type TOnBoardingScreen = FC<NSSProps<AuthStackParamList, "OnBoarding">>;
export type TRegisterStack = FC<NSSProps<AuthStackParamList, "RegisterStack">>;
const Stack = createNativeStackNavigator<AuthStackParamList>();

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
				name="RegisterStack"
				component={RegisterStack}
			/>
		</Stack.Navigator>
	);
};
