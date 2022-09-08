import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "screens/Home";
import { Profile } from "screens/Profile";
import { AppTabBar } from "navigation/AppStack/AppTabBar";

const Tab = createBottomTabNavigator();

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
			<Tab.Screen // this is a placeholder component. This won't render in BottomNavTab
				options={{ header: () => null }}
				name="Profile"
				component={Profile}
			/>
		</Tab.Navigator>
	);
};
