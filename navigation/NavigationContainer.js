import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import ShopNavigator from "./ShopNavigator";

const NavigationContainer = (props) => {
  const navigatorRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navigatorRef.current.dispatch(
        NavigationActions.navigate({
          routeName: "Auth",
        })
      );
    }
  }, [isAuth]);

  return <ShopNavigator ref={navigatorRef} />;
};

export default NavigationContainer;
