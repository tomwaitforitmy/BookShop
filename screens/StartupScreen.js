import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingIndicator from "../components/LoadingIndicator";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/authAction";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }

      const transformedData = JSON.parse(userData);
      const { token, userId, expericationDate } = transformedData;
      const expericationDateTransformed = new Date(expericationDate);

      if (expericationDateTransformed <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      const experiationTime = expericationDate.getTime() - new Date().getTime();

      props.navigation.navigate("ShopNavigator");
      dispatch(authActions.authenticate(token, userId, experiationTime));
    };
    tryLogin();
  }, [dispatch]);

  return <LoadingIndicator></LoadingIndicator>;
};

export default StartupScreen;
