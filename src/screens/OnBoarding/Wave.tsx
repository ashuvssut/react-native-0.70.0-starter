import React, { ReactElement } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import Animated, {
	useAnimatedProps,
	useAnimatedStyle,
	useDerivedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import MaskedView from "@react-native-community/masked-view";
import { clamp, Vector } from "react-native-redash";
import { Side } from "./types";
import { ISlide } from "./Slide";

export const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
export const MIN_LEDGE = 15;
export const MARGIN_WIDTH = MIN_LEDGE + 50;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const vec2 = (x: number, y: number) => {
	"worklet";
	return { x, y };
};
const curve = (c1: Vector, c2: Vector, to: Vector) => {
	"worklet";
	return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};

export interface IWave {
	side: Side;
	children: ReactElement<ISlide>;
	position: Vector<Animated.SharedValue<number>>;
	isTransitioning: Animated.SharedValue<boolean>;
}

const Wave = ({ side, children, position, isTransitioning }: IWave) => {
	// const R = MARGIN_WIDTH - MIN_LEDGE;
	const R = clamp(position.x.value, MARGIN_WIDTH - MIN_LEDGE, WIDTH / 3);
	const derivedStepX = useDerivedValue(() => {
		return withSpring(isTransitioning.value ? 0 : R / 2);
	});
	const animatedProps = useAnimatedProps(() => {
		const stepX = derivedStepX.value;
		const stepY = Math.max(position.x.value, MARGIN_WIDTH - MIN_LEDGE);

		// curve
		// const stepX = R / 2;
		// const stepY = R;
		const C = R * 0.5522847498; // 0.5522847498 is taken from https://spencermortensen.com/articles/bezier-circle/
		// define all 5 points for the circle
		const p1 = vec2(position.x.value, position.y.value - 2 * stepY);
		const p2 = vec2(p1.x + stepX, p1.y + stepY);
		const p3 = vec2(p2.x + stepX, p2.y + stepY);
		const p4 = vec2(p3.x - stepX, p3.y + stepY);
		const p5 = vec2(p4.x - stepX, p4.y + stepY);

		// define control points
		const c11 = vec2(p1.x, p1.y + C);
		const c12 = vec2(p2.x, p2.y);

		const c21 = vec2(p2.x, p2.y);
		const c22 = vec2(p3.x, p3.y - C);

		const c31 = vec2(p3.x, p3.y + C);
		const c32 = vec2(p4.x, p4.y);

		const c41 = vec2(p4.x, p4.y);
		const c42 = vec2(p5.x, p5.y - C);

		// full height rectangle
		const dPathCommands = [
			"M 0 0",
			`H ${p1.x}`,
			`V ${p1.y}`,
			curve(c11, c12, p2),
			curve(c21, c22, p3),
			curve(c31, c32, p4),
			curve(c41, c42, p5),
			`V ${HEIGHT}`,
			`H 0`,
			"Z",
		];

		return { d: dPathCommands.join(" ") };
	});
	const maskElement = (
		<Svg
			style={
				(StyleSheet.absoluteFill,
				{
					transform: [{ rotateY: side === Side.RIGHT ? "180deg" : "0deg" }],
				})
			}
		>
			<AnimatedPath
				animatedProps={animatedProps}
				fill={Platform.OS === "android" ? children.props.slide.color : "black"}
			/>
		</Svg>
	);
	const waveStyleAndroid = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX:
						// eslint-disable-next-line no-nested-ternary
						isTransitioning.value
							? withTiming(0) // TeanslateX = 0 when transitioning
							: side === Side.RIGHT
							? WIDTH // TranslateX = WIDTH when activeSide is right and when not transitioning
							: -WIDTH, // TranslateX = -WIDTH when activeSide is left and when not transitioning
				},
			],
		};
	});
	if (Platform.OS === "android") {
		return (
			<View style={StyleSheet.absoluteFill}>
				{maskElement}
				<Animated.View style={[StyleSheet.absoluteFill, waveStyleAndroid]}>
					{children}
				</Animated.View>
			</View>
		);
	}
	return (
		<MaskedView style={StyleSheet.absoluteFill} maskElement={maskElement}>
			{children}
		</MaskedView>
	);
};

export default Wave;
