import "./OrderComplete.css";
import React from "react";

function OrderComplete({ orderNumber, setIsProfilePage }) {

  function handleProfileRedirect() {
    setIsProfilePage(true);
  }

  return (
    <div className="cart-menu-container">

      <span className="cart-text">
        Заказ успешно создан
      </span>

      <div className="final-container">
        <div className="final-left">
          <p>{`Номер Вашего заказа: ${orderNumber}. Список Ваших заказов указан в личном кабинете.`}</p>
        </div>
        <div className="final-right">
          <a onClick={handleProfileRedirect}>Перейти в личный кабинет</a>
        </div>
      </div>

    </div>
  )
}

export default OrderComplete;