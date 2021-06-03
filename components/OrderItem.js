import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import CartItem from "./CartItem";
import DefaultText from "./DefaultText";
import Card from "../components/Card";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <DefaultText style={styles.amount}>
          {props.amount.toFixed(2)}€
        </DefaultText>
        <DefaultText style={styles.date}>{props.date}</DefaultText>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? "Hide details" : "Show details"}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      ></Button>
      {showDetails && (
        <View style={styles.cartItems}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.title}
              deleteable={false}
            ></CartItem>
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  cartItems: {
    width: "100%",
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "black",
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
});

export default OrderItem;
