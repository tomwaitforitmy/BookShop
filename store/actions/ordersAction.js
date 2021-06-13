import { HandleResponseError } from "../../common_functions/HandleResponseError";
import Order from "../../models/Order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://testshop-39aae-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json`
      );

      await HandleResponseError(response);

      const responseData = await response.json();
      const loadedOrders = [];

      for (const key in responseData) {
        loadedOrders.push(
          new Order(
            key,
            responseData[key].cartItems,
            responseData[key].totalAmount,
            new Date(responseData[key].date)
          )
        );
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://testshop-39aae-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date,
        }),
      }
    );

    await HandleResponseError(response);

    const responseData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderDataKey: {
        id: responseData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
