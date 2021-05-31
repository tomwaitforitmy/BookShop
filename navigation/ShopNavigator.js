import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import Colors from "../constants/Colors";
import ShopScreen from "../screens/ShopScreen";
import CartScreen from "../screens/CartScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import OrdersScreen from "../screens/OrdersScreen";
import UserProductsScreen from "../screens/UserProductsScreen";
import EditProductScreen from "../screens/EditProductScreen";
import { Ionicons } from "@expo/vector-icons";

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: "white",
  headerTitle: "A dummy title",
};

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={"ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultStackNavigationOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name={"ios-list"} size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultStackNavigationOptions,
  }
);

const ShopNavigator = createStackNavigator(
  {
    Shop: ShopScreen,
    Cart: CartScreen,
    ProductDetails: ProductDetailScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name={"ios-cart"} size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultStackNavigationOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Shop: ShopNavigator,
    Orders: OrdersNavigator,
    ManageProducts: {
      screen: AdminNavigator,
      navigationOptions: {
        drawerLabel: "Manage your products",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
  }
);

export default createAppContainer(MainNavigator);
