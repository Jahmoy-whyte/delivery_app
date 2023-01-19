import { StatusBar as Expostatusbar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  BackHandler,
  FlatList,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { db } from "../Firebaseconfig";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { useFonts } from "expo-font";
import Loadingscreen from "../components/Loadingscreen";
import { Cartinfo_Context, Userinfo_Context } from "../GlobalContext/Context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Dishinfoscreen from "./Dishinfoscreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Alertmessage from "../helpers/Alertmessage";
import useBottomsheet_helper from "../helpers/Bottomsheet_helper";
import MenuCarditems from "../components/MenuCarditems";
import Header from "../components/Header";
import Imageandtext from "../components/Imageandtext";

const Favoritescreen = ({ navigation }) => {
  //LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  //LogBox.ignoreAllLogs();//Ignore all log notifications

  const [favoritedata, setfavoritedata] = useState({
    loading: true,
    data: null,
    change: null,
  });

  let [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  });

  const [userinfo, setuserinfo] = useContext(Userinfo_Context);
  const [cartinfo, setcartinfo] = useContext(Cartinfo_Context);

  const [
    openbottomsheet,
    closebottomsheet,
    isopen,
    passarr,
    bottomSheetRef,
    snapPoints,
    setisopen,
  ] = useBottomsheet_helper();

  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, "Users", userinfo.userid), (doc) => {
        if (!doc.exists()) {
          Alertmessage("error", "custom_error");
          return;
        }

        setfavoritedata((prev) => ({
          ...prev,
          loading: true,
          change: doc.data().Favorite,
        }));
      });

      return unsub;
    } catch (e) {
      Alertmessage("error", "custom_error");
    }
  }, []);

  useEffect(() => {
    const getdishies = async () => {
      if (favoritedata.change === null) return;
      let data = favoritedata.change;
      let newdata = [];
      for (let i = 0; i < data.length; i++) {
        newdata.push(await getfavoritedata_DISHIES(data[i]));
      }
      setfavoritedata((prev) => ({ ...prev, loading: false, data: newdata }));
    };

    getdishies();
  }, [favoritedata.change]);

  const getfavoritedata_DISHIES = async (ids) => {
    try {
      const docRef = doc(db, "Dishies", ids);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        Alertmessage("error", "custom_error");
        return;
      }

      return { ...docSnap.data(), Incart: false, Dishid: ids };
    } catch (error) {
      Alertmessage("error", "custom_error");
    }
  };

  useEffect(() => {
    const FUNC_restdata = () => {
      if (favoritedata.data === null) return;
      console.log("favorite ====== =====================================");
      let newarr = favoritedata.data;
      newarr.filter((word, index) => {
        if (word.Incart === true) {
          newarr[index].Incart = false;
        }
      });

      for (let i = 0; i < cartinfo.length; i++) {
        let newitemname = cartinfo[i].split("@");
        let num = newarr.findIndex((dishitemname) => {
          return dishitemname.Dish == newitemname[0];
        });
        if (num > -1) {
          newarr[num].Incart = true;
        }
      }
      setfavoritedata((prev) => ({ ...prev, data: newarr }));
    };

    FUNC_restdata();
  }, [favoritedata.data, cartinfo]);

  useEffect(() => {
    const backAction = () => {
      const isFocused = navigation.isFocused();
      if (isopen > -1) {
        bottomSheetRef.current.close();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isopen]);

  /*
          useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
              const bool = navigation.isFocused()
              if(bool === true){
              alert(bool)
              }
            });
        
            return unsubscribe;
          }, [navigation]);

 */

  if (!fontsLoaded) {
    return <Loadingscreen />;
  }

  //console.log(orderdata.data)

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Header title={"Favorites"} nav={navigation} />

        {favoritedata.loading === true ? (
          <Loadingscreen />
        ) : favoritedata.data.length < 1 ? (
          <Imageandtext
            title={"No Favorites"}
            image={require("../assets/emptycartpic.png")}
          />
        ) : (
          <FlatList
            data={favoritedata.data}
            renderItem={({ item, index }) => {
              return (
                <MenuCarditems
                  dname={item.Dish}
                  dprice={item.Price}
                  ds={item.Description}
                  dimg={item.DishImage}
                  dtime={item.PreparationTime}
                  dstatus={item.DishStatus}
                  dincart={item.Incart}
                  dishinfofn={openbottomsheet}
                  num={index}
                  dish_navigation={navigation}
                  dish_id={item.Dishid}
                />
              );
            }}
          />
        )}

        {isopen > -1 ? (
          <Pressable
            style={styles.backinfo}
            onPress={() => closebottomsheet(0)}
          ></Pressable>
        ) : null}

        <BottomSheet
          style={styles.BottomSheetstyle}
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onChange={(index) => setisopen(index)}
          index={-1}
        >
          {isopen > -1 ? (
            <Dishinfoscreen
              nav_dname={passarr[0]}
              nav_dprice={passarr[1]}
              nav_dimg={passarr[2]}
              nav_ds={passarr[3]}
              nav_dtime={passarr[4]}
              nav_quantity={passarr[5]}
              nav_closebottomsheet={closebottomsheet}
              nav_comment={passarr[6]}
              nav_action={passarr[7]}
              nav_updatelist={"hi"}
              nav_dishid={passarr[8]}
            />
          ) : (
            <Loadingscreen />
          )}
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //=======================================
  container: {
    ...Platform.select({
      ios: {},
      android: { marginTop: StatusBar.currentHeight },
    }),
    flex: 1,
    //  marginHorizontal:10
    backgroundColor: "white",
  },

  backinfo: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.2,
    width: "100%",
    height: "100%",
  },
});

export default Favoritescreen;
