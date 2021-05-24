import { PRODUCTS } from "../../data/DummyData";
import { SET_FILTERS, TOGGLE_FAVORITE } from "../actions/productsAction";

const initialState = {
  products: PRODUCTS,
  productsInCart: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default productsReducer;
