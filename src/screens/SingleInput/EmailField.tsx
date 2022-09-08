/* import { useAppDispatch, useAppSelector } from "$hooks/redux";
import { useCurrentTheme } from "$hooks/theme";
import { dp, sp } from "$utils/px2dp";
import React from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import {
	setEmail,
	setIsEmailValidnErrVisible,
} from "redux/slices/componentSlice";

const EmailField = () => {
	const isEmailValidnErrVisible = useAppSelector(
		({ compoReducer }) => compoReducer.isEmailValidnErrVisible,
	);
	const email = useAppSelector(({ compoReducer }) => compoReducer.email);

	const dispatch = useAppDispatch();
	const { secondaryText, placeholder } = useCurrentTheme().colors;

	return (
		<View style={{ margin: dp(70), marginTop: dp(100) }}>
			<TextInput
				value={email}
				onChangeText={val => {
					val = val.trim();
					isEmailValidnErrVisible &&
						dispatch(setIsEmailValidnErrVisible(false));

					dispatch(setEmail(val));
				}}
				style={{ backgroundColor: "#ffffff00", fontSize: sp(51) }}
				underlineColor={placeholder}
				activeUnderlineColor={secondaryText}
				placeholder="example@email.com"
				keyboardType="email-address"
				autoCapitalize="none"
				dense
			/>
			<HelperText type="error" visible={isEmailValidnErrVisible}>
				Invalid Email address
			</HelperText>
		</View>
	);
};

export default EmailField;
*/
export {};
