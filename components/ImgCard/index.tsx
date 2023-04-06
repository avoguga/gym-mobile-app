import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

interface ICard {
  name: String[];
  onClick?: any;
  img?: any;
  onDelete?: any;
}

export default function ImgCard({ name, onClick, img, onDelete }: ICard) {
  const navigate = useNavigation<any>();

  const handlePress = () => {
    onClick();
    navigate.navigate("ImgView", {
      cardElements: {
        name: name,
        img: img,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => handlePress()}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.cardTitle, { marginBottom: 30, flex: 1 }]}>
          {name}
        </Text>
        {Platform.OS === "web" ? (
          <TouchableOpacity onPress={() => onDelete()}>
            <Image
              style={{ width: 20, height: 20, marginBottom: 10, marginTop: 5 }}
              source={require("./icons8-trash-can-64.png")}
            />
          </TouchableOpacity>
        ) : (
          <Icon
            name="trash"
            type="font-awesome"
            color="#fff"
            onPress={() => onDelete()}
            iconStyle={{ marginBottom: 10, marginTop: 5 }}
          />
        )}
      </View>
      <Image
        style={styles.cardImg}
        source={{
          uri: img,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  description: {},
  price: {},
  button: {
    width: 250,
    backgroundColor: "white",
    borderRadius: 20,
    marginLeft: 55,
  },
  type: {},
  card: {
    backgroundColor: "#c90087",
    width: 390,
    height: 300,
    borderRadius: 15,
    margin: 10,
    padding: 10,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 5,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  cardImg: {
    width: 370,
    height: 200,
    resizeMode: "stretch",
  },
});
