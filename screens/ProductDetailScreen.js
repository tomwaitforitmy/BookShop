import React from "react";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { StyleSheet, View } from "react-native";
import DefaultText from "../components/DefaultText";

const ProductDetailScreen = (props) => {
  return (
    <View style={styles.dummyContent}>
      <DefaultText>ProductDetailScreen</DefaultText>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (props) => {
  const title = props.navigation.getParam("productTitle");

  return {
    headerTitle: title,
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

export default ProductDetailScreen;
