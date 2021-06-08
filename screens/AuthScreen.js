import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/Colors";

const AuthScreen = (props) => {
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
              errorMessage="Please enter a valid E-Mail address."
              initialValue=""
              onInputChange={() => {}}
            ></Input>
            <Input
              id="password"
              label="Password"
              secureTextEntry
              minLength={5}
              required
              autoCapitalize="none"
              errorMessage="Please enter a valid password."
              initialValue=""
              onInputChange={() => {}}
            ></Input>
            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                color={Colors.primary}
                onPress={() => {}}
              ></Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Register"
                color={Colors.second}
                onPress={() => {}}
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
