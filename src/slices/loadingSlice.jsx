import { createSlice } from "@reduxjs/toolkit"

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: {},
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload
    },
  },
})

export const { setLoading } = loadingSlice.actions
export const loadingReducer = loadingSlice.reducer
