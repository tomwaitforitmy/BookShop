import React from "react";
import Colors from "../constants/Colors";
import { Image, ScrollView, StyleSheet, View, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DefaultText from "../components/DefaultText";
import * as cartActions from "../store/actions/cartAction";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((p) => p.id === productId)
  );

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to card"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <DefaultText style={styles.price}>
        {selectedProduct.price.toFixed(2)}€
      </DefaultText>
      <DefaultText style={styles.description}>
        {selectedProduct.description}
      </DefaultText>
    </ScrollView>
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
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
