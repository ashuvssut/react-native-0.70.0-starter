import { View, Pressable } from "react-native";
import React, { FC } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableRipple } from "react-native-paper";
import { useCurrentTheme } from "$hooks/theme";
import { dp } from "$utils/px2dips";
import { Nav, Chat, Gift, Foot, Search } from "$svg";
import { setIsTabUp } from "redux/slices/componentSlice";
import { useAppDispatch, useAppSelector } from "$hooks/redux";

const getIcon = (routeName: string) => {
	switch (routeName) {
		case "Home":
			return Nav;
		case "Chat":
			return Chat;
		case "Rewards":
			return Gift;
		case "FootRequests":
			return Foot;
		default:
			return Nav;
	}
};

export const AppTabBar: FC<BottomTabBarProps> = ({
	state,
	descriptors,
	navigation,
}) => {
	const dispatch = useAppDispatch();
	const isTabUp = useAppSelector(
		({ compoReducer }) => compoReducer.isDestinationTabUp,
	);
	const { colors } = useCurrentTheme();
	if (state.index === 1) return null; // "ChangeLocation" screen is At index 1
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

				if (route.name === "ChangeLocation") return null;
				if (route.name === "ShowBuddies") {
					if (state.index !== 0) {
						return null;
					}
					return (
						<View style={{ flex: 1 }} key={route.key}>
							<View
								style={{
									position: "absolute",
									backgroundColor: colors.accent,
									height: dp(187),
									width: dp(187),
									borderRadius: dp(187),
									overflow: "hidden",
									bottom: 5,
									left: 0,
									elevation: 6,
								}}
							>
								<TouchableRipple
									style={{
										justifyContent: "center",
										alignItems: "center",
										height: "100%",
									}}
									onPress={() => {
										isTabUp
											? dispatch(setIsTabUp(false))
											: dispatch(setIsTabUp(true));
									}}
									rippleColor={colors.placeholder}
								>
									<Search height={dp(70)} width={dp(70)} color="white" />
								</TouchableRipple>
							</View>
						</View>
					);
				}
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
