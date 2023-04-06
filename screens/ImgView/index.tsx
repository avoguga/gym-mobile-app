import React from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { Button } from "@rneui/themed";

export default function ImgView({ route, navigation }: any) {
  // FUNCTION TO RETURN TO PREVIOUS SCREEN
  const handleBack = () => {
    navigation.goBack();
  };


  return (
    <>
        <Button
          title="Voltar para a tela inicial"
          onPress={handleBack}
          buttonStyle={{
            position: "relative",
            top: 0,
            left: 0,
            backgroundColor: "#c90087",
          }}
        />
      <ReactNativeZoomableView
        maxZoom={4}
        minZoom={0.5}
        initialZoom={1}
        bindToBorders={true}
        style={styles.container}
      >
        <Image
          source={{ uri: route.params.cardElements.img }}
          style={styles.img}
        />
      </ReactNativeZoomableView>
    </>
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
    width: Platform.OS === "web" ? "200%" : "100%",
    height: Platform.OS === "web" ? "200%" : "100%",
    resizeMode: "contain",
    // if it is an google browser, it will rotate the img 90 degrees
    transform: [{ rotate: Platform.OS === "web" ? "90deg" : "0deg" }],
  },
});
