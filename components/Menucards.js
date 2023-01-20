import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { memo } from "react";

const Menucards = ({ backcolor, qtxt, title, dishnumber, dishimg, fn }) => {
  return (
    <TouchableOpacity
      style={styles.menuitemcontainer}
      onPress={() => fn(qtxt, dishimg)}
    >
      <Image
        style={styles.menuimg}
        source={dishimg}
        // resizeMode = {"cover"}
      />

      <View style={styles.txthold}>
        <Text
          style={styles.menutxtheading}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text style={styles.menutxtsub}>{dishnumber}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // menuitemcontainer ===================================
  menuitemcontainer: {
    backgroundColor: "white",
    height: 100,
    width: 133,
    marginLeft: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 6,
  },

  menuimg: {
    height: "100%",
    width: "100%",
    // borderTopLeftRadius:6,
    //borderTopRightRadius:6
    borderRadius: 6,
    //borderBottomStartRadius:6,
  },

  menutxtheading: {
    fontSize: 14,
    fontFamily: "Inter-Bold",
    color: "white",
  },
  menutxtsub: {
    fontFamily: "Inter-Regular",
    fontSize: 10,
    color: "white",
  },

  txthold: {
    height: "100%",
    width: "100%",

    // alignItems:'center',
    padding: 10,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    position: "absolute",
    // bottom:0,
    justifyContent: "center",
  },

  backtxtcolor: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    //  position:"absolute",
    // bottom:0,
    //opacity:0.4,
    borderRadius: 6,
    //   borderBottomLeftRadius:6,
    //  borderBottomRightRadius:6,
  },
});

export default memo(Menucards);
