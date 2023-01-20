import React, { useReducer } from "react";
import { StyleSheet, Pressable } from "react-native";
import { MotiView } from "moti";

const Animate_bottomtotop = ({ children, time }) => {
  return (
    <MotiView
      from={{
        opacity: 0,
        //  scale: 0.5,
        translateY: 50,
      }}
      animate={{
        opacity: 1,
        //  scale: 1,
        translateY: 0,
      }}
      transition={{
        type: "spring",
        delay: time === undefined ? "100" : time,
      }}
      style={styles.shape}
    >
      {children}
    </MotiView>
  );
};

export default Animate_bottomtotop;

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
