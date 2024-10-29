import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    tokenInfo: JSON.parse(localStorage.getItem("tokenInfo")),
    user: null
  },
  reducers: {
    setTokenInfo(state, action) {
      state.tokenInfo = action.payload
    },
    setUser(state, action) {
      state.user = action.payload
    }
  }
})

// Thunk/middleware – посреднические функции (зачастую асинхронные), выполняемые до обновления состояния (store) через
// reducer функции.
// Люая thunk/middleware функция должна возвращать новую callback функцию, которая может принимать два параметра
// (функции):
// 1) dispatch (стандартная dispatch функция для обновления состояния через action), и
// 2) getState (возвращает актуальное на момент вызова состояние)

export function checkTokenAndGetUser() {
  return function (dispatch, getState) {
    const authState = getState().auth
    if (authState.tokenInfo && authState.tokenInfo.expiresIn > new Date().getTime()) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + authState.tokenInfo.accessToken
      axios
        .post("https://frost.runtime.kz/api/auth/user")
        .then(function(response) {
          dispatch(setUser(response.data))
        })
    }
  }
}

export function signIn(username, password) {
  return function (dispatch) {
    return new Promise(function(resolve, reject) {
      axios
        .post("https://frost.runtime.kz/api/auth/token", {username, password})
        .then(response => {
          const tokenInfo = {
            accessToken: response.data.access_token,
            expiresIn: new Date().getTime() + (response.data.expires_in * 1000)
          }
          dispatch(setTokenInfo(tokenInfo));
          localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));
          dispatch(checkTokenAndGetUser());
          resolve();
        })
        .catch(function(error) {
          console.error(error);
          reject();
        })
    })
  }
}

export function signOut() {
  return function (dispatch) {
    localStorage.removeItem("tokenInfo");
    dispatch(setUser(null));
    dispatch(setTokenInfo(null));
  }
}

export const {setTokenInfo, setUser} = authSlice.actions;

export const authReducer = authSlice.reducer;