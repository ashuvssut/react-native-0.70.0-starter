import { dp } from "$utils/px2dips";
import VDivider from "components/VDivider";
import React, { FC } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import Color from "color";

interface IStat {
	stat: string;
	value: string;
}
const Stat: FC<IStat> = ({ stat, value }) => {
	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={{ color: "#78604A" }}>{stat}</Text>
			<Text>{value}</Text>
		</View>
	);
};

function StatsBox({ style }: { style?: StyleProp<ViewStyle> }) {
	return (
		<View
			style={[
				{
					marginHorizontal: dp(70),
					flexDirection: "row",
					padding: dp(45),
					justifyContent: "space-around",
					alignItems: "center",
					backgroundColor: Color("#F6BF51").alpha(0.5).hsl().string(),
					borderRadius: dp(58),
				},
				style,
			]}
		>
			<Stat stat="Steps" value="0" />
			<VDivider color="#fff" />
			<Stat stat="Travelled" value="0 Km" />
			<VDivider color="#fff" />
			<Stat stat="Saved" value="₹0" />
		</View>
	);
}

export default StatsBox;
