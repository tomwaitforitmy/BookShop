import React from "react";
import { SafeAreaView, Button, View, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import Colors from "../constants/Colors";
import ShopScreen from "../screens/ShopScreen";
import CartScreen from "../screens/CartScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import OrdersScreen from "../screens/OrdersScreen";
import UserProductsScreen from "../screens/UserProductsScreen";
import EditProductScreen from "../screens/EditProductScreen";
import { Ionicons } from "@expo/vector-icons";
import AuthScreen from "../screens/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/authAction";

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

const DrawerNavigator = createDrawerNavigator(
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
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={styles.logout}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props}></DrawerNavigatorItems>
            <Button
              title="Logout"
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate("Auth");
              }}
              color={Colors.primary}
            ></Button>
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions,
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    Startup: StartupScreen,
    Auth: AuthNavigator,
    ShopNavigator: DrawerNavigator,
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions,
  }
);

const styles = StyleSheet.create({
  logout: {
    flex: 1,
    paddingTop: 100,
  },
});

export default createAppContainer(SwitchNavigator);
