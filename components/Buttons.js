import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { memo } from "react";

const Buttons = ({ loading, text, fUNC }) => {
  return (
    <TouchableOpacity style={styles.logoutbtn} onPress={() => fUNC()}>
      {loading === false ? (
        <Text style={styles.logouttxt}>{text}</Text>
      ) : (
        <ActivityIndicator size={"large"} color={"white"} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutbtn: {
    backgroundColor: "#F47A00",
    padding: 14,
    marginHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 14,
  },

  logouttxt: {
    fontFamily: "Inter-Bold",
    color: "white",
    fontSize: 14,
  },
});

export default memo(Buttons);
