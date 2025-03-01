import { createSlice } from "@reduxjs/toolkit"

const availableProductSlice = createSlice({
  name: "availableProduct",
  initialState: {
    isAvailable: [],
  },
  reducers: {
    setAvailableProduct: (state, action) => {
      state.isAvailable = action.payload.map(product => product.available)
    }
  }
})

export const { setAvailableProduct } = availableProductSlice.actions
export const availableReducer = availableProductSlice.reducer