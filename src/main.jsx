import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainPage from "./pages/MainPage.jsx"
import CartPage from "./pages/CartPage.jsx"
import ProductCardPage from "./pages/ProductCardPage.jsx"
import "./index.css"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./store.jsx"
import ThemeHandler from "./components/themeHandler/ThemeHandler.jsx"
import { LocalizationProvider } from "./contexts/localizationContext/LocalizationContext.jsx"
import App from "./App.jsx"
import UserProfile from "./pages/UserProfile.jsx"

const router = createBrowserRouter([
  {
    path: ":locale?",
    element: <App />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "products/:productId", element: <ProductCardPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "account", element: <UserProfile /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ReduxProvider store={store}>
      <LocalizationProvider>
        <ThemeHandler />
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ReduxProvider>
  </>
)
