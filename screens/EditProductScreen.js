import React, { useEffect, useCallback, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Product from "../models/Product";
import * as productActions from "../store/actions/productsAction";
import Input from "../components/Input";

const FORM_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedProduct = {
      ...state.inputProduct,
      [action.input]: action.input === "price" ? +action.value : action.value,
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
      inputProduct: updatedProduct,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  let inputProduct;

  if (productId) {
    inputProduct = useSelector((state) =>
      state.products.availableProducts.find((p) => p.id === productId)
    );
  } else {
    inputProduct = new Product("", "u1", "", "", 0, "");
  }

  const dispatch = useDispatch();

  const [formState, dispatchFormsState] = useReducer(formReducer, {
    inputProduct: inputProduct,
    inputValidities: {
      title: productId ? true : false,
      imageUrl: productId ? true : false,
      price: productId ? true : false,
      description: productId ? true : false,
    },
    formIsValid: productId ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      return;
    }

    if (productId) {
      dispatch(productActions.editProduct(formState.inputProduct));
    } else {
      dispatch(productActions.createProduct(formState.inputProduct));
    }
    props.navigation.goBack();
  }, [dispatch, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputId, value, isValid) => {
      dispatchFormsState({
        type: FORM_UPDATE,
        value: value,
        isValid: isValid,
        input: inputId,
      });
    },
    [dispatchFormsState]
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id={"title"}
            label={"Title"}
            autoCapitalize="sentences"
            autoCorrect
            onInputChange={inputChangeHandler}
            errorLabel={"Please enter a valid title!"}
            initialValue={formState.inputProduct.title}
            initiallyValid={!!productId}
            required
          />
          <Input
            id={"imageUrl"}
            label={"Image Url"}
            onInputChange={inputChangeHandler}
            errorLabel={"Please enter a valid Image Url!"}
            initialValue={formState.inputProduct.imageUrl}
            initiallyValid={!!productId}
            required
          />
          <Input
            id={"price"}
            label={"Price"}
            keyboardType="decimal-pad"
            editable={!productId}
            onInputChange={inputChangeHandler}
            errorLabel={"Please enter a number greater zero!"}
            initialValue={formState.inputProduct.price.toFixed(2).toString()}
            initiallyValid={!!productId}
            required
            min={0.1}
          />
          <Input
            id={"description"}
            label={"Description"}
            autoCapitalize="sentences"
            autoCorrect
            onInputChange={inputChangeHandler}
            errorLabel={"Please enter a valid description!"}
            multiline
            numberOflines={3}
            initialValue={formState.inputProduct.description}
            initiallyValid={!!productId}
            required
            minLenght={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  form: {
    margin: 20,
  },
});

export default EditProductScreen;
