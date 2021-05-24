import React, { useState } from "react";
import { fetchFonts } from "./common_functions/fetchFonts";
import AppLoading from "expo-app-loading";
import ShopNavigator from "./navigation/ShopNavigator";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/mealsReducer";

enableScreens();

const rootReducer = combineReducers({ meals: productsReducer });

const store = createStore(rootReducer);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
