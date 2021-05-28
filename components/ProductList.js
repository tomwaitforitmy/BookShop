import React from "react";
import { useDispatch } from "react-redux";
import { FlatList, View, StyleSheet } from "react-native";
import ProductItem from "./ProductItem";
import * as cartActions from "../store/actions/cartAction";

const ProductList = (props) => {
  const dispatch = useDispatch();

  const renderProductItem = (itemData) => {
    return (
      <ProductItem
        title={itemData.item.title}
        onSelectProduct={() => {
          props.navigation.navigate({
            routeName: "ProductDetails",
            params: {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            },
          });
        }}
        onAddToCart={() => {
          dispatch(cartActions.addToCart(itemData.item));
        }}
        price={itemData.item.price}
        description={itemData.item.description}
        image={itemData.item.imageUrl}
      />
    );
  };

  return (
    <View style={{ ...styles.list, ...props.style }}>
      <FlatList
        data={props.productList}
        renderItem={renderProductItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default ProductList;
