import React from "react";
import Colors from "../constants/Colors";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((p) => p.id === productId)
  );

  return (
    <View style={styles.dummyContent}>
      <DefaultText>{selectedProduct.title}</DefaultText>
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
