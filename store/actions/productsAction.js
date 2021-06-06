import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://testshop-39aae-default-rtdb.europe-west1.firebasedatabase.app/products.json"
      );

      if (!response.ok) {
        throw new Error(
          "Something went wrong fetching! \n #" + response.status
        );
      }

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
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://testshop-39aae-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong deleting! \n #" + response.status);
    }

    dispatch({ type: DELETE_PRODUCT, productId: id });
  };
};

const replacer = (key, value) => {
  if (key === "id") return undefined;
  else return value;
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
        body: JSON.stringify(product, replacer),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong creating! \n #" + response.status);
    }

    const responseData = await response.json();

    product = { ...product, id: responseData.name };

    dispatch({ type: CREATE_PRODUCT, product: product });
  };
};

export const editProduct = (product) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://testshop-39aae-default-rtdb.europe-west1.firebasedatabase.app/products/${product.id}.json`,
      {
        method: "PATCH",
        header: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product, replacer),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong editing! \n #" + response.status);
    }

    dispatch({ type: EDIT_PRODUCT, product: product });
  };
};
