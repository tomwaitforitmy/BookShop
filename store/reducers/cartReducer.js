import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartAction";
import CartItem from "../../models/CartItem";
import { ADD_ORDER } from "../actions/ordersAction";

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
    case REMOVE_FROM_CART: {
      const selectedCartItem = state.items[action.productId];
      const currentQuantity = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQuantity > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.price,
          selectedCartItem.title,
          selectedCartItem.sum - selectedCartItem.price
        );
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.price,
      };
    }
    case ADD_ORDER: {
      return initialState;
    }
    default:
      return state;
  }
};

export default cartReducer;
