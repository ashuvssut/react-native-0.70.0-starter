import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "screens/Home";
import { Profile } from "screens/Profile";
import { AppTabBar } from "navigation/AppStack/AppTabBar";
import { NativeStackScreenProps as NSSProps } from "@react-navigation/native-stack";

type AppStackParamList = {
	Home: undefined; // type of initialParams prop
	Profile: undefined;
};
export type THomeScreen = FC<NSSProps<AppStackParamList, "Home">>;
export type TProfileScreen = FC<NSSProps<AppStackParamList, "Profile">>;

const Tab = createBottomTabNavigator<AppStackParamList>();

export const AppStack: FC = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			tabBar={props => <AppTabBar {...props} />}
			// screenOptions={{ tabBarShowLabel: false }}
		>
			<Tab.Screen
				options={{ header: () => null }}
				name="Home"
				component={Home}
			/>
			<Tab.Screen
				// this is a placeholder component. 
				// This won't render in BottomNavTab. See AppTabBar logic
				options={{ header: () => null }}
				name="Profile"
				component={Profile}
			/>
		</Tab.Navigator>
	);
};
