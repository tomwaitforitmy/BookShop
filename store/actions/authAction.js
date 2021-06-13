import { HandleResponseError } from "../../common_functions/HandleResponseError";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";

const FIREBASE_API_KEY = "AIzaSyBK-NbCaWKt412ZW0uBZP5N87RQHck8KwA";

export const authenticate = (token, userId) => {
  return { type: AUTHENTICATE, token: token, userId: userId };
};

export const signup = (email, password) => {
  return async (dispach) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    await HandleResponseError(response);

    const responseData = await response.json();
    dispach(authenticate(responseData.idToken, responseData.localId));

    const expericationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );
    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expericationDate
    );
  };
};

export const login = (email, password) => {
  return async (dispach) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    await HandleResponseError(response);

    const responseData = await response.json();
    console.log(responseData);
    dispach(authenticate(responseData.idToken, responseData.localId));

    const expericationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );
    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expericationDate
    );
  };
};

const saveDataToStorage = (token, userId, expericationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expericationDate: expericationDate.toISOString(),
    })
  );
};
