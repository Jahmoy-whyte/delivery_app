import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Homedishcards from "./Homedushcards";
import { memo, useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
const Homelist = ({
  navigation,
  title,
  dishdata,
  openbottomsheet,
  datasource,
  query,
  img,
}) => {
  if (datasource === "j") {
    query = "Jamaican Dishes";
  } else if (datasource === "c") {
    query = "Chinese Food";
  } else if (datasource === "s") {
    query = "Sea Food";
  }
  console.log("herererere");
  const Showall = useCallback(() => {
    return (
      <TouchableOpacity
        style={styles.Showallstyle}
        onPress={() => {
          navigation.navigate("Menu", {
            querytxt: query,
            headimage: img,
          });
        }}
      >
        <View style={styles.arrow}>
          <AntDesign name="right" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View>
      <View style={styles.subheading}>
        <Text style={styles.subtitle}>{title}</Text>
        <Text
          style={styles.subviewall}
          onPress={() => {
            navigation.navigate("Menu", {
              querytxt: query,
              headimage: img,
            });
          }}
        >
          ShowAll
        </Text>
      </View>

      <FlatList
        ListFooterComponent={<Showall />}
        initialNumToRender={3}
        style={styles.forlist}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={
          datasource === "j"
            ? dishdata.j_data
            : datasource === "c"
            ? dishdata.c_data
            : datasource === "s"
            ? dishdata.s_data
            : null
        }
        keyExtractor={(item) => item.Dishid}
        renderItem={({ item }) => {
          return (
            <Homedishcards
              dname={item.Dish}
              dprice={item.Price}
              dtype={item.DishType}
              dimg={item.DishImage}
              dtime={item.PreparationTime}
              ds={item.Description}
              dstatus={item.DishStatus}
              dincart={item.Incart}
              dishinfofn={openbottomsheet}
              dish_navigation={navigation}
              dish_dishid={item.Dishid}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuscroll: {
    backgroundColor: "#F47A00",
    // marginTop: 14,
    marginHorizontal: 10,
    borderRadius: 6,
  },

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

  Showallstyle: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    //width: 100,
  },
  arrow: {
    backgroundColor: "#F47A00",
    borderRadius: 50,
    padding: 10,
  },
});

export default memo(Homelist);
