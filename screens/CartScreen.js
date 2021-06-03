import React from "react";
import Colors from "../constants/Colors";
import { StyleSheet, View, Button, FlatList } from "react-native";
import DefaultText from "../components/DefaultText";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import * as cartActions from "../store/actions/cartAction";
import * as ordersAction from "../store/actions/ordersAction";

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const itemsInArrayFrom = [];
    for (const key in state.cart.items) {
      itemsInArrayFrom.push({
        productId: key,
        productTitle: state.cart.items[key].title,
        productPrice: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return itemsInArrayFrom.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <DefaultText style={styles.summaryText}>
          Total amount: {Math.abs(cartTotalAmount).toFixed(2)}€
        </DefaultText>
        <Button
          title="Order now"
          onPress={() => {
            dispatch(ordersAction.addOrder(cartItems, cartTotalAmount));
          }}
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deleteable={true}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          ></CartItem>
        )}
      ></FlatList>
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
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: Colors.second,
  },
});

export default CartScreen;
