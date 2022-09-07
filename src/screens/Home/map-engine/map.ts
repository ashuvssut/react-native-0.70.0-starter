import { Camera } from "react-native-maps";
import _ from "lodash";

interface GetCamOptions {
	latitude: number;
	longitude: number;
	zoom: number;
	heading?: number | null;
	altitude?: number;
	pitch?: number;
}
export const getCamOptions = ({
	latitude,
	longitude,
	zoom,
	heading,
	altitude,
	pitch,
}: GetCamOptions): Camera => {
	return {
		center: { latitude, longitude },
		zoom,
		heading: heading ?? 0,
		altitude: altitude ?? 5,
		pitch: pitch ?? 45,
	};
};

export const getZoom = (longitudeDelta: number) => {
	return Math.ceil(Math.log(360 / longitudeDelta) / Math.LN2) + 1;
};

export const getConstRadius = (
	longitudeDelta: number,
	latitudeDelta: number,
	constant: number,
) => {
	const radius = _.round(((longitudeDelta + latitudeDelta) / 2) * constant);
	if (radius < 1) {
		return 1;
	}
	return radius;
};
