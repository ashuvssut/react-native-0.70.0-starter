import { useCurrentTheme } from "$hooks/theme";
import { dp } from "$utils/px2dp";
import React, { FC } from "react";
import { Keyboard } from "react-native";
import { Button } from "react-native-paper";

interface INextButton {
	onPress: () => Promise<void>;
	loading?: boolean;
}

const NextButton: FC<INextButton> = ({ onPress, loading }) => {
	const { accent } = useCurrentTheme().colors;

	return (
		<Button
			loading={loading}
			disabled={loading}
			style={{
				backgroundColor: accent,
				borderRadius: dp(57),
				justifyContent: "center",
			}}
			contentStyle={{
				width: dp(690),
				height: dp(138),
			}}
			uppercase={false}
			onPress={async () => {
				Keyboard.dismiss(); // dismiss keyboard and wait 100ms
				await new Promise(resolve => setTimeout(resolve, 100));

				onPress();
			}}
		>
			Next
		</Button>
	);
};

export default NextButton;
