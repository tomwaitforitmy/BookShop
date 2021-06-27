import React, { useState } from "react";
import { fetchFonts } from "./common_functions/fetchFonts";
import AppLoading from "expo-app-loading";
import NavigationContainer from "./navigation/NavigationContainer";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/producsReducer";
import cartReducer from "./store/reducers/cartReducer";
import ordersReducer from "./store/reducers/ordersReducer";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducers/authReducer";

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
      <NavigationContainer />
    </Provider>
  );
}
