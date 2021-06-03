import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://testshop-39aae-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    );

    const responseData = await response.json();

    const loadedProducts = [];

    for (const key in responseData) {
      loadedProducts.push(
        new Product(
          key,
          "u1",
          responseData[key].title,
          responseData[key].imageUrl,
          responseData[key].price,
          responseData[key].description
        )
      );
    }

    dispatch({ type: SET_PRODUCTS, products: loadedProducts });
  };
};

export const deleteProduct = (id) => {
  return { type: DELETE_PRODUCT, productId: id };
};

export const createProduct = (product) => {
  const replacer = (key, value) => {
    if (key === "id") return undefined;
    else return value;
  };

  return async (dispatch) => {
    const response = await fetch(
      "https://testshop-39aae-default-rtdb.europe-west1.firebasedatabase.app/products.json",
      {
        method: "POST",
        header: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product, replacer),
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
