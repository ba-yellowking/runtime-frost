import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainPage from "./pages/MainPage.jsx"
import CartPage from "./pages/CartPage.jsx"
import ProductCardPage from "./pages/ProductCardPage.jsx"
import "./index.css"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./store.jsx"

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/products/:productId", element: <ProductCardPage /> },
  { path: "/cart", element: <CartPage /> },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </>
)
