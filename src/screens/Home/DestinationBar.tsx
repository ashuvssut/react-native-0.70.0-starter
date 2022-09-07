import React, { FC, RefObject, useEffect, useRef, useState } from "react";
import {
	Animated,
	Keyboard,
	StyleProp,
	TextInput as RNTextInput,
	View,
	ViewStyle,
} from "react-native";
import { FAB, TextInput } from "react-native-paper";
import { useCurrentTheme } from "$hooks/theme";
import { dp } from "$utils/px2dips";
import LinearGradient from "react-native-linear-gradient";
import ReAnimated, {
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "$hooks/redux";
import { setIsTabUp } from "redux/slices/componentSlice";

interface IDestinationBar {
	style?: StyleProp<ViewStyle>;
}

export const DestinationBar: FC<IDestinationBar> = ({ style }) => {
	const dispatch = useAppDispatch();
	const isTabUp = useAppSelector(
		({ compoReducer }) => compoReducer.isDestinationTabUp,
	);
	const barRef = useRef<RNTextInput | null>(null);
	const { colors } = useCurrentTheme();
	const heightAnim = useRef(new Animated.Value(dp(300))).current;
	const heightUp = () => {
		Animated.timing(heightAnim, {
			toValue: dp(1450),
			duration: 200,
			useNativeDriver: false,
		}).start();
		if (barRef) barRef.current?.focus();
	};
	const heightDown = async () => {
		Keyboard.dismiss(); // dismiss keyboard and wait 100ms
		await new Promise(resolve => setTimeout(resolve, 100));
		Animated.timing(heightAnim, {
			toValue: dp(300),
			duration: 200,
			useNativeDriver: false,
		}).start();
	};
	const getRotation = useAnimatedStyle(() => ({
		transform: [{ rotateZ: isTabUp ? "180deg" : "0deg" }],
	}));

	useEffect(() => {
		isTabUp ? heightUp() : heightDown();
	}, [isTabUp]);
	return (
		<Animated.View style={{ height: heightAnim, width: "100%" }}>
			<LinearGradient
				style={[
					{
						position: "absolute",
						bottom: 0,
						left: 0,
						borderTopLeftRadius: dp(88),
						borderTopRightRadius: dp(88),
						height: "100%",
						width: "100%",
						padding: dp(70),
						justifyContent: "flex-start",
						alignItems: "center",
					},
					style,
				]}
				colors={["#F3F3F2", "#F3F3F2", "#F3F3F2", colors.surface]}
			>
				<ReAnimated.View
					style={[
						{
							position: "absolute",
							top: dp(-40),
							alignItems: "center",
							width: "100%",
						},
						getRotation,
					]}
				>
					<FAB
						icon="chevron-up"
						color="white"
						style={{
							justifyContent: "center",
							alignItems: "center",
							height: dp(80),
							width: dp(80),
							elevation: 2,
						}}
						onPress={() => {
							isTabUp
								? dispatch(setIsTabUp(false))
								: dispatch(setIsTabUp(true));
						}}
					/>
				</ReAnimated.View>

				<TextInput
					ref={barRef}
					style={{
						height: dp(160),
						backgroundColor: colors.surface,
						borderRadius: dp(88),
						paddingHorizontal: dp(75),
						alignSelf: "stretch",
					}}
					theme={{ roundness: dp(88) }}
					placeholder="Where to?"
					selectionColor={colors.placeholder}
					underlineColor="transparent"
					activeUnderlineColor="transparent"
					underlineColorAndroid="transparent"
					onFocus={() => dispatch(setIsTabUp(true))}
					onBlur={() => dispatch(setIsTabUp(false))}
				/>
			</LinearGradient>
		</Animated.View>
	);
};
