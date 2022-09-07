import React, { FC, useEffect, useRef, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation, { GeoPosition } from "react-native-geolocation-service";
import {
	getCamOptions,
	// getConstRadius,
	getZoom,
} from "screens/Home/map-engine/map";
import {
	getLocation,
	getLocationUpdates,
	removeLocationUpdates,
} from "screens/Home/map-engine/location";
import { LostMarker, PointMarker, TorchMarker } from "screens/Home/Marker";
import { FAB } from "react-native-paper";
import { useCurrentTheme } from "$hooks/theme";
import { dp } from "$utils/px2dips";
import { useAppDispatch, useAppSelector } from "$hooks/redux";
import { setLocation } from "redux/slices/mapSlice";

interface IMap {}

export const Map: FC<IMap> = ({}) => {
	const dispatch = useAppDispatch()
	const location = useAppSelector(({ mapReducer }) => mapReducer.location);
	const mapRef = useRef<MapView>(null);
	// const [markerRadius, setMarkerRadius] = useState<number>(100);
	const zoom = useRef<number>(13);
	const _longitudeDelta = useRef<number | null>(null);
	const _accuracy = useRef<number>(3200);
	const _heading = useRef<number | null>(90);
	const isNavMode = useRef<boolean>(false);
	const { colors } = useCurrentTheme();
	const stopUseEffect = useRef<boolean>(false);
	const lastLocation = useRef<GeoPosition | null>(null);

	const getFocus = (position: GeoPosition) => {
		if (mapRef.current) {
			const newCamera = getCamOptions({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				zoom: zoom.current,
				pitch: isNavMode.current ? 45: 0
				// heading,
			});
			mapRef.current.animateCamera(newCamera, { duration: 1000 });
		}
	};
	const onPosUpdate = (position: Geolocation.GeoPosition) => {
		if (mapRef.current) {
			const {
				accuracy,
				heading,
				speed,
				// latitude, longitude, altitude
			} = position.coords;
			_accuracy.current = accuracy;
			if (heading) _heading.current = heading;
		}
		stopUseEffect.current = true;
		lastLocation.current = position;
		dispatch(setLocation(position)); // updates map (One and only update trigger)
	};
	const onPosUpdError = (err: Geolocation.GeoError) => {
		console.log(`Code ${err.code}`, err.message, err);
		if (err.code === 2) {
			Alert.alert(
				"GPS not available",
				"Enable Device Location to continue showing your current location in the map",
			);
		}
		_heading.current = null;
		dispatch(setLocation(null));
	};

	useEffect(() => {
		// getFocus on load
		getLocation(onPosUpdate, onPosUpdError, getFocus, false);
	}, []);

	const watchId = useRef<number | null>(null);
	useEffect(() => {
		if (!stopUseEffect.current) {
			getLocationUpdates(watchId, onPosUpdate, onPosUpdError);
		}
		stopUseEffect.current = false;
		// return () => removeLocationUpdates(watchId);
	}, [location]);

	return (
		<>
			<MapView
				ref={mapRef}
				provider={PROVIDER_GOOGLE}
				style={{
					...StyleSheet.absoluteFillObject,
				}}
				initialCamera={getCamOptions({
					latitude: location?.coords.latitude || 20.5937,
					longitude: location?.coords.longitude || 78.9629,
					zoom: zoom.current,
					pitch: isNavMode.current ? 45 : 0,
				})}
				// onRegionChange={({ longitudeDelta, latitudeDelta }) => {
				// 	const markerRaduius = getConstRadius(
				// 		longitudeDelta,
				// 		latitudeDelta,
				// 		1200,
				// 	);
				// 	setMarkerRadius(markerRaduius);
				// }}
				onRegionChangeComplete={({ longitudeDelta }) => {
					if (longitudeDelta !== _longitudeDelta.current) {
						//user zoomed
						zoom.current = getZoom(longitudeDelta);
						_longitudeDelta.current = longitudeDelta;
					}
				}}
			>
				{location ? (
					<>
						<Circle
							radius={_accuracy.current}
							strokeColor="rgba(255, 89, 89, 0.3)"
							fillColor="rgba(255, 89, 89, 0.1)"
							center={{
								latitude: location?.coords.latitude,
								longitude: location?.coords.longitude,
							}}
						/>
						{/* <Circle
							radius={markerRadius}
							strokeColor="#fff"
							strokeWidth={2}
							fillColor="rgb(255, 89, 89)"
							center={{
								latitude: location?.coords.latitude,
								longitude: location?.coords.longitude,
							}}
						/> */}
						{_heading.current !== null ? (
							<TorchMarker
								coordinate={{
									latitude: location?.coords.latitude,
									longitude: location?.coords.longitude,
								}}
								heading={_heading}
								isNavMode={isNavMode}
							/>
						) : (
							<PointMarker
								coordinate={{
									latitude: location?.coords.latitude,
									longitude: location?.coords.longitude,
								}}
							/>
						)}
					</>
				) : lastLocation.current ? (
					<LostMarker
						coordinate={{
							latitude: lastLocation.current.coords.latitude,
							longitude: lastLocation.current.coords.longitude,
						}}
					/>
				) : null}
			</MapView>
			<FAB
				style={{
					position: "absolute",
					bottom: dp(300) + 15,
					right: 15,
					backgroundColor: colors.surface,
				}}
				color={colors.accent}
				icon="crosshairs-gps"
				onPress={() => {
					if (!location) getLocation(onPosUpdate, onPosUpdError, getFocus);
					else getFocus(location!);
				}}
			/>
		</>
	);
};
