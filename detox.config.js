module.exports = {
  configurations: {
    "ios.sim.debug": {
      binaryPath:
        "ios/build/Build/Products/Debug-iphonesimulator/MyProject.app",
      build:
        "xcodebuild -workspace ios/MyProject.xcworkspace -scheme MyProject -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
      type: "ios.simulator",
      name: "iPhone 11",
    },
    "android.emu.debug": {
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      build:
        "cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..",
      type: "android.emulator",
      name: "Pixel_3a_API_30_x86",
    },
  },
  "test-runner": "jest",
  "runner-config": "e2e/config.json",
  artifacts: {
    root: "e2e/artifacts",
    plugins: {
      "reacy-native": {
        type: "react-native",
        renderer: "react-native",
      },
    },
  },
};
