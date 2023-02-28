import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import ImgCard from "../../components/ImgCard";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/native";
import { Input } from "@rneui/themed";
import { Icon } from "@rneui/base";

export default function HomeScreen() {
  const navigate = useNavigation<any>();

  const [img, setImg]: any = useState();
  const [imgName, setImgName] = useState([""]);
  const [orientationIsLandscape, setOrientation] = useState(false);
  const [searchText, setSearchText] = useState("");

  const storage = getStorage(app);
  const storageRef = ref(storage, `workouts/`);

  const atualizar = () => {
    listAll(storageRef)
      .then((res) => {
        let imgPromises = res.items.map((imageRef) => getDownloadURL(imageRef));
        Promise.all(imgPromises).then((urls) => {
          setImg(urls);
        });
        let imgNamePromises = res.items.map((imageRef) => imageRef.name);
        Promise.all(imgNamePromises).then((name) => {
          setImgName(name);
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  const handleDelete = (objectRef: any) => {
    deleteObject(objectRef)
      .then(() => {
        console.log("Object deleted successfully");
        atualizar();
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };
  useEffect(() => {
    atualizar();
    console.log(orientationIsLandscape);
    if (orientationIsLandscape == true) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    } else if (orientationIsLandscape == false) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, [orientationIsLandscape]);

  let data: any = [];
  if (img && img.length > 0) {
    data = imgName.map((name, index) => {
      if (index < img.length) {
        return { name, img: img[index] };
      }
    });
  }

  const renderItem = ({ item }: any) => (
    <ImgCard
      name={item.name}
      img={item.img}
      onClick={() => setOrientation(true)}
      onDelete={() => handleDelete(ref(storage, `workouts/${item.name}`))}
    />
  );

  useEffect(() => {
    const unsubscribe = navigate.addListener("focus", () => {
      setOrientation(false);
    });

    return unsubscribe;
  }, [navigate]);

  const filteredData = data.filter((item: any) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#c90087", width: "100%" }}>
        <Text
          style={{ fontSize: 60, marginTop: 30, marginLeft: 10, color: "#fff" }}
        >
          Treinos
        </Text>
      </View>
      <Input
        placeholder="Pesquisar treinos"
        onChangeText={(text) => setSearchText(text)}
        rightIcon={
          <Icon
            name="search"
            type="font-awesome"
            size={24}
            color="black"
          />
        }
      />
      <FlatList data={filteredData} renderItem={renderItem} />
      <StatusBar style="auto" />
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
    width: 200,
    height: 340,
    resizeMode: "stretch",
  },
});
