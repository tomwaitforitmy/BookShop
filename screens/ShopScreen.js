import React from "react";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { StyleSheet } from "react-native";
import ProductList from "../components/ProductList";

const ShopScreen = (props) => {
  const products = useSelector((state) => state.products.products);

  return <ProductList productList={products} navigation={props.navigation} />;
};

ShopScreen.navigationOptions = (props) => {
  return {
    headerTitle: "Shop",
    headerStyle: {
      backgroundColor: Colors.second,
    },
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Drawer"
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
  dummyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShopScreen;
