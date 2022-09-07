import {
	setIsEmailValidnErrVisible,
	setIsOtpValidnErrVisible,
} from "redux/slices/componentSlice";
import { store } from "redux/store";
import { validate } from "validate.js";


export const isPhnOTPValid = async () => {
	const confirmationResult = store.getState().compoReducer.phnAuthConfirmResult;
	const otpCode = store.getState().compoReducer.otpCode;
	try {
		const result = await confirmationResult?.confirm(otpCode);
		console.log("abcabc", result);
		if (!result) {
			console.error("confirmationResult object is undefined");
			return false;
		}
		console.log("hahaha", confirmationResult);
		return true;
	} catch (err) {
		console.log(err);
		store.dispatch(setIsOtpValidnErrVisible(true));
		return false;
	}
};


export const isEmailValid = async () => {
	const email = store.getState().compoReducer.email;

	let constraints = {
		from: {
			email: true,
		},
	};

	const isValid =
		validate({ from: email }, constraints) === undefined ? true : false;
	store.dispatch(setIsEmailValidnErrVisible(!isValid));

	return isValid;
};
