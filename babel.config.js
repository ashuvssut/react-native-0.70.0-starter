module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["module:metro-react-native-babel-preset"],
		env: {
			production: {
				plugins: ["react-native-paper/babel"],
			},
		},
		presets: ["module:metro-react-native-babel-preset"],
		plugins: [
			[
				"module-resolver",
				{
					extensions: [
						".js",
						".jsx",
						".ts",
						".tsx",
						".android.js",
						".android.tsx",
						".ios.js",
						".ios.tsx",
					],
					root: ["./src"],
					alias: {
						$hooks: ["./src/theme", "./src/hooks"],
						$types: ["./src/types/*"],
						"$types/redux": ["./src/redux/types"],
						$svg: ["./src/assets/svg/index"],
						$utils: ["./src/utils/*"],
					},
				},
			],
		],
	};
};
