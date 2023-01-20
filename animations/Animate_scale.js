import React, { useReducer } from "react";
import { StyleSheet, Pressable } from "react-native";
import { MotiView } from "moti";

const Animate_scale = ({ children }) => {
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: "timing",
        delay: "100",
      }}
      style={styles.shape}
    >
      {children}
    </MotiView>
  );
};

export default Animate_scale;
const styles = StyleSheet.create({
  shape: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#9c1aff",
  },
});
