import { StatusBar as Expostatusbar } from "expo-status-bar";
import React, {
  useEffect,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  ScrollView,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  BackHandler,
  Platform,
} from "react-native";

import Homedishcards from "../components/Homedushcards";
import { useFonts } from "expo-font";
import Menucards from "../components/Menucards";
import Loadingscreen from "../components/Loadingscreen";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import {
  Userinfo_Context,
  Cartinfo_Context,
  Userstate_Context,
} from "../GlobalContext/Context";
import BottomSheet from "@gorhom/bottom-sheet";
import Dishinfoscreen from "./Dishinfoscreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useGetuserinfo } from "../services/Getuserinfo";
import { useGetdishinfo } from "../services/Getdishinfo";
import useBottomsheet_helper from "../helpers/Bottomsheet_helper";
import { useGetHomemeundata } from "../services/HomeMenudata";
import Openingtimes from "./Openingtimes";
import Homelist from "../components/Homelist";
import Dealsscreen from "./Dealsscreen";
//============
//temp data
//============

let n = 0;

export default function Homescreen({ navigation }) {
  //============
  // load fonts
  //============
  let [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  });

  const [userinfo, setuserinfo] = useContext(Userinfo_Context);
  const [cartinfo, setcartinfo] = useContext(Cartinfo_Context);

  const [userdata_info, userdata_cart, userdata_loading] = useGetuserinfo(true);
  const [screen, setscreen] = useState("menu");

  // const [dishdata1, FUNC_Incart1] = useGetdishinfo("Jamaican Dishes", 5);
  //const [dishdata2, FUNC_Incart2] = useGetdishinfo("Chinese Food", 5);

  //const [dishdata3, FUNC_Incart3] = useGetdishinfo("Chinese Food", 5);

  const [
    openbottomsheet,
    closebottomsheet,
    isopen,
    passarr,
    bottomSheetRef,
    snapPoints,
    setisopen,
  ] = useBottomsheet_helper();

  console.log("Home Rerender ================= " + n++);

  //"package": "com.johnwata.delivery_app"

  //============
  //on load call this function
  //============

  const [dishdata] = useGetHomemeundata();

  useEffect(() => {
    if (userdata_loading === true) return;
    setcartinfo(userdata_cart);
    setuserinfo(userdata_info);
  }, [userdata_loading]);

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
    if (
      dishdata1.loading === true ||
      dishdata2.loading === true ||
      dishdata3.loading === true ||
      userdata_loading === true
    )
      return;
    FUNC_Incart1(cartinfo);
    FUNC_Incart2(cartinfo);
    FUNC_Incart3(cartinfo);
  }, [cartinfo]);
  */

  /*
  const Topmenu = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={() => setscreen("deals")}
        style={[
          styles.menuoptions,
          {
            backgroundColor: screen === "deals" ? "#F99B3D" : "#F47A00",
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
          },
        ]}
      >
        <AntDesign
          style={styles.iconstyle}
          name="staro"
          size={20}
          color="white"
        />

        <View>
          <Text style={styles.topmenutitle}>{title}</Text>
         {subtitle !=""? (
          <Text style={styles.topmenusubtitle}>{subtitle}</Text>
          ):null}
        </View>
      </TouchableOpacity>
    );
  }, []);
*/
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Expostatusbar style="dark" />

        <View style={styles.headerbackcolor}>
          <View style={styles.header}>
            <View style={styles.headerleft}>
              <Text style={styles.headertxt} adjustsFontSizeToFit={true}>
                Hi
                {userinfo === null ? "" : " " + userinfo.fname}!
              </Text>
              <Text style={styles.greetings}>Wellcome Back</Text>
            </View>

            <TouchableOpacity
              style={styles.headerright}
              onPress={() => navigation.navigate("Cart")}
            >
              {cartinfo.length > 0 ? (
                <View style={styles.cartcountstyle}>
                  <Text
                    allowFontScaling={false}
                    style={styles.cartcountstyletxt}
                  >
                    {cartinfo.length}
                  </Text>
                </View>
              ) : null}

              <Feather
                style={[
                  styles.carticon,
                  cartinfo.length > 0 ? { right: 20 } : { right: 0 },
                ]}
                name="shopping-cart"
                size={19}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("search")}
            style={styles.searhcontainer}
          >
            <AntDesign
              style={styles.searchicon}
              name="search1"
              size={18}
              color="black"
            />

            <Text style={styles.searchtxt}>Search Your favorite food</Text>
          </TouchableOpacity>
        </View>

        {userdata_loading === true || dishdata.loading === true ? (
          <Loadingscreen />
        ) : (
          <ScrollView
            style={styles.forscrollview}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
          >
            <ScrollView
              alwaysBounceHorizontal={false}
              horizontal={true}
              style={styles.menuscroll}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => setscreen("menu")}
                style={[
                  styles.menuoptions,
                  {
                    backgroundColor: screen === "menu" ? "#F99B3D" : "#F47A00",
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  },
                ]}
              >
                <AntDesign
                  style={styles.iconstyle}
                  name="book"
                  size={20}
                  color="white"
                />
                <Text style={styles.topmenutitle}>Menu</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setscreen("deals")}
                style={[
                  styles.menuoptions,
                  {
                    backgroundColor: screen === "deals" ? "#F99B3D" : "#F47A00",
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  },
                ]}
              >
                <AntDesign
                  style={styles.iconstyle}
                  name="staro"
                  size={20}
                  color="white"
                />
                <View>
                  <Text style={styles.topmenutitle}>Deals</Text>
                  <Text style={styles.topmenusubtitle}>Whats new</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setscreen("opening")}
                style={[
                  styles.menuoptions,
                  {
                    backgroundColor:
                      screen === "opening" ? "#F99B3D" : "#F47A00",
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  },
                ]}
              >
                <Ionicons
                  style={styles.iconstyle}
                  name="time-outline"
                  size={20}
                  color="white"
                />
                <View>
                  <Text style={styles.topmenutitle}>Opening</Text>
                  <Text style={styles.topmenusubtitle}>Open/close times</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
            {screen === "menu" ? (
              <View style={styles.allviews}>
                <Homelist
                  navigation={navigation}
                  dishdata={dishdata}
                  openbottomsheet={openbottomsheet}
                  title={"Jamaican Dishes"}
                  datasource={"j"}
                  img={require("../assets/jadish.jpg")}
                  query={"Jamaican Dishes"}
                />
                <Homelist
                  navigation={navigation}
                  dishdata={dishdata}
                  openbottomsheet={openbottomsheet}
                  title={"Chinese Dishes"}
                  datasource={"c"}
                  img={require("../assets/chdish.jpg")}
                  query={"Chinese Food"}
                />
                <Homelist
                  navigation={navigation}
                  dishdata={dishdata}
                  openbottomsheet={openbottomsheet}
                  title={"Sea Dishes"}
                  datasource={"s"}
                  img={require("../assets/sdish.jpg")}
                  query={"Sea Food"}
                />
              </View>
            ) : screen === "deals" ? (
              <Dealsscreen />
            ) : screen === "opening" ? (
              <Openingtimes />
            ) : null}
          </ScrollView>
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
}

const styles = StyleSheet.create({
  allviews: {
    flex: 1,
  },
  menuhold: {
    backgroundColor: "#F47A00",
    height: 100,
    width: 133,
    marginLeft: 14,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  menutxt: {
    color: "white",
    fontSize: 14,
    fontFamily: "Inter-Bold",
    // backgroundColor:"red"
  },

  cartcountstyle: {
    width: 20,
    height: 20,
    backgroundColor: "red",
    borderRadius: 10,
    position: "absolute",
    right: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  cartcountstyletxt: {
    color: "white",
    textAlign: "center",
    // textAlignVertical:"center",
    // fontFamily:"Inter-Regular",
    fontSize: 10,
  },

  carticon: {
    position: "absolute",
    right: 20,
  },

  headerright: {
    //backgroundColor:"yellow",
    width: 50,
    height: 50,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    ...Platform.select({
      ios: {},
      android: { marginTop: StatusBar.currentHeight },
    }),
    flex: 1,
    backgroundColor: "white",
  },

  backinfo: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.2,
    width: "100%",
    height: "100%",
  },

  //header bar ===================================
  header: {
    paddingVertical: 14,
    backgroundColor: "white",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  headertxt: {
    color: "black",
    fontSize: 20,
    fontFamily: "Inter-Bold",
  },

  greetings: {
    color: "#7F7F7F",
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },

  headerleft: {
    marginLeft: 10,
  },

  // scrollview ===================================
  forscrollview: {
    backgroundColor: "white",
    flex: 1,
  },

  //searh bar ===================================
  searhcontainer: {
    backgroundColor: "white",
    borderColor: "#B3B3B3",
    borderWidth: 0.5,
    marginHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    height: 45,
    borderRadius: 6,
    marginBottom: 14,
    //  marginBottom:14
    /*
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
    */
  },
  searchicon: {
    marginLeft: 10,
  },

  searchiconhold: {
    //  marginLeft:10,
    //   backgroundColor:"#F47A00",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    width: 40,
  },

  searchtxt: {
    fontSize: 12,
    marginLeft: 10,
    color: "#7F7F7F",
  },

  // advert bar ===================================

  advertcontainer: {
    backgroundColor: "#F47A00",
    marginHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    //  marginBottom: 14,
    marginTop: 14,
    //height: 180,
    paddingVertical: 10,
    borderRadius: 6,
    justifyContent: "space-between",
  },
  adverttxtheading: {
    fontSize: 16,
    marginLeft: 10,
    color: "white",
    fontFamily: "Inter-Bold",
  },

  adverttxt: {
    fontSize: 12,
    marginLeft: 10,
    color: "white",
    fontFamily: "Inter-Regular",
  },

  adverimg: {
    width: 65,
    height: 65,
    marginRight: 10,
  },
  // subheadings ===================================

  subheading: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    alignItems: "center",
  },

  subtitle: {
    fontSize: 14,
    marginLeft: 10,
    // fontWeight:"bold",
    fontFamily: "Inter-Bold",
  },

  subviewall: {
    fontSize: 14,
    color: "#F47A00",
    marginRight: 10,
    fontFamily: "Inter-Bold",
  },

  // menuscroll ===================================
  menuscroll: {
    backgroundColor: "#F47A00",
    // marginTop: 14,
    marginHorizontal: 10,
    borderRadius: 6,
  },

  forlist: {
    marginLeft: -4,
    //height:254,
    //backgroundColor:"red"
  },

  menuoptions: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderLeftWidth: 0.5,
    borderLeftColor: "white",
    // marginLeft: 14,
    // backgroundColor: "white",
  },
  iconstyle: {
    marginRight: 2,
  },

  topmenutitle: {
    fontSize: 12,
    fontFamily: "Inter-Bold",
    color: "white",
  },
  topmenusubtitle: {
    fontSize: 10,
    fontFamily: "Inter-Regular",
    color: "white",
  },
});
