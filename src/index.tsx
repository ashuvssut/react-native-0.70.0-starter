import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { Text } from "react-native";

const persistor = persistStore(store);

const Root = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Text>adsfasdf</Text>
			</PersistGate>
		</Provider>
	);
};

export default Root;
