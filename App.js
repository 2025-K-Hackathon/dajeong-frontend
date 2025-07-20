import * as Font from "expo-font";
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
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
      })
      setIsReady(true);
    }

    loadFonts();
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
