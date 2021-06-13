import { HandleResponseError } from "../../common_functions/HandleResponseError";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

const FIREBASE_API_KEY = "AIzaSyBK-NbCaWKt412ZW0uBZP5N87RQHck8KwA";

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
    dispach({
      type: SIGNUP,
      token: responseData.idToken,
      userId: responseData.localId,
    });
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
    dispach({
      type: LOGIN,
      token: responseData.idToken,
      userId: responseData.localId,
    });
  };
};
