import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./src/navigations";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          extraLight: require("./assets/fonts/Pretendard-ExtraLight.otf"),
          light: require("./assets/fonts/Pretendard-Light.otf"),
          thin: require("./assets/fonts/Pretendard-Thin.otf"),
          regular: require("./assets/fonts/Pretendard-Regular.otf"),
          medium: require("./assets/fonts/Pretendard-Medium.otf"),
          semiBold: require("./assets/fonts/Pretendard-SemiBold.otf"),
          bold: require("./assets/fonts/Pretendard-Bold.otf"),
          extraBold: require("./assets/fonts/Pretendard-ExtraBold.otf"),
          black: require("./assets/fonts/Pretendard-Black.otf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    };

    loadResources();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Navigation />
      <StatusBar style="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
