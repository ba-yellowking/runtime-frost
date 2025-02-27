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
        console.log(orders)
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
        <div className="profile__section">
          <p className="profile__section--text">{t("profileMyAccount")}</p>
        </div>

        {isLoading ? (
          <>
            <div className="profile__wrap dark:border-[#252525] dark:bg-[#252525]">
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
              <div className="profile__wrap dark:border-[#252525] dark:bg-[#252525]">
                <span className="profile__orders">{t("profileMyOrders")}</span>

                <div className="profile__header dark:bg-[#393939]">
                  <div className="profile__header--column">{t("profileOrderNo")}</div>
                  <div className="profile__header--column">{t("profileProduct")}</div>
                  <div className="profile__header--column">{t("profileQuantity")}</div>
                  <div className="profile__header--column">{t("profilePrice")}</div>
                  <div className="profile__header--column">{t("profileDate")}</div>
                </div>

                <div className="profile__body">

                    {orders.map((order, index) => (
                      <div className="profile__item dark:border-[#393939]" key={index}>

                        <div className="profile__item--column">
                          {order.id}
                        </div>

                        <div className="profile__item--column">
                          {order.items.map((item, i) => (
                            <li key={i}>{item.product.name}</li>
                          ))}
                        </div>

                        <div className="profile__item--column">
                          {order.items.map((item, i) => (
                            <div key={i}>{item.count}</div>
                          ))}
                        </div>

                        <div className="profile__item--column">
                          {order.items.map((item, i) => (
                            <div key={i}>
                              {(item.count * item.product.price).toLocaleString("ru-RU")} тг.
                            </div>
                          ))}
                        </div>

                        <div className="profile__item--column">
                          {dateFormatting(order.created_at)}
                        </div>

                      </div>
                    ))}

                </div>
              </div>
            ) : (
              <div className="cart-menu-container dark:border-[#252525] dark:bg-[#252525]">
                <span className="profile__orders">{t("profileMyOrders")}</span>
                <div className="profile__empty">
                  <span>
                    {t("profileNoOrders")}
                    <a href="/" className="profile__empty--add">
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
