import { FCC } from "$types/IReact";
import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { Text } from "react-native-paper";

interface IText {
 style: StyleProp<TextStyle>
}
export const Title1: FCC<IText> = props => {
	return <Text {...props}>{props.children}</Text>;
};
