//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { memo } from "react";

const Homedishcards = ({
  dname,
  dprice,
  dimg,
  dtype,
  dtime,
  ds,
  dstatus,
  dincart,
  dishinfofn,
  dish_navigation,
  dish_dishid,
}) => {
  // https://i.ibb.co/BNKVZc5/Picture1.jpg
  //console.log(dish_navigation)

  function currencyFormat(num) {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,");
  }
  //console.log(currencyFormat(2665)); // $2,665.00

  return (
    <View>
      <TouchableOpacity
        style={cardstyle.containstyle}
        onPress={() =>
          dishinfofn(
            2,
            dname,
            dprice,
            dimg,
            ds,
            dtime,
            "1",
            dincart,
            dstatus,
            "",
            "add",
            dish_navigation,
            dish_dishid
          )
        }
      >
        <Image style={cardstyle.imgstyle} source={{ uri: dimg }} />

        <View style={cardstyle.infocard}>
          <View style={cardstyle.infobox}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={cardstyle.stitle}
            >
              {dname}{" "}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={cardstyle.txtcolor}
            >
              {ds}{" "}
            </Text>
          </View>

          <View style={cardstyle.pricecontainerhold}>
            <View
              style={[
                cardstyle.pricecontainer,
                {
                  backgroundColor:
                    dstatus == "False"
                      ? "red"
                      : dincart == true
                      ? "green"
                      : "#F47A00",
                },
              ]}
            >
              <Text style={cardstyle.txtpricecolor}>
                {dstatus == "False"
                  ? "Sold Out"
                  : dincart == true
                  ? "In Cart"
                  : "$" + currencyFormat(dprice)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const cardstyle = StyleSheet.create({
  imgstyle: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  containstyle: {
    backgroundColor: "white",
    width: 280,
    //  height:252,
    marginLeft: 14,
    borderRadius: 6,
    marginBottom: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  stitle: {
    fontSize: 14,
    fontFamily: "Inter-Bold",
  },

  infocard: {
    flexDirection: "row",
    //    backgroundColor:"red",
    paddingVertical: 20,
    flex: 1,
    marginHorizontal: 10,
  },

  infobox: {
    //  backgroundColor:"purple",
    flex: 1,
    justifyContent: "center",
  },

  pricecontainerhold: {
    // backgroundColor:"yellow",
    justifyContent: "center",
  },
  pricecontainer: {
    backgroundColor: "#F47A00",
    borderRadius: 15,
    //   width:70,
    //  height:30,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  txtcolor: {
    color: "#B3B3B3",
    fontFamily: "Inter-Regular",
    fontSize: 12,
  },

  txtpricecolor: {
    color: "white",
    fontFamily: "Inter-Regular",
    marginTop: 1,
    fontSize: 12,
  },

  pricetxt: {
    fontFamily: "Inter-Bold",
    fontSize: 12,
  },

  timefont: {
    marginTop: 1,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    marginLeft: 5,
  },

  timeicon: {
    marginTop: 1,
  },
});

export default memo(Homedishcards);
