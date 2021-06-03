import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FlatList, View, StyleSheet, Button } from "react-native";
import Colors from "../constants/Colors";
import ProductItem from "./ProductItem";
import * as cartActions from "../store/actions/cartAction";
import * as productActions from "../store/actions/productsAction";

const ProductList = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.fetchProducts());
  }, [dispatch]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      routeName: "ProductDetails",
      params: {
        productId: id,
        productTitle: title,
      },
    });
  };

  const renderProductItem = (itemData) => {
    return (
      <ProductItem
        title={itemData.item.title}
        onSelectProduct={() => {
          selectItemHandler(itemData.item.id, itemData.item.title);
        }}
        price={itemData.item.price}
        description={itemData.item.description}
        image={itemData.item.imageUrl}
      >
        <Button
          title="View details"
          color={Colors.second}
          onPress={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        />
        <Button
          title="Add to cart"
          color={Colors.second}
          onPress={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      </ProductItem>
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
