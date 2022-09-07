import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { useCurrentTheme } from "$hooks/theme";
import Routes from "./navigation";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";

const App = () => {
	const theme = useCurrentTheme();
	return (
		<PaperProvider theme={theme}>
			{/**
			 * All providers like Redux's store provider should always be wrapped outside PaperProvider.
			 *ref https://callstack.github.io/react-native-paper/getting-started.html
			 */}
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1 }}>
					<StatusBar
						animated={true}
						backgroundColor={theme.colors.background}
						barStyle={theme.dark ? "light-content" : "dark-content"}
					/>
					<NavigationContainer>
						<Routes />
					</NavigationContainer>
				</SafeAreaView>
			</SafeAreaProvider>
		</PaperProvider>
	);
};

export default App;
