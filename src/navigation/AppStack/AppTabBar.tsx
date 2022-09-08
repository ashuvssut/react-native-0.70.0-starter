import { View, Pressable } from "react-native";
import React, { FC } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text } from "react-native-paper";
import { useCurrentTheme } from "$hooks/theme";
import { dp } from "$utils/px2dp";
import { Nav } from "$svg";

const getIcon = (routeName: string) => {
	switch (routeName) {
		case "Home":
			return Nav;
		default:
			return Nav;
	}
};

export const AppTabBar: FC<BottomTabBarProps> = ({
	state,
	descriptors,
	navigation,
}) => {
	const { colors } = useCurrentTheme();
	return (
		<View style={{ flexDirection: "row", backgroundColor: colors.surface }}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key]!;

				let label: string;
				if (options.tabBarLabel !== undefined) {
					label = options.tabBarLabel as string;
				} else if (options.title !== undefined) {
					label = options.title;
				} else {
					label = route.name;
				}

				if (["Profile"].includes(label)) return null; // Select which screen are not to be shown on BottomNavTab

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						// The `merge: true` option makes sure that the params inside the tab screen are preserved
						navigation.navigate({
							name: route.name,
							merge: true,
							params: route.params,
						});
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				const currentColor = isFocused ? colors.accent : colors.placeholder;
				const Icon = getIcon(route.name);

				return (
					<Pressable
						key={route.key}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={{
							flex: 1,
							justifyContent: "flex-start",
							alignItems: "center",
							paddingVertical: dp(20),
							bottom: isFocused ? 0 : dp(-20),
						}}
					>
						<Icon height={dp(70)} width={dp(70)} color={currentColor} />
						<Text
							style={{
								fontSize: dp(30),
								color: currentColor,
								textAlign: "center",
								opacity: isFocused ? 1 : 0,
							}}
						>
							{label}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
};
