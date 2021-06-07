import React, { useReducer, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DefaultText from "./DefaultText";
import Colors from "../constants/Colors";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE: {
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    }
    case INPUT_BLUR: {
      return {
        ...state,
        touched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    //Attempt to improve validation behavior.
    // if (inputState.touched) {
    onInputChange(id, inputState.value, inputState.isValid);
    // }
  }, [inputState, onInputChange, id]);

  const textChangedHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={{ ...styles.container, ...props.style }}>
      <DefaultText style={styles.label}>{props.label}</DefaultText>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={styles.input}
          value={inputState.value}
          onChangeText={textChangedHandler}
          onBlur={lostFocusHandler}
        ></TextInput>
        {inputState.isValid && (
          <Ionicons name={"ios-checkmark"} size={23} color={Colors.primary} />
        )}
      </View>
      {!inputState.isValid && inputState.touched && (
        <DefaultText style={styles.error}>{props.errorLabel}</DefaultText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  error: {
    color: "red",
    fontSize: 13,
  },
  container: {
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
    width: "90%",
  },
});

export default Input;
