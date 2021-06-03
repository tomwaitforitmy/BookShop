import React, { useState, useEffect, useCallback, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { StyleSheet, View, TextInput, ScrollView } from "react-native";
import DefaultText from "../components/DefaultText";
import Product from "../models/Product";
import * as productActions from "../store/actions/productsAction";

const FORM_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  let foundProd = false;

  if (productId) {
    foundProd = useSelector((state) =>
      state.products.availableProducts.find((p) => p.id === productId)
    );
  }
  const [product, setProduct] = useState(
    foundProd
      ? foundProd
      : new Product(new Date().toString(), "u1", "", "", 0, "")
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormsState] = useReducer(formReducer, {
    inputValues: {
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      description: product.description,
    },
    inputValidities: {
      title: foundProd ? true : false,
      imageUrl: foundProd ? true : false,
      price: foundProd ? true : false,
      description: foundProd ? true : false,
    },
    formIsValid: foundProd ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      return;
    }

    if (productId) {
      dispatch(productActions.editProduct(product));
    } else {
      dispatch(productActions.createProduct(product));
    }
    props.navigation.goBack();
  }, [dispatch, product, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const textChangedHandler = (inputId, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }

    if (inputId === "price") {
      setProduct({ ...product, [inputId]: +text });
    } else {
      setProduct({ ...product, [inputId]: text });
    }

    dispatchFormsState({
      type: FORM_UPDATE,
      value: text,
      isValid: isValid,
      input: inputId,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <DefaultText style={styles.label}>Title</DefaultText>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            autoCapitalize="sentences"
            autoCorrect
            onChangeText={textChangedHandler.bind(this, "title")}
          ></TextInput>
          {!formState.inputValidities.title && (
            <DefaultText>Please enter a valid title!</DefaultText>
          )}
        </View>
        <View style={styles.formControl}>
          <DefaultText style={styles.label}>Image</DefaultText>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            onChangeText={textChangedHandler.bind(this, "imageUrl")}
          >
            {formState.inputValues.imageUrl}
          </TextInput>
        </View>
        <View style={styles.formControl}>
          <DefaultText style={styles.label}>Price</DefaultText>
          <TextInput
            editable={!foundProd}
            style={styles.input}
            onChangeText={textChangedHandler.bind(this, "price")}
          >
            {formState.inputValues.price}
          </TextInput>
        </View>
        <View style={styles.formControl}>
          <DefaultText style={styles.label}>Description</DefaultText>
          <TextInput
            style={styles.input}
            onChangeText={textChangedHandler.bind(this, "description")}
          >
            {formState.inputValues.description}
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
