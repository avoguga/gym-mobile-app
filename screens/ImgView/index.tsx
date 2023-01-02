import { StyleSheet, Text, View, Image } from "react-native";

export default function ImgView({ route, navigation }: any) {
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: route.params.cardElements.img }} style={styles.img} />
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
    resizeMode: "stretch",
  },
});
