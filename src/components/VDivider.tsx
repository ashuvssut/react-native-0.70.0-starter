import React from "react";
import { Divider } from "react-native-paper";

function VDivider({ color }: { color: string }) {
	return (
		<Divider style={{ width: 1, height: "100%", backgroundColor: color }} />
	);
}

export default VDivider;
