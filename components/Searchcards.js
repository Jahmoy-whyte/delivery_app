import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { memo } from "react";

const Searchcards = ({ dishname, searchstats, searchFN }) => {
  // const [searchingdata, setsearchingdata] = useState(false)

  console.log("Search cards render");

  return (
    <TouchableOpacity
      disabled={searchstats}
      onPress={() =>
        // setsearchingdata(dishname)
        searchFN(dishname)
      }
      style={styles.container}
    >
      <View style={styles.txt}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
          {dishname}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.subtitle}>
          Description
        </Text>
      </View>

      <View style={styles.cartoptions}>
        <AntDesign name="search1" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartoptions: {
    //backgroundColor:"red",
    //flex:1,
  },
  txt: {
    //  backgroundColor:"green",
    flex: 1,
  },

  container: {
    flex: 1,
    marginHorizontal: 10,
    //  backgroundColor:"yellow",
    paddingVertical: 15,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    color: "black",
  },

  subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#7F7F7F",
  },
});

export default memo(Searchcards);
