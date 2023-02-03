import {
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { StatusBar as Expostatusbar } from "expo-status-bar";
import { useFonts } from "expo-font";
import Loadingscreen from "../components/Loadingscreen";
import React, { useState, useContext, useEffect } from "react";
import { Userinfo_Context, Cartinfo_Context } from "../GlobalContext/Context";
import { getAuth } from "firebase/auth";
import Guestsignup from "../components/Guestsignup";
import Header from "../components/Header";

const Checkoutscreen = ({ navigation }) => {
  const auth = getAuth();
  const [processing, setprocessing] = useState(false);

  const [userinfo, setuserinfo] = useContext(Userinfo_Context);
  const [cartinfo, setcartinfo] = useContext(Cartinfo_Context);

  const [totalcalculation, settotalcalculation] = useState();
  const [checkoutoption, setcheckoutoption] = useState("pickup");

  useEffect(() => {
    if (cartinfo.length > 0) {
      console.log("total ======");
      let items;
      let itemsprice = 0;
      cartinfo.forEach((iteminarr) => {
        items = iteminarr.split("@");
        itemsprice += parseInt(items[2]);
      });
      settotalcalculation(itemsprice);
    } else {
      settotalcalculation(0);
    }
  }, []);
  let [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Loadingscreen />;
  }

  // ================= Guest =====================
  if (userinfo === null || userinfo.role === "Guest") {
    return (
      <View style={{ flex: 1 }}>
        <Guestsignup backbtn={true} nav={navigation} />
      </View>
    );
  }
  // ================= Guest =====================

  return (
    <SafeAreaView style={styles.container}>
      <Expostatusbar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backnavicon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color="black" />
        </TouchableOpacity>

        <Text style={styles.headertxt}>Checkout</Text>
      </View>

      <View style={styles.options}>
        <TouchableOpacity
          style={[
            styles.pickup,
            checkoutoption === "pickup"
              ? {
                  backgroundColor: "#F99B3D",
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                }
              : { backgroundColor: "#F47A00", borderRadius: 6 },
          ]}
          onPress={() => setcheckoutoption("pickup")}
        >
          <View style={styles.optionshold}>
            <SimpleLineIcons
              style={styles.icon}
              name="bag"
              size={24}
              color="white"
            />
            <Text style={styles.optionstxt}>Pickup</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.delivery,
            checkoutoption === "delivery"
              ? {
                  backgroundColor: "#F99B3D",
                  borderTopRightRadius: 6,
                  borderBottomRightRadius: 6,
                }
              : { backgroundColor: "#F47A00", borderRadius: 6 },
          ]}
          onPress={() => setcheckoutoption("delivery")}
        >
          <View style={styles.optionshold}>
            <MaterialIcons
              name="directions-bike"
              style={styles.icon}
              size={24}
              color={"white"}
            />
            <Text style={styles.optionstxt}>Delivery</Text>
          </View>
        </TouchableOpacity>
      </View>

      {checkoutoption === "delivery" ? (
        <View style={styles.temptext}>
          <Text style={{ fontSize: 20 }}> Comming Soon</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.alltxthold}>
            <Text style={styles.title}>Information</Text>
            <Text style={styles.subtitle}>
              Your Information Can Be Changed In The Accout Tab.
            </Text>
          </View>

          <View style={styles.alltxthold1}>
            <Text style={styles.title}>Contact Info</Text>

            <Text style={styles.subtitle}>Name:</Text>
            <View style={styles.contactinfo}>
              <Text style={styles.textboxtxt}>
                {userinfo.fname + " " + userinfo.lname}
              </Text>
            </View>

            <Text style={styles.subtitle}>Phone:</Text>

            <View style={styles.contactinfo}>
              <Text style={styles.textboxtxt}>{userinfo.phone}</Text>
            </View>
          </View>
          <View style={styles.totalhold}>
            <View style={styles.totalline}>
              <Text style={styles.righttxt}>SubTotal:</Text>
              <Text style={styles.lefttxt}>${totalcalculation}</Text>
            </View>

            <View style={styles.totalline}>
              <Text style={styles.righttxt}>Tax:</Text>
              <Text style={styles.lefttxt}>$0</Text>
            </View>

            <View style={styles.totalline}>
              <Text style={styles.righttxt}>Total</Text>
              <Text style={styles.righttxt}>${totalcalculation}</Text>
            </View>
          </View>
        </ScrollView>
      )}

      {checkoutoption === "pickup" ? (
        <TouchableOpacity
          style={styles.bottombarcontainer}
          onPress={() => {
            navigation.navigate("payment", {
              ordertype: "Pickup",
            });
          }}
        >
          <View>
            <Text style={styles.txt}>SubTotal:</Text>
            <Text style={styles.txt}>${totalcalculation}</Text>
          </View>
          <Text style={styles.txt}>Next</Text>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {},
      android: { marginTop: StatusBar.currentHeight },
    }),
    flex: 1,
    backgroundColor: "white",
  },

  temptext: {
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
  contactinfo: {
    alignItems: "flex-start",
    borderRadius: 6,
    borderColor: "#7F7F7F",
    //borderWidth:0.5,

    borderBottomWidth: 0.5,
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 5,
  },

  backnavicon: {
    //  flexDirection:"row",
    left: 10,
    backgroundColor: "white",
    position: "absolute",
    // marginHorizontal:10,
    alignItems: "center",
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 0.5,
    justifyContent: "center",
    width: 30,
    height: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    justifyContent: "center",
  },
  headertxt: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
  },

  backbuttontxt: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
  },
  alltxthold: {
    marginHorizontal: 10,
    paddingVertical: 14,
    borderColor: "#7F7F7F",
    borderWidth: 0.5,
    //borderBottomWidth:0.5,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginTop: 14,
    marginBottom: 14,
    //marginVertical:10,
  },

  alltxthold1: {
    marginHorizontal: 10,
    paddingVertical: 14,
    borderColor: "#7F7F7F",
    borderWidth: 0.5,
    //  borderBottomWidth:0.5,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 14,
    // marginVertical:10,
  },

  title: {
    color: "black",
    fontSize: 14,
    fontFamily: "Inter-Bold",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#7F7F7F",
  },

  textboxtxt: {
    color: "black",
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },

  mainbtn: {
    backgroundColor: "#F47A00",
    height: 48,
    borderRadius: 6,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  mainbtntxt: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    color: "white",
  },

  totalhold: {
    //  backgroundColor:"#C6C6C6",
    marginHorizontal: 10,
    paddingVertical: 14,

    borderColor: "#7F7F7F",
    borderWidth: 0.5,

    //borderBottomWidth:0.5,

    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 14,
  },

  totalline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },

  righttxt: {
    fontFamily: "Inter-Bold",
    fontSize: 12,
    color: "black",
  },

  lefttxt: {
    fontFamily: "Inter-Bold",
    fontSize: 12,
    color: "#7F7F7F",
  },

  options: {
    backgroundColor: "#F47A00",
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
  },

  pickup: {
    flex: 1,
  },

  delivery: {
    borderColor: "white",
    borderLeftWidth: 1,
    flex: 1,
  },

  optionstxt: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    color: "white",
  },
  optionssubtxt: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "white",
  },
  icon: {
    marginRight: 5,
  },

  optionshold: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },

  bottombarcontainer: {
    backgroundColor: "#F47A00",
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    flexDirection: "row",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    //  position:"absolute",
    //  bottom:0,
  },

  txt: {
    color: "white",
    fontFamily: "Inter-Bold",
    fontSize: 14,
  },
});

export default Checkoutscreen;
