import React from "react";
import { StyleSheet, Text, View, ImageBackground, Button } from "react-native";
import Colors from "../constants/Colors";
import DefaultText from "./DefaultText";
import { GetTouchableComponentForAnyOS } from "../common_functions/GetTouchableComponentForAnyOS";

const ProductItem = (props) => {
  let MyTouchable = GetTouchableComponentForAnyOS();

  return (
    <View style={{ ...styles.productItemContainer, ...props.style }}>
      <MyTouchable onPress={props.onSelectProduct}>
        <View>
          <View style={styles.productImageAndTitleContainer}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.backgroundImage}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.productDetailContainer}>
            <DefaultText style={styles.price}>
              {props.price.toFixed(2)}€
            </DefaultText>
            <DefaultText style={styles.description} numberOfLines={1}>
              {props.description}
            </DefaultText>
          </View>
          <View style={styles.actionButtonsContainer}>
            <Button
              title="View details"
              color={Colors.second}
              onPress={props.onSelectProduct}
            />
            <Button
              title="Add to cart"
              color={Colors.second}
              onPress={props.onAddToCart}
            />
          </View>
        </View>
      </MyTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  productItemContainer: {
    flex: 1,
    height: 300,
    backgroundColor: "#ccc",
    margin: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  productImageAndTitleContainer: {
    height: "60%",
  },
  productDetailContainer: {
    paddingHorizontal: 30,
    justifyContent: "space-around",
    alignItems: "center",
    height: "20%",
  },
  actionButtonsContainer: {
    height: "20%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    flexDirection: "row",
  },
  price: {
    fontFamily: "open-sans-bold",
  },
  description: {},
  productRow: {
    flexDirection: "row",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "white",
  },
  titleContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default ProductItem;
