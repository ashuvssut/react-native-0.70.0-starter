import React, { FC } from "react";

import Slider from "./Slider";
import Slide from "./Slide";
import { Slide1, Slide2, Slide3, Slide4, Slide5 } from "$svg";
import { useAppSelector } from "$hooks/redux";
import MistouchExitPrevention from "components/MistouchExitPrevention";
import { StatusBar } from "react-native";
import { useCurrentTheme } from "$hooks/theme";
import { TOnBoardingScreen } from "navigation/AuthStack/AuthStack";

export const slides = [
	{
		color: "#FF5959",
		picture: <Slide1 />,
	},
	{
		color: "#67CBC9",
		picture: <Slide2 />,
	},
	{
		color: "#FF5959",
		picture: <Slide3 />,
	},
	{
		color: "#F6BF51",
		picture: <Slide4 />,
	},
	{
		color: "#FF5959",
		picture: <Slide5 />,
	},
];

export const assets = slides.map(({ picture }) => picture);

export const OnBoarding: TOnBoardingScreen = ({ navigation }) => {
	const index = useAppSelector(state => state.compoReducer.slideIndex);

	const prev = slides[index - 1];
	const next = slides[index + 1];

	const { colors } = useCurrentTheme();
	return (
		<MistouchExitPrevention>
			{StatusBar.currentHeight! > 0 ? (
				<StatusBar
					animated={true}
					hidden={false}
					backgroundColor={colors.accent}
					barStyle={"light-content"}
				/>
			) : (
				<StatusBar animated={true} hidden={true} />
			)}

			<Slider
				key={index}
				prev={
					prev ? (
						<Slide //
							slide={prev}
							navigation={navigation}
						/>
					) : null
				}
				next={
					next ? (
						<Slide
							slide={next}
							navigation={navigation}
							isLast={index + 1 === slides.length - 1}
						/>
					) : null
				}
			>
				<Slide
					key={index}
					slide={slides[index]!}
					navigation={navigation}
					isLast={!next}
				/>
			</Slider>
		</MistouchExitPrevention>
	);
};
