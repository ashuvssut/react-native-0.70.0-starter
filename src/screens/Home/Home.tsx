import React, { FC } from "react";
import { INavProps } from "$types/INavProps";
import { Caption } from "react-native-paper";
import { Screen } from "components/Screen";
import { useCurrentTheme } from "$hooks/theme";
import { StatusBar, StyleSheet, View } from "react-native";
import TopBar from "components/TopBar";
import { Location } from "$svg";
import { dp } from "$utils/px2dips";
import StatsBox from "screens/Home/StatsBox";
import { Map } from "screens/Home/Map";
import { DestinationBar } from "screens/Home/DestinationBar";

export interface IHome extends INavProps {}

export const Home: FC<IHome> = ({ navigation }) => {
	const theme = useCurrentTheme();
	const { surface } = theme.colors;

	return (
		<>
			<StatusBar
				animated={true}
				backgroundColor={surface}
				barStyle={theme.dark ? "light-content" : "dark-content"}
			/>
			<Screen bgColor="surface">
				<TopBar
					icon={Location} // !! use map-marker-alt from FA5
					subtitle={
						<Caption
							style={{ marginVertical: 0, lineHeight: 15 }}
							onPress={() => navigation.navigate("ChangeLocation")}
						>
							Change Location ›
						</Caption>
					}
				/>
				<StatsBox style={{ marginTop: dp(40) }} />
				<View style={styles.container}>
					<Map />
					<DestinationBar />
				</View>
			</Screen>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		marginTop: dp(40),
		borderTopLeftRadius: dp(85),
		borderTopRightRadius: dp(85),
		overflow: "hidden",
	},
});
