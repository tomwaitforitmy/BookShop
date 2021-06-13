import { HandleResponseError } from "../../common_functions/HandleResponseError";
import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        "https://testshop-39aae-default-rtdb.europe-west1.firebasedatabase.app/products.json"
      );

      await HandleResponseError(response);

      const responseData = await response.json();
      const loadedProducts = [];

      for (const key in responseData) {
        loadedProducts.push(
          new Product(
            key,
            responseData[key].ownerId,
            responseData[key].title,
            responseData[key].imageUrl,
            responseData[key].price,
            responseData[key].description
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((p) => p.ownerId === userId),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://testshop-39aae-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    await HandleResponseError(response);

    dispatch({ type: DELETE_PRODUCT, productId: id });
  };
};

const replacer = (key, value) => {
  if (key === "id") return undefined;
  else return value;
};

export const createProduct = (product) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    product = { ...product, ownerId: userId };

    const response = await fetch(
      `https://testshop-39aae-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product, replacer),
      }
    );

    await HandleResponseError(response);

    const responseData = await response.json();

    product = { ...product, id: responseData.name };

    dispatch({ type: CREATE_PRODUCT, product: product });
  };
};

export const editProduct = (product) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://testshop-39aae-default-rtdb.europe-west1.firebasedatabase.app/products/${product.id}.json?auth=${token}`,
      {
        method: "PATCH",
        header: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product, replacer),
      }
    );

    await HandleResponseError(response);

    dispatch({ type: EDIT_PRODUCT, product: product });
  };
};
