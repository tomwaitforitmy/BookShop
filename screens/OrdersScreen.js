import React from "react";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { StyleSheet, View } from "react-native";
import DefaultText from "../components/DefaultText";

const OrdersScreen = (props) => {
  return (
    <View style={styles.dummyContent}>
      <DefaultText>OrdersScreen</DefaultText>
    </View>
  );
};

OrdersScreen.navigationOptions = (props) => {
  return {
    headerTitle: "Your cart",
    headerStyle: {
      backgroundColor: Colors.second,
    },
    // headerLeft: () => {
    //   return (
    //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //       <Item
    //         title="Drawer"
    //         iconName="ios-menu"
    //         onPress={() => {
    //           console.log("drawer");
    //           props.navigation.toggleDrawer();
    //         }}
    //       />
    //     </HeaderButtons>
    //   );
    // },
  };
};

const styles = StyleSheet.create({
  dummyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
