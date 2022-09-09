import React, { FC, ReactElement, useEffect } from "react";
import { StyleSheet } from "react-native";
import Wave, { HEIGHT, MARGIN_WIDTH, MIN_LEDGE, WIDTH } from "./Wave";
import Button from "./Button";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { snapPoint, useVector } from "react-native-redash";
import { Side } from "./types";
import { ISlide } from "./Slide";
import { useAppDispatch, useAppSelector } from "$hooks/redux";
import { setSlideIndex } from "redux/slices/componentSlice";

const PREV = WIDTH;
const NEXT = 0;
const LEFT_SNAP_POINTS = [MIN_LEDGE, PREV];
const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MIN_LEDGE];

export interface ISlider {
	prev?: ReactElement<ISlide> | null;
	next?: ReactElement<ISlide> | null;
	children?: React.ReactNode;
}

const Slider: FC<ISlider> = ({
	prev: PrevSlide,
	next: NextSlide,
	children: CurrentSlide,
}) => {
	const dispatch = useAppDispatch();
	const setCurrentSlideIndex = (index: number) => {
		dispatch(setSlideIndex(index));
	};
	const index = useAppSelector(state => state.compoReducer.slideIndex);
	const hasPrev = !!PrevSlide;
	const hasNext = !!NextSlide;
	const activeSide = useSharedValue(Side.NONE);
	const isTransitioningLeft = useSharedValue(false);
	const isTransitioningRight = useSharedValue(false);
	const DEFAULT_HEIGHT = (HEIGHT * 3) / 4;
	const left = useVector(0, DEFAULT_HEIGHT); // creates two animation values, one for x & one for y
	const right = useVector(0, DEFAULT_HEIGHT);
	const panGesture = Gesture.Pan()
		.onBegin(({ x }) => {
			if (x <= MARGIN_WIDTH && hasPrev) {
				activeSide.value = Side.LEFT;
			} else if (x >= WIDTH - MARGIN_WIDTH && hasNext) {
				activeSide.value = Side.RIGHT;
			} else {
				activeSide.value = Side.NONE;
			}
		})
		.onUpdate(({ x, y }) => {
			if (activeSide.value === Side.LEFT) {
				left.x.value = Math.max(x, MIN_LEDGE);
				left.y.value = y;
			} else if (activeSide.value === Side.RIGHT) {
				right.x.value = Math.max(WIDTH - x, MIN_LEDGE);
				right.y.value = y;
			}
		})
		.onEnd(({ x, velocityX, velocityY }) => {
			if (activeSide.value === Side.LEFT) {
				const destination = snapPoint(x, velocityX, LEFT_SNAP_POINTS); // determine the point(destination) where the mask should travel to,
				// i.e, go n stick to the left side(at MIN_LEDGE) or stick to the right side (at WIDTH)
				isTransitioningLeft.value = destination === PREV;
				left.x.value = withSpring(
					destination,
					{
						velocity: velocityX,
						overshootClamping: isTransitioningLeft.value ? true : false,
						restSpeedThreshold: isTransitioningLeft.value ? 100 : 0.01,
						restDisplacementThreshold: isTransitioningLeft.value ? 100 : 0.01,
					}, // spring configs
					() => {
						// this callback runs when the animation finishes. we need this to set the zIndex when mask snaps to opposite end(i.e WIDTH)
						if (isTransitioningLeft.value) {
							// since withSpring runs on animation thread (ui thread), we need to callback JS thread to trigger slide index state change
							runOnJS(setCurrentSlideIndex)(index - 1);
						}
					},
				);
				left.y.value = withSpring(DEFAULT_HEIGHT, { velocity: velocityY });
			} else if (activeSide.value === Side.RIGHT) {
				const destination = snapPoint(x, velocityX, RIGHT_SNAP_POINTS);
				isTransitioningRight.value = destination === NEXT;
				right.x.value = withSpring(
					WIDTH - destination,
					{
						velocity: velocityX,
						overshootClamping: isTransitioningRight.value ? true : false,
						restSpeedThreshold: isTransitioningRight.value ? 100 : 0.01,
						restDisplacementThreshold: isTransitioningRight.value ? 100 : 0.01,
					},
					() => {
						if (isTransitioningRight.value) {
							runOnJS(setCurrentSlideIndex)(index + 1);
						}
					},
				);
				right.y.value = withSpring(DEFAULT_HEIGHT, { velocity: velocityY });
			}
		});

	useEffect(() => {
		left.x.value = withSpring(MIN_LEDGE);
		right.x.value = withSpring(MIN_LEDGE);
	}, [index, left, right]);

	const getZindex1 = useAnimatedStyle(() => ({
		zIndex: activeSide.value === Side.LEFT ? 100 : 0,
	}));
	const getZindex2 = useAnimatedStyle(() => ({
		zIndex: activeSide.value === Side.RIGHT ? 100 : 0,
	}));

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View style={StyleSheet.absoluteFill}>
				{CurrentSlide}
				{hasPrev && (
					<Animated.View style={[StyleSheet.absoluteFill, getZindex1]}>
						<Wave
							position={left}
							side={Side.LEFT}
							isTransitioning={isTransitioningLeft}
						>
							{PrevSlide}
						</Wave>

						<Button position={left} side={Side.LEFT} activeSide={activeSide} />
					</Animated.View>
				)}
				{hasNext && (
					<Animated.View style={[StyleSheet.absoluteFill, getZindex2]}>
						<Wave
							position={right}
							side={Side.RIGHT}
							isTransitioning={isTransitioningRight}
						>
							{NextSlide}
						</Wave>
						<Button
							position={right}
							side={Side.RIGHT}
							activeSide={activeSide}
						/>
					</Animated.View>
				)}
			</Animated.View>
		</GestureDetector>
	);
};

export default Slider;
