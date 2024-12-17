import { createSlice } from "@reduxjs/toolkit"

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 0,
  },
  reducers: {
    setTotalCount(state, action) {
      state.counter = action.payload
    },
  },
})

export const { setTotalCount } = counterSlice.actions

export const counterReducer = counterSlice.reducer
