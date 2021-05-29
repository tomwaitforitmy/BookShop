export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmount) => {
  return {
    type: ADD_ORDER,
    orderDataKey: { items: cartItems, amount: totalAmount },
  };
};
