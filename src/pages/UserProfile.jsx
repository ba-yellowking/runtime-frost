import React, { useEffect, useState } from "react"
import axios from "axios"
import Header from "../components/header/Header.jsx"
import Footer from "../components/footer/Footer.jsx"
import Spinner from "../ui/spinner/Spinner.jsx"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../slices/loadingSlice.jsx"
import { useTranslation } from "../hooks/useTranslation.jsx"

function UserProfile() {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.loading.isLoading)

  const [orders, setOrders] = useState([])

  function dateFormatting(date) {
    return new Date(date).toLocaleString("ru-RU", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  useEffect(function () {
    dispatch(setLoading(true))

    axios
      .get("https://frost.runtime.kz/api/orders")

      .then((response) => {
        setOrders(response.data)
        dispatch(setLoading(false))
      })

      .catch((error) => {
        console.log(error)
        dispatch(setLoading(false))
      })
  }, [])

  // useTranslation.jsx
  const { t } = useTranslation()

  return (
    <>
      <Header />

      <div className="main-page-container">
        <div className="profile-top">
          <p className="profile-top-text">{t("profileMyAccount")}</p>
        </div>

        {isLoading ? (
          <>
            <div className="profile-wrap dark:border-[#252525] dark:bg-[#252525]">
              <div className="spinner-container">
                <div className="spinner-wrapper">
                  <Spinner />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {orders.length > 0 ? (
              <div className="profile-wrap dark:border-[#252525] dark:bg-[#252525]">
                <span className="profile-text">{t("profileMyOrders")}</span>

                <div className="profile-header dark:bg-[#393939]">
                  <div className="profile-header-item">{t("profileOrderNo")}</div>
                  <div className="profile-header-item">{t("profileProduct")}</div>
                  <div className="profile-header-item">{t("profileQuantity")}</div>
                  <div className="profile-header-item">{t("profilePrice")}</div>
                  <div className="profile-header-item">{t("profileDate")}</div>
                </div>

                <div className="profile-body">
                  {orders.map(function (order) {
                    return order.items.map(function (item, index) {
                      return (
                        <div className="profile-item dark:border-[#393939]" key={index}>
                          <div className="profile-item-column">{order.id}</div>

                          <div className="profile-item-column">{item.product.name}</div>

                          <div className="profile-item-column">{item.count}</div>

                          <div className="profile-item-column">
                            {(item.count * item.product.price).toLocaleString("ru-RU")} тг.
                          </div>

                          <div className="profile-item-column">{dateFormatting(order.created_at)}</div>
                        </div>
                      )
                    })
                  })}
                </div>
              </div>
            ) : (
              <div className="cart-menu-container dark:border-[#252525] dark:bg-[#252525]">
                <span className="profile-text">{t("profileMyOrders")}</span>
                <div className="empty-orders">
                  <span>
                    {t("profileNoOrders")}
                    <a href="/" className="empty-cart-add-products">
                      {t("profileAddProducts")}
                    </a>
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  )
}

export default UserProfile
