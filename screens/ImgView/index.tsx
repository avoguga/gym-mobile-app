import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { Button } from "@rneui/themed";

export default function ImgView({ route, navigation }: any) {

  const [rotation, setRotation] = useState("0deg");

  useEffect(() => {
    const updateRotation = () => {
      if (Platform.OS === "web") {
        setRotation(
          window.screen.orientation.type === "portrait-primary"
            ? "90deg"
            : "0deg"
        );
      } else {
        setRotation("0deg");
      }
    };

    updateRotation();

    if (Platform.OS === "web") {
      window.addEventListener("resize", updateRotation);
      return () => window.removeEventListener("resize", updateRotation);
    }
  }, []);

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
          style={[styles.img, { transform: [{ rotate: rotation }] }]}
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
  },
});
