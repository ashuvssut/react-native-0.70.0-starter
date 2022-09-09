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
						".ts",
						".tsx",
						".android.ts",
						".android.tsx",
						".ios.ts",
						".ios.tsx",
					],
					root: ["./src"],
					alias: {
						$hooks: ["./src/theme", "./src/hooks"],
						$types: ["./src/types"],
						"$types/redux": ["./src/redux/types"],
						$svg: ["./src/assets/svg/index"],
						$utils: ["./src/utils"],
					},
				},
			],
			"react-native-reanimated/plugin", // !! added Reanimated plugin. It has to be listed last.
		],
	};
};
