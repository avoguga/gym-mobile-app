import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

interface ICard {
  name: String[];
  onClick?: any;
  img?: any;
}

export default function ImgCard({
  name,
  onClick,
  img,
}: ICard) {
  const navigate = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigate.navigate("ImgView", {
          cartElements: {
            name: name,
            img: img,
          },
        })
      }
    >
      <Image
        style={styles.cardImg}
        source={{
          uri: img,
        }}
      />
      <Text style={[styles.cardTitle, { marginTop: 30 }]}>{name}</Text>
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
    backgroundColor: "#493d8a",
    width: 390,
    height: 400,
    borderRadius: 15,
    margin: 10,
    alignItems: "baseline",
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
