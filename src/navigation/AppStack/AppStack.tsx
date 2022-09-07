import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "screens/Home";
import { Chat } from "screens/Chat";
import { FootRequests } from "screens/FootRequests";
import { Rewards } from "screens/Rewards";
import { AppTabBar } from "navigation/AppStack/AppTabBar";
import { ChangeLocation } from "screens/ChangeLocation";

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
			<Tab.Screen // ! in AppTabBar.tsx, state.index=1 is assumed as "ChangeLocation".
				options={{ header: () => null }}
				name="ChangeLocation"
				component={ChangeLocation}
			/>
			<Tab.Screen
				options={{ header: () => null }}
				name="Chat"
				component={Chat}
			/>
			<Tab.Screen
				options={{ header: () => null }}
				name="ShowBuddies"
				component={Home} // placehoder component
			/>
			<Tab.Screen
				options={{ header: () => null, tabBarLabel: "Foot Requests" }}
				name="FootRequests"
				component={FootRequests}
			/>
			<Tab.Screen
				options={{ header: () => null }}
				name="Rewards"
				component={Rewards}
			/>
		</Tab.Navigator>
	);
};
