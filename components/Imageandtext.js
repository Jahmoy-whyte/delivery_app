import { StyleSheet, View, Text, Image } from "react-native";

const Imageandtext = ({ title, image }) => {
  return (
    <View style={styles.body}>
      <Image resizeMode="contain" source={image} style={styles.image} />

      <View style={styles.wrapper}>
        <Text style={styles.txtwrapper}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: "center",

    justifyContent: "center",
    //backgroundColor:"red",
    flex: 1,
  },
  txt: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    marginTop: 10,
  },

  image: {
    width: 200,
    height: 200,
    // marginHorizontal:10
  },

  txtwrapper: {
    fontFamily: "Inter-Bold",
    fontSize: 12,
    color: "black",
  },

  wrapper: {
    marginTop: 10,
    //  backgroundColor: "#F47A00",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "black",
  },
  //  "#F47A00"
});

export default Imageandtext;
