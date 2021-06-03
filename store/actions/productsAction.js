export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

export const deleteProduct = (id) => {
  return { type: DELETE_PRODUCT, productId: id };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://testshop-39aae-default-rtdb.europe-west1.firebasedatabase.app/products.json",
      {
        method: "POST",
        header: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );

    const responseData = await response.json();

    product = { ...product, id: responseData.name };

    dispatch({ type: CREATE_PRODUCT, product: product });
  };
};

export const editProduct = (product) => {
  return { type: EDIT_PRODUCT, product: product };
};
