import { StyleSheet, Text, View, Image } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

export default function ImgView() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

  return (
    <View style={styles.container}>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 700,
    height: 340,
    resizeMode: "stretch"
  },
});
