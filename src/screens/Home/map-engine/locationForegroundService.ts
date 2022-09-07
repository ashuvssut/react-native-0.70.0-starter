import { Platform } from "react-native";
import appConfig from "../../../../../app.json";
// @ts-ignore
import VIForegroundService from "@voximplant/react-native-foreground-service";

export const startForegroundService = async () => {
	if (Platform.Version >= 26) {
		const channelConfig = {
			id: "locationChannel",
			name: "Location Tracking Channel",
			description: "Tracks location of user",
			enableVibration: false,
		};
		await VIForegroundService.getInstance().createNotificationChannel(
			channelConfig,
		);
	}

	const notificationConfig = {
		channelId: "locationChannel",
		id: 3900,
		title: appConfig.displayName,
		text: "Tracking location updates",
		icon: "ic_launcher",
	};
	try {
		return VIForegroundService.getInstance().startService(notificationConfig);
	} catch (e) {
		console.error(e);
	}
};

export const stopForegroundService = () => {
	VIForegroundService.getInstance()
		.stopService()
		.catch((err: any) => console.log(err));
};
