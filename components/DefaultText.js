import React from "react";
import { StyleSheet, Text } from "react-native";

const DefaultText = (props) => {
  return (
    <Text
      style={{ ...styles.text, ...props.style }}
      numberOfLines={props.numberOfLines}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
  },
});

export default DefaultText;
