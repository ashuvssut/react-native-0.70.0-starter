# React Native 0.70.0 project starter (Opinionated)

Get Started with React Native 0.70.0 project with an opinionated Folder Structure along with pre-configured popular packages like Reanimated v2, React Native Gesture Handler, React Navigation v6, Flipper Debugger, Firebase Auth, React Native Paper, React Native Vector Icons, Redux Toolkit, Redux Persist. **Bonus**: Pre Configure GitHub Action for automatically generating the app's apk when code is pushed to main branch!

### Getting Started
Clone this RN 0.70.0 starter project and replace the word "lilac" with your project name everywhere. Rename Folders having word "lilac" with you project name. 
> NOTE: app package name is of the form of `com.<project-name>`


1. Install all the dependencies using yarn.
```bash
yarn install
```

2. Let's start the development
   (See scripts in package.json)

- Start Metro bundler
	```bash	
	yarn metro
	```
-	Start creating & running the Development build.
	```bash
	yarn dev # for android.
	```
	
Done! Your Project should run just fine.

### How this starter project is opinionated?

This Project has a Opinionated Project Structure. It uses TypeScript by default. It does not allows any JavaScript .js or .jsx Files. It uses absolute import statements only(See [tsconfig.json](./tsconfig.json) and [babel.config.js](./babel.config.js)).

This Project already has Firebase Auth Setup with login screens (Using Phone Number). It uses React Native Paper for themeing.

This Project uses the packages mentioned below. These packages are already configured for you. Read their respective docs to change configurations.

1. For Debugging (**IMPORTANT**: Requires Flipper v0.162.0)
   - redux-flipper: 2.0.2
   - react-native-flipper: 0.162.0

2. For State management and storage
   - @reduxjs/toolkit: 1.8.5
   - redux-persist: 6.0.0
   - react-redux: 8.0.2
   - @react-native-async-storage/async-storage: 1.17.10

3. For Animation
   - react-native-reanimated: 2.10.0
   - react-native-gesture-handler: 2.6.0

4. Uses Firebase Auth 

5. Navigation
   - @react-navigation/native: 6.0.12

6. Material UI (React native paper) and Vector Icons
   - react-native-paper: 4.12.4
   - react-native-svg: 13.1.0
   - react-native-vector-icons: 9.2.0

7. Misc Packages (Remove as necessary)
   - @react-native-community/masked-view: 0.1.11
   - react-native-linear-gradient: 2.6.2
   - libphonenumber-js: 1.10.13
   - react-native-redash: 18.0.0

### Known Problems
- Right now this starter template is only tested for android. **This starter template is not tested for iOS. It will need additional configurations**
- This Project can not use React Native's new Architecture with Fabric rendrer because Reanimated v2 does not support the new architecure.

- The new reanimated v3 will support the new Architecture (Currently only RC version is available. I will wait for its Stable release). The RC version did not work out as it had a few Build errors (I tested with Reanimated v3.0.0-rc.2). To learn how to install Reanimated v3 [follow this link](https://blog.swmansion.com/announcing-reanimated-3-16167428c5f7)

- When the stable Reanimated v3 will roll out, I will update packages and enable the new Architecture.

### Contribute

1. All PRs are appreciated to improve this Readme.md. 
2. If you have any suggestion regarding code contributions, head over to [Discussions](https://github.com/ashuvssut/react-native-0.70.0-starter/discussions) and tell us about it.
3. Contribute a Feature
   - Splash Screen ✨
