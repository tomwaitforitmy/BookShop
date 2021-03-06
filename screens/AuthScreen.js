import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  Button,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/authAction";
import LoadingIndicator from "../components/LoadingIndicator";

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

const AuthScreen = (props) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [formState, dispatchFormsState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Shop");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

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
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={10}
      style={styles.screen}
    >
      <LinearGradient
        colors={[Colors.primary, Colors.second]}
        style={styles.gradient}
      >
        <Card style={styles.container}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              required
              email
              autoCapitalize="none"
              errorLabel="Please enter a valid E-Mail address."
              initialValue=""
              onInputChange={inputChangeHandler}
            ></Input>
            <Input
              id="password"
              label="Password"
              secureTextEntry
              minLength={6}
              required
              autoCapitalize="none"
              errorLabel="Please enter a valid password."
              initialValue=""
              onInputChange={inputChangeHandler}
            ></Input>
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <LoadingIndicator></LoadingIndicator>
              ) : (
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                ></Button>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                color={Colors.second}
                onPress={() => {
                  setIsSignup((prevState) => !prevState);
                }}
              ></Button>
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    flex: 1,
  },
  container: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
});

export default AuthScreen;
