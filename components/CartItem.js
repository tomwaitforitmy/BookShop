import React from "react";
import { StyleSheet, Text, View, ImageBackground, Button } from "react-native";
import Colors from "../constants/Colors";
import DefaultText from "./DefaultText";
import { GetTouchableComponentForAnyOS } from "../common_functions/GetTouchableComponentForAnyOS";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  let MyTouchable = GetTouchableComponentForAnyOS();
  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.title} numberOfLines={1}>
          {props.title}
        </Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amount}>{props.amount.toFixed(2)}€</Text>
        <MyTouchable onPress={props.onRemove} style={styles.deleteButton}>
          <Ionicons name={"ios-trash"} size={23} color={"red"}></Ionicons>
        </MyTouchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    color: "#888",
    fontSize: 16,
    maxWidth: 200,
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    margin: 20,
  },
  amount: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
