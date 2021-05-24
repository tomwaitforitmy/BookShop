import * as Font from "expo-font";

export const fetchFonts = () => {
  console.log("fetch Fonts ...");
  return Font.loadAsync({
    "open-sans": require("../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  });
};
