import { dp } from "$utils/px2dp";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

const styles = StyleSheet.create({
	option: {
		alignItems: "center",
		justifyContent: "flex-end",
		flexDirection: "row-reverse",
	},
});
const GenderPrefField = () => {
	const [pref, setPref] = useState<string>("3");

	return (
		<View style={{ margin: dp(70) }}>
			<RadioButton.Group
				onValueChange={newValue => setPref(newValue)}
				value={pref}
			>
				<View style={styles.option}>
					<Text>A Male walking buddy 🧑</Text>
					<RadioButton value="1" />
				</View>
				<View style={styles.option}>
					<Text>A Female walking buddy 👩</Text>
					<RadioButton value="2" />
				</View>
				<View style={styles.option}>
					<Text>Surprise me!!</Text>
					<RadioButton value="3" />
				</View>
			</RadioButton.Group>
		</View>
	);
};

export default GenderPrefField;
