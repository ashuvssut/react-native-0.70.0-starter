import { useAppDispatch } from "$hooks/redux";
import { defaultTheme } from "$hooks/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "navigation/AuthStack/AuthStack";
import React, { FC, ReactElement } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import Svg, { Rect } from "react-native-svg";
import { setSlideIndex } from "redux/slices/componentSlice";
import { slides } from "screens/OnBoarding";

export interface ISlide {
	slide: {
		color: string;
		picture: ReactElement;
	};
	isLast?: boolean;
	navigation: NativeStackNavigationProp<AuthStackParamList, "OnBoarding">;
}

const useStyles = (color: string) =>
	StyleSheet.create({
		container: {
			...StyleSheet.absoluteFillObject,
			paddingTop: 50,
			paddingBottom: 10,
			alignItems: "center",
		},
		button: {
			color,
			backgroundColor: defaultTheme.colors.background,
			borderRadius: 24,
			width: "100%",
		},
	});

const Slide: FC<ISlide> = ({ slide, isLast, navigation }) => {
	const { color, picture } = slide;
	const dispatch = useAppDispatch();
	const goToLastSlide = () => {
		dispatch(setSlideIndex(slides.length - 1));
	};

	const styles = useStyles(color);

	const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
	// const SIZE = width - 75;

	return (
		<>
			<Svg style={StyleSheet.absoluteFill}>
				<Rect x={0} y={0} width={WIDTH} height={HEIGHT} fill={color} />
			</Svg>
			<View style={styles.container}>
				<View>{picture}</View>
				<View
					style={{
						zIndex: 1,
						flexGrow: 1,
						justifyContent: "center",
						alignItems: "center",
						width: 170,
					}}
				>
					{isLast ? (
						<>
							<Button
								mode="contained"
								style={styles.button}
								contentStyle={{ height: 48 }}
								labelStyle={{
									color: color,
									fontSize: 16,
									textTransform: "capitalize",
								}}
								onPress={() =>
									navigation.navigate("RegisterStack", { screen: "MobileNum" })
								}
							>
								Sign in
							</Button>
							<Button
								mode="contained"
								style={{ ...styles.button, marginTop: 10 }}
								contentStyle={{ height: 48 }}
								labelStyle={{
									color: color,
									fontSize: 16,
									textTransform: "capitalize",
								}}
								onPress={() =>
									navigation.navigate("RegisterStack", { screen: "MobileNum" })
								}
							>
								Log in
							</Button>
						</>
					) : (
						<Button
							mode="contained"
							style={styles.button}
							contentStyle={{ height: 48 }}
							labelStyle={{
								color: color,
								fontSize: 16,
								textTransform: "capitalize",
							}}
							onPress={goToLastSlide}
						>
							Skip
						</Button>
					)}
				</View>
			</View>
		</>
	);
};

export default Slide;
