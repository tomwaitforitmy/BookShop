import Order from "../../models/Order";
import { ADD_ORDER, SET_ORDERS } from "../actions/ordersAction";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS: {
      return {
        ...state,
        orders: action.orders,
      };
    }
    case ADD_ORDER: {
      const newOrder = new Order(
        action.orderDataKey.id,
        action.orderDataKey.items,
        action.orderDataKey.amount,
        action.orderDataKey.date
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
