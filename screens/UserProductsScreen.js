import React from "react";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { StyleSheet, Button, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../components/ProductItem";

const UserProductsScreen = (props) => {
  const userData = useSelector((state) => state.products.userProducts);
  return (
    <FlatList
      data={userData}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelectProduct={() => {}}
        >
          <Button title="Edit" color={Colors.second} onPress={() => {}} />
          <Button title="Delete" color={Colors.second} onPress={() => {}} />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (props) => {
  return {
    headerTitle: "Your products",
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
  listStyle: {},
});

export default UserProductsScreen;
