import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

export default function ImgView({ route, navigation }: any) {
  return (
    <ReactNativeZoomableView
      maxZoom={4}
      minZoom={1}
      initialZoom={1}
      bindToBorders={true}
      style={styles.container}
    >
      <Image
        source={{ uri: route.params.cardElements.img }}
        style={styles.img}
      />
    </ReactNativeZoomableView>
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
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
});
