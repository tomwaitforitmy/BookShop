import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FlatList,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import ProductItem from "./ProductItem";
import * as cartActions from "../store/actions/cartAction";
import * as productActions from "../store/actions/productsAction";
import DefaultText from "./DefaultText";

const ProductList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [expcetion, setExpcetion] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setExpcetion(null);
    setIsLoading(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      console.log(err);
      setExpcetion(err);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setExpcetion]);

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener(
      "willFocus",
      () => {
        loadProducts();
      }
    );

    return () => {
      willFocusSubscription.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

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

  if (expcetion) {
    return (
      <View style={styles.list}>
        <DefaultText>No data found! {expcetion.toString()}</DefaultText>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        ></Button>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.list}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        ></ActivityIndicator>
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.list}>
        <DefaultText>No data found! Something is wrong.</DefaultText>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        ></Button>
      </View>
    );
  }
  return (
    <View style={{ ...styles.list, ...props.style }}>
      <FlatList
        data={products}
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
