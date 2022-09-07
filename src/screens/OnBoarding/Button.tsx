import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import Icon from "react-native-vector-icons/Feather";
import { useWindowDimensions } from "react-native";

import { Side } from "./types";
import { Vector } from "react-native-redash";

const RADIUS = 25;

export interface IButton {
	position: Vector<Animated.SharedValue<number>>;
	side: Side;
	activeSide: Animated.SharedValue<Side>;
}

const Button = ({ position, side, activeSide }: IButton) => {
	const { width: WIDTH } = useWindowDimensions();
	const isLeft = side === Side.LEFT;
	const style = useAnimatedStyle(() => ({
		position: "absolute",
		left: isLeft
			? position.x.value + RADIUS / 2
			: WIDTH - position.x.value - (3 / 2) * RADIUS,
		top: position.y.value - RADIUS / 2,
		display: activeSide.value === Side.NONE ? "flex" : "none",
	}));
	return (
		<Animated.View style={style}>
			<Icon
				name={`chevron-${isLeft ? "right" : "left"}` as const}
				size={24}
				color="white"
			/>
		</Animated.View>
	);
};

export default Button;
