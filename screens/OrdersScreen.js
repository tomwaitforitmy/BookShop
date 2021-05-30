import React from "react";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";
import OrderItem from "../components/OrderItem";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    // <View style={styles.container}>
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.amount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        ></OrderItem>
      )}
    ></FlatList>
    // </View>
  );
};

OrdersScreen.navigationOptions = (props) => {
  return {
    headerTitle: "Orders",
    headerStyle: {
      backgroundColor: Colors.second,
    },
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              console.log("drawer");
              props.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
