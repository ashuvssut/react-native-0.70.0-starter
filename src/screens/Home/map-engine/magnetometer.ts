export const getHeading = (x: number, y: number) => {
	if (Math.atan2(y, x) >= 0) {
		return Math.atan2(y, x) * (180 / Math.PI);
	} else {
		return (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
	}
};
