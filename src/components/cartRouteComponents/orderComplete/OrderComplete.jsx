import "./OrderComplete.css"
import React from "react"
import { useTranslation } from "../../../hooks/useTranslation.jsx"

function OrderComplete({ orderNumber, setIsProfilePage }) {
  // useTranslation.jsx
  const { t } = useTranslation()

  function handleProfileRedirect() {
    setIsProfilePage(true)
  }

  return (
    <div className="cart dark:border-[#252525] dark:bg-[#252525]">
      <span className="cart__header">{t("orderCompleteNotification")}</span>

      <div className="order-complete">
        <div className="order-complete__no">
          <p className="dark:text-white">{`${t("orderCompleteOrderNumber")} ${orderNumber}. ${t("orderCompleteSeeProfile")}`}</p>
        </div>
        <div className="order-complete__account">
          <a onClick={handleProfileRedirect}>{t("orderCompleteProfile")}</a>
        </div>
      </div>
    </div>
  )
}

export default OrderComplete
