import { PRODUCTS } from "../../data/DummyData";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  SET_PRODUCTS,
} from "../actions/productsAction";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products.filter((prod) => prod.ownerId === "u1"),
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.productId
        ),
      };
    }
    case CREATE_PRODUCT: {
      return {
        ...state,
        availableProducts: state.availableProducts.concat(action.product),
        userProducts: state.userProducts.concat(action.product),
      };
    }
    case EDIT_PRODUCT: {
      const productIndex = state.availableProducts.findIndex(
        (p) => p.id === action.product.id
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[productIndex] = action.product;

      const userProductIndex = state.userProducts.findIndex(
        (p) => p.id === action.product.id
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIndex] = action.product;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    }
    default:
      return state;
  }
};

export default productsReducer;
