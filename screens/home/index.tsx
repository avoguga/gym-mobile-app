import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { app } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import ImgCard from "../../components/ImgCard";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigate = useNavigation<any>();

  const [img, setImg]: any = useState();
  const [imgName, setImgName] = useState([""]);
  const [orientationIsLandscape, setOrientation] = useState(false);

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
    />
  );

  useEffect(() => {
    const unsubscribe = navigate.addListener("focus", () => {
      setOrientation(false);
    });

    return unsubscribe;
  }, [navigate]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 60, marginRight: 180, marginTop: 30 }}>
        Treinos
      </Text>
      <FlatList data={data} renderItem={renderItem} />
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
