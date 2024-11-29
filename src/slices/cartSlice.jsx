import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {setLoading} from "./loadingSlice.jsx";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
    }
  }
})

// fetching cart items
// export function fetchCartItems() {
//   return function(dispatch) {
//     return new Promise(function(resolve, reject) {
//       dispatch(setLoading(true));
//       axios
//         .get("https://frost.runtime.kz/api/cart")
//         .then(function (response) {
//           dispatch(setCartItems(response.data.items));
//           resolve();
//         })
//         .catch((error) => {
//           console.error(error);
//           reject();
//         });
//     })
//   }
// }

export function fetchCartItems() {
  return async function(dispatch) {
    dispatch(setLoading(true))
    const response = await axios.get("https://frost.runtime.kz/api/cart")
    dispatch(setCartItems(response.data.items))
  }
}

// deleting an item from cart
export function deleteCartItems(productId) {
  return function(dispatch, getState) {
    const cartItems = getState().cart.cartItems;
    axios
      .get(`https://frost.runtime.kz/api/cart/delete?productId=${productId}`)
      .then(function() {
        const updatedCartItems = [...cartItems];
        const deleteIndex = updatedCartItems.findIndex(function(item) {
          return item.product.id === productId
        })
        updatedCartItems.splice(deleteIndex, 1);
        dispatch(setCartItems(updatedCartItems));
      })
      .catch((error) => console.error(error))
  }
}

// increasing the quantity of items in cart
export function increaseCartItems(productId) {
  return function(dispatch, getState) {
    const cartItems = getState().cart.cartItems;
    axios
      .get(`https://frost.runtime.kz/api/cart/increase?productId=${productId}`)
      .then(function() {
        const updatedCartItems = cartItems.map(item => {
          if (item.product.id === productId) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
        dispatch(setCartItems(updatedCartItems));
      })
      .catch((error) => console.error(error))
  }
}

// decreasing the quantity of items in cart
export function decreaseCartItems(productId) {
  return function(dispatch, getState) {
    const cartItems = getState().cart.cartItems;
    axios
      .get(`https://frost.runtime.kz/api/cart/decrease?productId=${productId}`)
      .then(function() {
        const updatedCartItems = cartItems.map(item => {
          if (item.product.id === productId) {
            if (item.count > 1) {
              return { ...item, count: item.count - 1 };
            } else {
              dispatch(deleteCartItems(productId));
              return item;
            }
          }
          return item;
        });
        dispatch(setCartItems(updatedCartItems));
      })
      .catch(error => console.error(error));
  }
}

export const {setCartItems} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;