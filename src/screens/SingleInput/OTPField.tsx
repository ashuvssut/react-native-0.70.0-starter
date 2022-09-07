import { useCurrentTheme } from "$hooks/theme";
import { dp, sp } from "$utils/px2dips";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { HelperText, Text } from "react-native-paper";
import NextButton from "screens/SingleInput/NextButton";
import { INavProps } from "$types/INavProps";
import { firebase } from "@react-native-firebase/auth";
import { useAppDispatch } from "$hooks/redux";
import { setUID } from "redux/slices/userSlice";

interface IOTPField extends INavProps {}
// interface INavProps {
// 	route: {
// 		params: {
// 			confirmationResult: FirebaseAuthTypes.ConfirmationResult;
// 		};
// 	};
// } // help plz

const OTPField: FC<IOTPField> = ({ route }) => {
	// @ts-ignore
	const { confirmationResult } = route!.params; // help plz
	const OTP_LENGTH = 6;

	const { colors } = useCurrentTheme();
	const [otpCode, setOtpCode] = useState("");
	const [isOtpValidnErrVisible, setIsOtpValidnErrVisible] = useState(false);

	const dispatch = useAppDispatch()
	useEffect(() => {
		setOtpCode("");
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log("User signed in", user);
				dispatch(
					setUID(user.uid),
				);
			} else {
				console.log("No user signed in");
			}
		});
	}, []);
	const renderOtpBoxes = () => {
		const otpBoxes: ReactNode[] = [];
		for (let i = 0; i < OTP_LENGTH; i++) {
			let num = otpCode.charAt(i);
			let color: string;
			if (num) {
				color = colors.text;
			} else {
				num = "-";
				color = colors.placeholder;
			}

			otpBoxes.push(
				<Text
					key={"otpbox" + i}
					style={{
						backgroundColor: colors.background,
						borderRadius: dp(40),
						padding: dp(30),
						fontFamily: "SFMonoRegular",
						color,
						aspectRatio: 1,
						textAlign: "center",
						textAlignVertical: "center",
						fontSize: sp(50),
						elevation: dp(3),
					}}
				>
					{` ${num} `}
				</Text>,
			);
		}
		return otpBoxes;
	};
	return (
		<>
			<View style={{ marginTop: dp(70) }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-evenly",
					}}
				>
					{renderOtpBoxes()}
				</View>
				<TextInput
					style={{
						...StyleSheet.absoluteFillObject,
						width: "100%",
						height: "100%",
						opacity: 0,
					}}
					selectionColor="#ffffff00"
					selectTextOnFocus={false}
					contextMenuHidden={true}
					maxLength={OTP_LENGTH}
					caretHidden
					value={otpCode}
					onChangeText={(val: string) => {
						setOtpCode(val.replace(/\D/g, ""));

						if (isOtpValidnErrVisible) {
							setIsOtpValidnErrVisible(false);
						}
					}}
					keyboardType="numeric"
				/>
				<HelperText
					style={{ position: "absolute", bottom: "-50%" }}
					type="error"
					visible={isOtpValidnErrVisible}
				>
					Invalid OTP
				</HelperText>
			</View>
			<View
				style={{
					justifyContent: "flex-end",
					paddingBottom: dp(195),
					alignItems: "center",
					flex: 1,
				}}
			>
				<NextButton
					// loading
					onPress={async () => {
						try {
							const userInfo = await confirmationResult.confirm(otpCode);
						} catch (error) {
							setIsOtpValidnErrVisible(true);
							console.error(error);
						}
					}}
				/>
			</View>
		</>
	);
};

export default OTPField;
