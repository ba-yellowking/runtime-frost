import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./slices/authSlice.jsx"
import { counterReducer } from "./slices/counterSlice.jsx"
import { loadingReducer } from "./slices/loadingSlice.jsx"
import { filterReducer } from "./slices/filterSlice.jsx"
import { cartReducer } from "./slices/cartSlice.jsx"
import { themeSliceReducer } from "./slices/themeSlice.jsx"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    loading: loadingReducer,
    filter: filterReducer,
    cart: cartReducer,
    theme: themeSliceReducer,
  },
})
