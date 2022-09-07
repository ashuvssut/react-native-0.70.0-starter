import { useCurrentTheme } from "$hooks/theme";
import { FCC } from "$types/IReact";
import React from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IKeybrdScr {
	keyboardShouldPersistTaps: "handled" | "always" | "never";
	bgColor?: "primary" | "background" | "surface";
}

export const KeyboardUsingScreen: FCC<IKeybrdScr> = ({
	children,
	keyboardShouldPersistTaps = "never",
	bgColor = "primary",
}) => {
	const theme = useCurrentTheme();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1, backgroundColor: theme.colors[bgColor] }}
			>
				<TouchableWithoutFeedback
					style={{ flex: 1 }}
					onPress={() => Keyboard.dismiss()}
				>
					<ScrollView
						showsVerticalScrollIndicator={false}
						style={{ flex: 1 }}
						contentContainerStyle={{ flexGrow: 1 }}
						keyboardShouldPersistTaps={keyboardShouldPersistTaps}
						// contentInsetAdjustmentBehavior="automatic"
					>
						{children}
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
