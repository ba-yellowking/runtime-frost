import "./DeliveryDetails.css"
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard.jsx"
import axios from "axios"
import { useTranslation } from "../../../hooks/useTranslation.jsx"

function DeliveryDetails({
  setCurrentComponent,
  ordersData,
  setOrdersData,
  setOrderNumber,
  setErrorMessages,
  errorMessages,
}) {
  // Поле ввода для области
  function onChangeArea(event) {
    setOrdersData({
      // Создание копии объекта, в противном случае каждый event.target.value будет перезаписывать объект
      ...ordersData,
      area: event.target.value,
    })
  }

  // Поле ввода для города
  function onChangeCity(event) {
    setOrdersData({
      ...ordersData,
      city: event.target.value,
    })
  }

  // Поле ввода для улицы
  function onChangeStreet(event) {
    setOrdersData({
      ...ordersData,
      street: event.target.value,
    })
  }

  // Поле ввода для дома
  function onChangeHouse(event) {
    setOrdersData({
      ...ordersData,
      house: event.target.value,
    })
  }

  // Поле ввода для квартиры
  function onChangeApartment(event) {
    setOrdersData({
      ...ordersData,
      apartment: event.target.value,
    })
  }

  // Запрос на получение номера заказа
  function submitDelivery() {
    axios
      .post("https://frost.runtime.kz/api/orders", ordersData)
      .then(function (response) {
        setOrderNumber(response.data)
        setCurrentComponent("final")
      })
      .catch(function (error) {
        const errors = error.response.data.errors
        setErrorMessages({
          apartment: errors.apartment ? errors.apartment[0] : "",
          area: errors.area ? errors.area[0] : "",
          city: errors.city ? errors.city[0] : "",
          house: errors.house ? errors.house[0] : "",
          phone: errors.phone ? errors.phone[0] : "",
          street: errors.street ? errors.street[0] : "",
        })
      })
  }

  function proceed() {
    submitDelivery()
  }

  // useTranslation.jsx
  const { t } = useTranslation()

  return (
    <div className="cart-menu-container dark:border-[#252525] dark:bg-[#252525]">
      <span className="cart-text">{t("deliveryDetails")}</span>

      <div className="delivery-container">
        <div className="delivery-container-left">
          {errorMessages.area ? (
            <p className="error-message">{errorMessages.area}</p>
          ) : (
            <p className="delivery-text dark:text-white">{t("deliveryRegion")}</p>
          )}
          <input
            className="delivery-area contacts-style dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            value={ordersData.area}
            onChange={onChangeArea}
          />

          {errorMessages.city ? (
            <p className="error-message">{errorMessages.city}</p>
          ) : (
            <p className="delivery-text dark:text-white">{t("deliveryCity")}</p>
          )}
          <input
            className="delivery-city contacts-style dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            value={ordersData.city}
            onChange={onChangeCity}
          />
        </div>

        <div className="delivery-container-right">
          {errorMessages.street ? (
            <p className="error-message">{errorMessages.street}</p>
          ) : (
            <p className="delivery-text dark:text-white">{t("deliveryStreet")}</p>
          )}
          <input
            className="delivery-street contacts-style dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            value={ordersData.street}
            onChange={onChangeStreet}
          />

          <div className="house-apartment">
            <div className="house">
              {errorMessages.house ? (
                <p className="error-message">{errorMessages.house}</p>
              ) : (
                <p className="delivery-text dark:text-white">{t("deliveryHouse")}</p>
              )}
              <input
                className="delivery-house ha-style dark:border-[#393939] dark:bg-[#393939]"
                type="text"
                value={ordersData.house}
                onChange={onChangeHouse}
              />
            </div>

            <div className="apartment">
              {errorMessages.apartment ? (
                <p className="error-message">{errorMessages.apartment}</p>
              ) : (
                <p className="delivery-text dark:text-white">{t("deliveryApartment")}</p>
              )}
              <input
                className="delivery-apt ha-style dark:border-[#393939] dark:bg-[#393939]"
                type="text"
                value={ordersData.apartment}
                onChange={onChangeApartment}
              />
            </div>
          </div>

          <div className="delivery-button-container">
            <ButtonStandard name={t("confirmButton")} className="deliveryComponent" clickHandler={proceed} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryDetails
