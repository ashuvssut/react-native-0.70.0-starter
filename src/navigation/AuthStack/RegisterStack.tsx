import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SingleInput } from "screens/SingleInput";
import PhoneField from "screens/SingleInput/PhoneField";
import OTPField from "screens/SingleInput/OTPField";
import { useAppSelector } from "$hooks/redux";
import { parsePhoneNumber } from "libphonenumber-js";
import { NativeStackScreenProps as NSSProps } from "@react-navigation/native-stack";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
// import EmailField from "screens/SingleInput/EmailField";
// import GenderPrefField from "screens/SingleInput/GenderPrefField";

export type RegisterStackParamList = {
	PhoneField: undefined;
	OTPField: {
		confirmationResult: FirebaseAuthTypes.ConfirmationResult;
	};
};
export type RegisterStackScreens = keyof RegisterStackParamList;
export type TPhoneFieldProps = NSSProps<RegisterStackParamList, "PhoneField">;
export type TOTPFieldProps = NSSProps<RegisterStackParamList, "OTPField">;

const Stack = createNativeStackNavigator<RegisterStackParamList>();

const RegisterStack: FC = () => {
	let phnNum = useAppSelector(
		({ compoReducer }) => compoReducer.phNumberData.phNum,
	);

	try {
		if (phnNum) phnNum = parsePhoneNumber(phnNum).formatInternational();
	} catch (err) {
		console.log(err);
	}

	// const email = useAppSelector(({ compoReducer }) => compoReducer.email);

	return (
		<Stack.Navigator initialRouteName="PhoneField">
			<Stack.Screen options={{ header: () => null }} name="PhoneField">
				{props => (
					<SingleInput
						{...props}
						title={`Enter your ${"\n"}mobile number`}
						fieldCompo={<PhoneField {...props} nextRoute="OTPField" />}
					/>
				)}
			</Stack.Screen>
			<Stack.Screen options={{ header: () => null }} name="OTPField">
				{props => (
					<SingleInput
						{...props}
						title={`Verify your ${"\n"}mobile number`}
						subtitle={`Enter the 6-digit OTP sent to ${phnNum}`}
						fieldCompo={<OTPField {...props} />}
					/>
				)}
			</Stack.Screen>
			{/* <Stack.Screen options={{ header: () => null }} name="Email">
				{props => (
					<SingleInput
						{...props}
						title={`Enter your ${"\n"}Email address`}
						nextRoute="EmailOTP"
						fieldCompo={<EmailField />}
						validationFn={isEmailValid}
					/>
				)}
			</Stack.Screen>
			<Stack.Screen options={{ header: () => null }} name="EmailOTP">
				{props => (
					<SingleInput
						{...props}
						title={`Verify your ${"\n"}Email address`}
						subtitle={`Enter the 4-digit OTP sent to ${email}`}
						nextRoute="PhoneField"
						fieldCompo={<OTPField />}
					/>
				)}
			</Stack.Screen> */}
			{/* <Stack.Screen options={{ header: () => null }} name="GenderPref">
				{props => (
					<SingleInput
						{...props}
						title={`Who would you prefer to walk with the most?`}
						subtitle={`This will help us give you better buddy suggestions`}
						nextRoute=""
						fieldCompo={<GenderPrefField />}
					/>
				)}
			</Stack.Screen> */}
		</Stack.Navigator>
	);
};

export default RegisterStack;
