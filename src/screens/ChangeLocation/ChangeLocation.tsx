import React, { FC } from "react";
import { INavProps } from "$types/INavProps";
import { Screen } from "components/Screen";
import { useCurrentTheme } from "$hooks/theme";
import { Alert, ScrollView, StatusBar, View } from "react-native";
import { Divider, List, TextInput } from "react-native-paper";
import { dp } from "$utils/px2dips";
import { useAppDispatch, useAppSelector } from "$hooks/redux";
import { GeoError, GeoPosition } from "react-native-geolocation-service";
import { setLocation } from "redux/slices/mapSlice";
import { getLocation } from "screens/Home/map-engine/location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export interface IChangeLocation extends INavProps {}

export const ChangeLocation: FC<IChangeLocation> = ({ navigation }) => {
	const theme = useCurrentTheme();
	const { colors } = theme;
	const dispatch = useAppDispatch();
	const location = useAppSelector(({ mapReducer }) => mapReducer.location);
	const onPosUpdate = (position: GeoPosition) =>
		dispatch(setLocation(position));
	const onPosUpdError = (err: GeoError) => {
		console.log(`Code ${err.code}`, err.message, err);
		if (err.code === 2) {
			Alert.alert(
				"Enable Location",
				"Enable Device Location to use your current location",
			);
		}
	};

	return (
		<>
			<StatusBar
				animated={true}
				backgroundColor={colors.surface}
				barStyle={theme.dark ? "light-content" : "dark-content"}
			/>
			<Screen bgColor="surface">
				<View>
					<TextInput
						mode="outlined"
						style={{
							marginTop: dp(10),
							marginHorizontal: dp(35),
							height: dp(140),
							backgroundColor: "transparent",
							alignSelf: "stretch",
						}}
						theme={{ roundness: dp(88) }}
						placeholder="Choose start location"
						selectionColor={colors.placeholder}
						underlineColor="transparent"
						activeUnderlineColor="transparent"
						underlineColorAndroid="transparent"
						textAlign="center"
						left={
							<TextInput.Icon
								name="arrow-left"
								color={!theme.dark ? "#555" : "#fff"}
								style={{ transform: [{ translateY: dp(10) }] }}
								onPress={() => navigation.goBack()}
							/>
						}
					/>
					<List.Item
						title="Your Current Location"
						style={{ padding: 0, paddingHorizontal: dp(20), marginTop: dp(10) }}
						left={props => (
							<List.Icon
								{...props}
								style={{
									backgroundColor: "#96ccff44",
									borderRadius: dp(100),
									transform: [{ scale: 0.8 }],
								}}
								color="#81B7FF"
								icon="crosshairs-gps"
							/>
						)}
						onPress={async () => {
							if (!location) {
								if (await getLocation(onPosUpdate, onPosUpdError, null)) {
									navigation.goBack();
								}
							} else navigation.goBack();
						}}
					/>
					<Divider style={{ marginHorizontal: dp(60) }} />
					<View style={{ height: "100%" }}>
						<GooglePlacesAutocomplete
							placeholder="Search"
							onPress={(data, details = null) => {
								// 'details' is provided when fetchDetails = true
								console.log(111,data, details);
							}}
							query={{
								key: "AIzaSyCojCn-KEf3YsK9wpJB8nUMcXeT0BTL69g",
								language: "en",
							}}
						/>
					</View>
				</View>
			</Screen>
		</>
	);
};
