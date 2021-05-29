import Order from "../../models/Order";
import { ADD_ORDER } from "../actions/ordersAction";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      const newOrder = new Order(
        new Date().toString(),
        action.orderDataKey.items,
        action.orderDataKey.amount,
        new Date()
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    }

    default:
      return state;
  }
};
