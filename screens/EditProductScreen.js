import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { StyleSheet, View, TextInput, ScrollView } from "react-native";
import DefaultText from "../components/DefaultText";
import Product from "../models/Product";

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  let foundProd = false;

  if (productId) {
    foundProd = useSelector((state) =>
      state.products.availableProducts.find((p) => p.id === productId)
    );
  }

  const [product, setProduct] = useState(
    foundProd ? foundProd : new Product("pId", "uId", "", "", "", "")
  );

  const submitHandler = useCallback(() => {
    console.log("Saving");
  }, []);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  // console.log(product);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <DefaultText style={styles.label}>Title</DefaultText>
          <TextInput
            style={styles.input}
            value={product.title}
            onChangeText={(text) => setProduct({ ...product, title: text })}
          ></TextInput>
        </View>
        <View style={styles.formControl}>
          <DefaultText style={styles.label}>Image</DefaultText>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setProduct({ ...product, imageUrl: text })}
          >
            {product.imageUrl}
          </TextInput>
        </View>
        <View style={styles.formControl}>
          <DefaultText style={styles.label}>Price</DefaultText>
          <TextInput
            editable={!foundProd}
            style={styles.input}
            onChangeText={(text) => setProduct({ ...product, price: text })}
          >
            {product.price}
          </TextInput>
        </View>
        <View style={styles.formControl}>
          <DefaultText style={styles.label}>Description</DefaultText>
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setProduct({ ...product, description: text })
            }
          >
            {product.description}
          </TextInput>
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (props) => {
  const productId = props.navigation.getParam("productId");
  const submitHandler = props.navigation.getParam("submit");

  return {
    headerTitle: productId ? "Edit product" : "Add product",
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
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Save" iconName="ios-checkmark" onPress={submitHandler} />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  form: {
    margin: 20,
  },
});

export default EditProductScreen;
