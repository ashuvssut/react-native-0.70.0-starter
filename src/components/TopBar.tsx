import { useAppSelector } from "$hooks/redux";
import { useCurrentTheme } from "$hooks/theme";
import { Menu } from "$svg";
import { dp, sp } from "$utils/px2dips";
import React, { FC, useEffect, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Headline, Text } from "react-native-paper";
import { SvgProps } from "react-native-svg";

interface ITopBar {
	style?: StyleProp<ViewStyle>;
	icon?: FC<SvgProps>;
	avatar?: JSX.Element;
	subtitle?: JSX.Element;
}
const TopBar: FC<ITopBar> = ({
	style,
	avatar = null,
	icon: Icon,
	subtitle = null,
}) => {
	const { colors } = useCurrentTheme();
	const location = useAppSelector(({ mapReducer }) => mapReducer.location);
	const currentPlace = useAppSelector(
		({ mapReducer }) => mapReducer.currentPlace,
	);
	const getCurrentPlace = (): string => {
		if (currentPlace) return currentPlace;
		if (location) return "Current Location";
		return "Choose start location";
	};

	const [title, setTitle] = useState<string>(getCurrentPlace());

	useEffect(() => {
		setTitle(getCurrentPlace());
	}, [location, currentPlace]);

	return (
		<View
			style={[
				{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				},
				style,
			]}
		>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				{avatar ??
					(Icon ? (
						<Icon
							height={dp(80)}
							width={dp(63)}
							style={{
								padding: dp(45),
								marginRight: dp(14),
								marginLeft: dp(54),
								marginVertical: dp(25),
							}}
							color={colors.accent}
						/>
					) : null)}
				<View>
					<Text
						style={{
							color: colors.text,
							fontSize: sp(63),
							fontWeight: "normal",
						}}
					>
						{title}
					</Text>
					{subtitle}
				</View>
			</View>
			<Menu
				//@ts-ignore
				height={dp(80)}
				width={dp(63)}
				style={{
					padding: dp(45),
					marginRight: dp(54),
					marginLeft: dp(14),
					marginVertical: dp(25),
				}}
			/>
		</View>
	);
};

export default TopBar;
