export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      "https://testshop-39aae-default-rtdb.europe-west1.firebasedatabase.app/orders/u1.json",
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

    if (!response.ok) {
      throw new Error(
        "Something went wrong with orders! \n #" + response.status
      );
    }

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
