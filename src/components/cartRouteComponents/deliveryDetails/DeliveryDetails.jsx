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
    <div className="cart dark:border-[#252525] dark:bg-[#252525]">
      <span className="cart__header">{t("deliveryDetails")}</span>

      <div className="delivery__body">
        <div>
          {errorMessages.area ? (
            <p className="cart-error">{errorMessages.area}</p>
          ) : (
            <p className="delivery__label dark:text-white">{t("deliveryRegion")}</p>
          )}
          <input
            className="cart__input dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            value={ordersData.area}
            onChange={onChangeArea}
          />

          {errorMessages.city ? (
            <p className="cart-error">{errorMessages.city}</p>
          ) : (
            <p className="delivery__label dark:text-white">{t("deliveryCity")}</p>
          )}
          <input
            className="cart__input dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            value={ordersData.city}
            onChange={onChangeCity}
          />
        </div>

        <div>
          {errorMessages.street ? (
            <p className="cart-error">{errorMessages.street}</p>
          ) : (
            <p className="delivery__label dark:text-white">{t("deliveryStreet")}</p>
          )}
          <input
            className="cart__input dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            value={ordersData.street}
            onChange={onChangeStreet}
          />

          <div className="delivery__address-details">
            <div>
              {errorMessages.house ? (
                <p className="cart-error">{errorMessages.house}</p>
              ) : (
                <p className="delivery__label dark:text-white">{t("deliveryHouse")}</p>
              )}
              <input
                className="delivery__address-details--style dark:border-[#393939] dark:bg-[#393939]"
                type="text"
                value={ordersData.house}
                onChange={onChangeHouse}
              />
            </div>

            <div>
              {errorMessages.apartment ? (
                <p className="cart-error">{errorMessages.apartment}</p>
              ) : (
                <p className="delivery__label dark:text-white">{t("deliveryApartment")}</p>
              )}
              <input
                className="delivery__address-details--style dark:border-[#393939] dark:bg-[#393939]"
                type="text"
                value={ordersData.apartment}
                onChange={onChangeApartment}
              />
            </div>
          </div>

          <div className="cart-details__button">
            <ButtonStandard name={t("confirmButton")} className="deliveryComponent" clickHandler={proceed} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryDetails
