import { useAppSelector } from "$hooks/redux";
import React, { FC } from "react";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";

const Routes: FC = () => {
	const uid = useAppSelector(({ userReducer }) => userReducer.uid);

	if (!uid) {
		return <AuthStack />;
	}

	return <AppStack />;
};
export default Routes;
