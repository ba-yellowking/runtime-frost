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
    <div className="cart-menu-container">
      <span className="cart-text">{t("orderCompleteNotification")}</span>

      <div className="final-container">
        <div className="final-left">
          <p>{`${t("orderCompleteOrderNumber")} ${orderNumber}. ${t("orderCompleteSeeProfile")}`}</p>
        </div>
        <div className="final-right">
          <a onClick={handleProfileRedirect}>{t("orderCompleteProfile")}</a>
        </div>
      </div>
    </div>
  )
}

export default OrderComplete
