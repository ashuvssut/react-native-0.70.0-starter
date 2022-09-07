import { dp, sp } from "$utils/px2dips";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import {
	FlatList,
	ListRenderItemInfo,
	LogBox,
	Pressable,
	View,
} from "react-native";
import { Divider, HelperText, Menu, Text, TextInput } from "react-native-paper";
import {
	countriesData,
	CountryData,
	IsoCodes,
} from "screens/SingleInput/countries";
import FlagIcon from "screens/SingleInput/FlagIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useCurrentTheme } from "$hooks/theme";
import {
	AsYouType,
	CountryCode,
	isValidPhoneNumber,
	validatePhoneNumberLength,
} from "libphonenumber-js";
import { useAppDispatch } from "$hooks/redux";
import { setPhNumberData } from "redux/slices/componentSlice";
import NextButton from "screens/SingleInput/NextButton";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { INavProps } from "$types/INavProps";
import { setUID } from "redux/slices/userSlice";

interface IPhoneField extends INavProps {
	nextRoute: string;
}
const PhoneField: FC<IPhoneField> = ({ navigation, nextRoute }) => {
	const dispatch = useAppDispatch();

	const [isPhnValidnErrVisible, setIsPhnValidnErrVisible] = useState(false);

	const { secondaryText, placeholder } = useCurrentTheme().colors;

	const [phNumText, setPhNumText] = useState("");
	const isoCode = useRef<IsoCodes>("IN");
	const cCIndex = useRef<number>(0); // callingCode

	const [ccMenuVisible, setCCMenuVisible] = React.useState<boolean>(false);
	const [countryMenuVisible, setCountryMenuVisible] =
		React.useState<boolean>(false);

	const openCCMenu = () => {
		setCCMenuVisible(true);
	};

	const getCountryCode = () => isoCode.current as CountryCode;
	const getCallingCode = () =>
		`+${countriesData[isoCode.current].callingCodes[cCIndex.current]}`;
	const getFormattedPhNum = () => {
		return new AsYouType(getCountryCode())
			.input(getCallingCode() + phNumText)
			.slice(getCallingCode().length + 1)
			.split("")
			.join(" ");
		//  formatting & remove callingcode & add spacing
	};
	const onChangePhNumText = (phNum: string) => {
		isPhnValidnErrVisible && setIsPhnValidnErrVisible(false);
		phNum = phNum.replace(/\D/g, ""); // strip non-numeric chars

		if (validatePhoneNumberLength(phNum, getCountryCode()) === "TOO_LONG") {
			return;
		}

		setPhNumText(phNum);
	};
	const flagWidth = dp(130);
	const aspectRatio = 4 / 3;
	const flagHeight = flagWidth / aspectRatio;

	const comparator = (a: [string, CountryData], b: [string, CountryData]) =>
		a[0].localeCompare(b[0]);

	const flatListCountryData = useMemo(() => {
		return Object.entries(countriesData).sort(comparator);
	}, [countriesData]);
	const renderItem = ({
		item,
		index,
	}: ListRenderItemInfo<[string, CountryData]>) => {
		const [countryIsoCode, countryData] = item;
		const { callingCodes, name } = countryData;
		return (
			<>
				{index === 0 && (
					<>
						<Menu.Item
							key={"cd-first"}
							onPress={() => setCountryMenuVisible(false)}
							title={`${getCountryCode()}, ${getCallingCode()}`}
						/>
						<Divider />
					</>
				)}
				{callingCodes[0] !== "" && (
					<Menu.Item
						key={"cd-" + index}
						onPress={() => {
							isoCode.current = countryIsoCode as IsoCodes;
							setCountryMenuVisible(false);
							setPhNumText("");
							dispatch(
								setPhNumberData({ phNum: "", isoCode: isoCode.current }),
							);
						}}
						title={`${countryIsoCode}, +${callingCodes.join(", +")}`}
					/>
				)}
			</>
		);
	};
	const memoizedRenderItem = useMemo(() => renderItem, [flatListCountryData]);

	const [allowNav, setAllowNav] = useState(false);
	const [confirmationResult, setConfirmationResult] =
		useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
	useEffect(() => {
		if (confirmationResult != null) {
			setAllowNav(true);
		}
		if (allowNav) {
			setAllowNav(false);
			const confirmation = confirmationResult;
			setConfirmationResult(null);

			LogBox.ignoreLogs([
				"Non-serializable values were found in the navigation state",
			]);
			navigation.navigate(nextRoute, {
				confirmationResult: confirmation,
			});
		}
	}, [confirmationResult]);

	const finalPhNum = getCallingCode() + getFormattedPhNum();
	const sendPhNumOTP = async () => {
		try {
			if (!finalPhNum) {
				console.error("PhNum (validatedNum) value is NOT set");
			}

			const confirmation = await auth().signInWithPhoneNumber(finalPhNum, true);
			setConfirmationResult(confirmation);
		} catch (err) {
			console.error(err);
		}
	};

	const isPhoneNumValid = async () => {
		if (!finalPhNum) {
			setIsPhnValidnErrVisible(true);
			return false;
		}
		const isValid = isValidPhoneNumber(
			finalPhNum,
			isoCode as unknown as CountryCode,
		);
		setIsPhnValidnErrVisible(!isValid);
		return isValid;
	};

	// useEffect(() => {
	// 	firebase.auth().onAuthStateChanged(user => {
	// 		if (user) {
	// 			console.log("(PF compo) user signed in", user);
	// 		} else {
	// 			console.log("(PF compo) No user signed in");
	// 		}
	// 	});
	// }, []);

	const signOut = async () => {
		try {
			await auth().signOut();
			dispatch(setUID(""));
			console.log("User signed out!");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					margin: dp(70),
				}}
			>
				<View
					style={{
						height: dp(78),
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center",
					}}
				>
					<View
						style={{
							borderRadius: dp(25),
							width: flagWidth,
							height: flagHeight,
							overflow: "hidden",
						}}
					>
						<Menu
							visible={countryMenuVisible}
							onDismiss={() => setCountryMenuVisible(false)}
							anchor={
								<Pressable onPress={() => setCountryMenuVisible(true)}>
									<FlagIcon
										isoCode={isoCode.current}
										width={flagWidth} //put in 4:3 Ratio
									/>
								</Pressable>
							}
						>
							<FlatList
								data={flatListCountryData}
								renderItem={memoizedRenderItem}
								keyExtractor={item => item[0]}
								initialNumToRender={7}
								style={{
									flexGrow: 0,
									height: dp(900),
									width: dp(460),
								}}
							/>
						</Menu>
					</View>

					<Icon
						name="chevron-down"
						style={{}}
						size={dp(50)}
						color={secondaryText}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						flex: 1,
						marginLeft: dp(82),
					}}
				>
					<View>
						<Menu
							visible={ccMenuVisible}
							onDismiss={() => setCCMenuVisible(false)}
							anchor={
								<Text
									style={{
										fontSize: sp(51),
										width: dp(153),
										textAlign: "left",
									}}
									onPress={openCCMenu}
								>
									{getCallingCode()}
								</Text>
							}
						>
							{countriesData[isoCode.current].callingCodes.map((CC, i) => {
								return (
									<Menu.Item
										key={"cc-" + i}
										onPress={() => {
											cCIndex.current = i;
											setCCMenuVisible(false);

											let phNum = getCallingCode() + phNumText;
											phNum = phNum.replace(/ /g, "");

											dispatch(
												setPhNumberData({ phNum, isoCode: isoCode.current }),
											);
										}}
										title={`+${CC}`}
									/>
								);
							})}
						</Menu>
					</View>
					<View style={{ flex: 1 }}>
						<TextInput
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								flex: 1,
								backgroundColor: "#ffffff00",
								fontSize: sp(51),
							}}
							value={getFormattedPhNum()}
							dense
						></TextInput>
						<TextInput
							value={getFormattedPhNum()}
							onChangeText={onChangePhNumText}
							style={{
								flex: 1,
								backgroundColor: "#ffffff00",
							}}
							theme={{ colors: { text: "#ffffff00" } }}
							selectionColor="#ffffff00"
							placeholder={`98765 43210`.split("").join(" ")}
							underlineColor={placeholder}
							activeUnderlineColor={secondaryText}
							dense
							keyboardType="numeric"
						/>
						<HelperText
							style={{ position: "absolute", bottom: "-50%" }}
							type="error"
							visible={isPhnValidnErrVisible}
						>
							Invalid Phone Number
						</HelperText>
					</View>
				</View>
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
					loading={allowNav}
					onPress={async () => {
						dispatch(
							setPhNumberData({
								phNum: getCallingCode() + " " + getFormattedPhNum(),
								isoCode: isoCode.current,
							}),
						);
						const isValid = await isPhoneNumValid();
						if (!isValid) return;
						try {
							setAllowNav(true);
							await signOut(); // Bad (I think)
							await sendPhNumOTP();
						} catch (error) {
							console.error(error);
						}
					}}
				/>
			</View>
		</>
	);
};

export default PhoneField;
