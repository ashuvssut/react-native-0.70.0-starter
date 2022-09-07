import React, { FC, useEffect } from "react";
import { LogBox, View } from "react-native";
import { Marker, MarkerProps } from "react-native-maps";
import {
	magnetometer,
	SensorTypes,
	setUpdateIntervalForType,
} from "react-native-sensors";
import Svg, { Image } from "react-native-svg";
import { getHeading } from "screens/Home/map-engine/magnetometer";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

interface ILostMarker extends MarkerProps {}
export const LostMarker: FC<ILostMarker> = props => {
	return (
		<Marker anchor={{ x: 0.5, y: 0.5 }} flat {...props}>
			<View>
				<Svg width={15} height={15} viewBox="0 0 135 135">
					<Image href={require("./assets/lost.png")} />
				</Svg>
			</View>
		</Marker>
	);
};

interface IPointMarker extends MarkerProps {}
export const PointMarker: FC<IPointMarker> = props => {
	return (
		<Marker anchor={{ x: 0.5, y: 0.5 }} flat {...props}>
			<View>
				<Svg width={15} height={15} viewBox="0 0 135 135">
					<Image href={require("./assets/point.png")} />
				</Svg>
			</View>
		</Marker>
	);
};

interface ITorchMarker extends MarkerProps {
	heading: React.MutableRefObject<number | null>;
	isNavMode: React.MutableRefObject<boolean>;
}
export const TorchMarker: FC<ITorchMarker> = props => {
	const { heading, isNavMode } = props;
	const sensorHeading = useSharedValue(0);

	useEffect(() => {
		setUpdateIntervalForType(SensorTypes.magnetometer, 500);
		LogBox.ignoreLogs([`new NativeEventEmitter()`]);
		const subscription = magnetometer.subscribe(({ x, y }) => {
			sensorHeading.value = getHeading(x, y);
		});
		return () => subscription.unsubscribe();
	}, []);

	const animatedRotate = useAnimatedStyle(() => {
		const getHeadingDeg = () => {
			if (!heading.current) return `${sensorHeading.value - 90}deg`;

			// console.log("getHeadingDeg()", isNavMode.current);
			const headingDeg = isNavMode.current
				? `${heading.current - 90}deg`
				: `${sensorHeading.value - 90}deg`;
			// -90deg corrects torch0.png's rotation
			return headingDeg;
		};
		return {
			transform: [
				{
					rotate: withTiming(getHeadingDeg(), {
						duration: 500,
						easing: Easing.bezier(0, 0, 1, 1),
					}),
				},
			],
		};
	});

	return (
		<Marker anchor={{ x: 0.5, y: 0.5 }} flat {...props}>
			<Animated.View style={[animatedRotate]}>
				<Svg width={150} height={150} viewBox="0 0 1350 1350">
					<Image href={require("./assets/torch.png")} />
				</Svg>
			</Animated.View>
		</Marker>
	);
};

{
	/* <Marker
	coordinate={{
		latitude: location?.coords.latitude,
		longitude: location?.coords.longitude,
	}}
	title={"You are here"}
/>; */
}
