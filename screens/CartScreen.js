import React from "react";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { StyleSheet, View } from "react-native";
import DefaultText from "../components/DefaultText";

const CartScreen = (props) => {
  return (
    <View style={styles.dummyContent}>
      <DefaultText>CartScreen</DefaultText>
    </View>
  );
};

CartScreen.navigationOptions = (props) => {
  return {
    headerTitle: "Your cart",
    headerStyle: {
      backgroundColor: Colors.second,
    },
  };
};

const styles = StyleSheet.create({
  dummyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartScreen;
