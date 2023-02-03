import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { memo, useMemo } from "react";

const Orderscards = ({
  orderid,
  delivreytype,
  cartarr,
  orderstatus,
  paymenttype,
  fn_passdata,
  ordertime,
}) => {
  console.log("===============rnder");
  // checkcircle

  const calusubtotal = useMemo(() => {
    let items;
    let itemsprice = 0;
    for (let i = 0; i < cartarr.length; i++) {
      items = cartarr[i].split("@");
      itemsprice += parseInt(items[2]);
    }
    return itemsprice;
  }, [cartarr]);

  // alert(itemsprice)

  let itemcount = cartarr.length;

  const Statusbaritems = ({ txt, num }) => {
    let status = 2;
    if (orderstatus === "Sent") {
      status = 2;
    } else if (orderstatus === "Seen") {
      status = 3;
    } else if (orderstatus === "Preparation") {
      status = 4;
    } else if (orderstatus === "Ready") {
      status = 5;
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: status > num ? "#378F00" : null,

          alignItems: "center",
          borderTopLeftRadius: txt === "Sent" ? 20 : 0,
          borderBottomLeftRadius: txt === "Sent" ? 20 : 0,

          borderTopRightRadius: txt === orderstatus ? 20 : 0,
          borderBottomRightRadius: txt === orderstatus ? 20 : 0,
        }}
      >
        <Text
          style={[
            styles.status,
            {
              //  fontFamily: txt === oderstatus ? "Inter-bold" : "Inter-Regular",
              color: status > num ? "white" : "black",
              //  flex: 1,
            },
          ]}
          // numberOfLines={1}
          //  ellipsizeMode={"middle"}
          //  maxFontSizeMultiplier={1}
          //minimumFontScale={1}
          //adjustsFontSizeToFit={true}
          allowFontScaling={false}
        >
          {txt}
        </Text>
      </View>
    );
  };

  const fireBaseTime = new Date(
    ordertime.seconds * 1000 + ordertime.nanoseconds / 1000000
  );
  let date1 = fireBaseTime.toDateString();
  let atTime = fireBaseTime.toLocaleTimeString();

  return (
    <TouchableOpacity
      style={styles.alltxtcontain}
      onPress={() =>
        fn_passdata(
          cartarr,
          paymenttype,
          calusubtotal,
          orderid,
          orderstatus,
          date1
        )
      }
    >
      <View style={styles.infobarwrap}>
        <Ionicons name="time-outline" size={24} color="black" />

        <View style={styles.infobarhold}>
          <Text style={styles.infobarorderid}>{orderid}</Text>
          <Text style={styles.infobardeliverytype}>${calusubtotal}</Text>
          <Text style={styles.infobaritemcount}>Items:{itemcount}</Text>
        </View>
        <View style={styles.dropdownarrow}>
          <AntDesign name="down" size={24} color="black" />
        </View>
      </View>

      <View style={styles.statusbar}>
        <Statusbaritems txt={"Sent"} num={1} />
        <Statusbaritems txt={"Seen"} num={2} />
        <Statusbaritems txt={"Preparation"} num={3} />
        <Statusbaritems txt={"Ready"} num={4} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  alltxtcontain: {
    borderColor: "#7F7F7F",
    borderRadius: 6,
    borderWidth: 0.5,
    marginHorizontal: 10,
    marginTop: 14,
  },
  statusbar: {
    backgroundColor: "#D4D4D4",
    flex: 1,
    paddingVertical: 1,
    // height: 18,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },

  status: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
  },

  dropdownarrow: {
    padding: 2,
    borderColor: "black",
    borderRadius: 6,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },

  infobarwrap: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#7F7F7F",
    // borderRadius:6,
    // borderWidth:0.5,
    // borderBottomWidth:0.5,
    //   marginHorizontal:5,
    marginVertical: 5,
    padding: 10,
  },

  infobarhold: {
    flex: 1,
    marginLeft: 10,
    // backgroundColor:"lightgreen"
  },

  infotop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  infostatus_and_icon: {
    backgroundColor: "#F47A00",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  infobarorderid: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
  },

  infobaritemcount: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#7F7F7F",
  },

  infobarprice: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    color: "#F47A00",
  },
  infobardeliverytype: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "black",
  },

  infostatus: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "white",
  },

  moreinfo: {
    color: "#F47A00",
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginBottom: 5,
    fontSize: 12,
  },
});

export default memo(Orderscards);
