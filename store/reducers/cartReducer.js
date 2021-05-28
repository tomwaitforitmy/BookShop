import { ADD_TO_CART } from "../actions/cartAction";
import CartItem from "../../models/CartItem";

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.product;

      let updateOrNewCartItem;

      if (state.items[addedProduct.id]) {
        //already have the item
        const existingItem = state.items[addedProduct.id];
        updateOrNewCartItem = new CartItem(
          existingItem.quantity + 1,
          addedProduct.price,
          addedProduct.title,
          existingItem.sum + addedProduct.price
        );
      } else {
        updateOrNewCartItem = new CartItem(
          1,
          addedProduct.price,
          addedProduct.title,
          addedProduct.price
        );
      }
      return {
        // ...state, <- needed if state ever contains things that should not change with this action!
        items: { ...state.items, [addedProduct.id]: updateOrNewCartItem },
        totalAmount: state.totalAmount + addedProduct.price,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
