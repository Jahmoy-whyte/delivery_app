import { StatusBar as Expostatusbar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Loadingscreen from "../components/Loadingscreen";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Userinfo_Context, Cartinfo_Context } from "../GlobalContext/Context";

import { useQuantitychange } from "../helpers/Quantitychange";
import { useAddtocart } from "../services/Addcartitem";
import { useaddfavorite } from "../services/Addfavorite";
import { db } from "../Firebaseconfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import Alertmessage from "../helpers/Alertmessage";

const Dealsscreen = () => {
  console.log("Deal info render =======");

  const [metadata, setmetadata] = useState({
    data: null,
    loading: true,
    open: false,
  });

  useEffect(() => {
    FUNC_getuserinfo();
  }, []);

  const FUNC_getuserinfo = async () => {
    try {
      const docRef = doc(db, "Metadata", "Metadata");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        Alertmessage("error", "custom_error");
        return;
      } else {
        setmetadata({ data: docSnap.data(), loading: false, open: false });
      }
    } catch (error) {
      Alertmessage("error", "custom_error");
    }
  };

  let [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  });

  if (!fontsLoaded || metadata.loading === true) {
    return <Loadingscreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          style={styles.img}
          resizeMode={"cover"}
          source={{ uri: metadata.data.Advert.Image }}
        />
        <TouchableOpacity
          style={styles.txtinfo}
          onPress={() =>
            setmetadata((prev) => ({ ...prev, open: !metadata.open }))
          }
        >
          <View style={styles.texthold}>
            <Text style={styles.title}>{metadata.data.Advert.Title}</Text>
            <Text
              style={styles.subtitle}
              numberOfLines={metadata.open === true ? 20 : 1}
            >
              {metadata.data.Advert.Subtitle}
            </Text>
          </View>
          {metadata.open === false ? (
            <AntDesign name="down-square-o" size={24} color="black" />
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  img: {
    height: 180,
    width: "100%",
    borderRadius: 6,
  },
  body: {
    marginHorizontal: 10,
    marginVertical: 14,
  },

  title: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12,
    color: "#7F7F7F",
    fontFamily: "Inter-Regular",
  },
  txtinfo: {
    marginTop: 5,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  texthold: {
    flex: 1,
  },
});

export default Dealsscreen;
