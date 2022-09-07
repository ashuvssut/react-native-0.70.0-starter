import { hasLocationPermission } from "$utils/locationPermission";
import { MutableRefObject } from "react";
import { Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import {
	startForegroundService,
	stopForegroundService,
} from "screens/Home/map-engine/locationForegroundService";

export const GeoOptions: Geolocation.GeoOptions = {
	accuracy: {
		android: "high",
		ios: "bestForNavigation",
	},
	enableHighAccuracy: true, // !! Make it optional
	timeout: 15000,
	maximumAge: 10000,
	distanceFilter: 0,
	forceRequestLocation: true,
	forceLocationManager: false,
	showLocationDialog: true,
};

export const getLocationUpdates = async (
	watchIdRef: MutableRefObject<number | null>,
	onPosUpdate: (position: Geolocation.GeoPosition) => void,
	onPosUpdError: (err: Geolocation.GeoError) => void,
) => {
	const hasPermission = await hasLocationPermission();

	if (!hasPermission) return;

	try {
		let foregroundService = true;
		if (Platform.OS === "android" && foregroundService) {
			await startForegroundService();
		}

		// setObserving(true);
		watchIdRef.current = Geolocation.watchPosition(
			position => {
				console.log(
					"MODE: Continuous",
					position.coords.accuracy,
					position.coords.heading,
					position.timestamp,
				);
				onPosUpdate(position);
			},
			error => {
				onPosUpdError(error);
			},
			{
				...GeoOptions,
				interval: 5000,
				fastestInterval: 2000,
			},
		);
	} catch (err) {
		console.error(err);
	}
};

export const removeLocationUpdates = (
	watchId: MutableRefObject<number | null>,
) => {
	if (watchId.current !== null) {
		// stopForegroundService();
		Geolocation.clearWatch(watchId.current);
		watchId.current = null;
		// setObserving(false);
	}
};

export const getLocation = async (
	onPosUpdate: (position: Geolocation.GeoPosition) => void,
	onPosUpdError: (err: Geolocation.GeoError) => void,
	getFocus: ((position: Geolocation.GeoPosition) => void) | null,
	shouldPosUpdate: boolean = true,
) => {
	const hasPermission = await hasLocationPermission();
	if (!hasPermission) {
		return false;
	}
	try {
		Geolocation.getCurrentPosition(
			position => {
				if (shouldPosUpdate) onPosUpdate(position);
				if (getFocus) getFocus(position);
				return true;
			},
			error => {
				onPosUpdError(error);
				return false;
			},
			GeoOptions,
		);
	} catch (err) {
		console.error(err);
		return false;
	}
	return false;
};
