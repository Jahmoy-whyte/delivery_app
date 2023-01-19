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
import { Ionicons } from "@expo/vector-icons";
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

  if (checkoutoption === "delivery") {
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
            style={styles.delivery}
            onPress={() => setcheckoutoption("pickup")}
          >
            <Text style={styles.deliverytxt}>Pickup</Text>
          </TouchableOpacity>
          <View style={{ width: 10 }}></View>
          <TouchableOpacity
            style={styles.pickup}
            onPress={() => setcheckoutoption("delivery")}
          >
            <Text style={styles.pickuptxt}>Delivery</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.temptext}>
          <Text style={{ fontSize: 20 }}> Comming Soon</Text>
        </View>
      </SafeAreaView>
    );
  }

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
          style={styles.pickup}
          onPress={() => setcheckoutoption("pickup")}
        >
          <Text style={styles.pickuptxt}>Pickup</Text>
        </TouchableOpacity>
        <View style={{ width: 10 }}></View>
        <TouchableOpacity
          style={styles.delivery}
          onPress={() => setcheckoutoption("delivery")}
        >
          <Text style={styles.deliverytxt}>Delivery</Text>
        </TouchableOpacity>
      </View>

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
    // backgroundColor:"red",
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginVertical:4,
  },

  pickup: {
    backgroundColor: "#F47A00",
    //   height:48,
    flex: 1,
    borderRadius: 6,
    // marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  delivery: {
    backgroundColor: "white",
    //   height:48,

    borderColor: "#7F7F7F",
    //borderWidth:0.5,

    borderWidth: 0.5,

    flex: 1,
    borderRadius: 6,
    // marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  deliverytxt: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    color: "black",
    paddingVertical: 6,
  },

  pickuptxt: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    color: "white",
    paddingVertical: 6,
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
