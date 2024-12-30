import "./ContactDetails.css"
import React, { useEffect, useState } from "react"
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard.jsx"
import InputMask from "react-input-mask"
import { useSelector } from "react-redux"
import { useTranslation } from "../../../hooks/useTranslation.jsx"

function ContactDetails({ setCurrentComponent, ordersData, setOrdersData }) {
  const user = useSelector((state) => state.auth.user)
  const [errorPhone, setErrorPhone] = useState("")

  // useTranslation.jsx
  const { t } = useTranslation()

  function onChangePhoneNumber(event) {
    setOrdersData({
      ...ordersData,
      phone: event.target.value,
    })
  }

  // Проверка на заполнение телефонной строки
  function isPhoneComplete(phone) {
    return phone.length === 16
  }

  function proceed() {
    if (isPhoneComplete(ordersData.phone)) {
      setCurrentComponent("delivery")
    } else {
      setErrorPhone(t("contactsPhone"))
    }
  }

  return (
    <div className="cart-menu-container">
      <span className="cart-text">{t("contactsDetails")}</span>

      <div className="contacts-container">
        <div className="contacts-container-left">
          <p className="contacts-text">{t("contactsLastName")}</p>

          <input
            className="contacts-last-name contacts-style"
            type="text"
            // defaultValue вместо Value
            defaultValue={user.lastName}
          />

          <p className="contacts-text">{t("contactsFirstName")}</p>
          <input className="contacts-first-name contacts-style" type="text" defaultValue={user.firstName} />

          <p className="contacts-text">
            {t("contactsPatronym")} <span className="optional-text">{t("contactsOptional")}</span>
          </p>
          <input className="contacts-patronymic contacts-style" type="text" />

          {/*InputMask для номера телефона*/}
          {errorPhone ? (
            <>
              <p className="error-message">{t("contactsPhone")}</p>
              <InputMask
                mask="+7 999 999 99 99"
                value={ordersData.phone}
                onChange={onChangePhoneNumber}
                className="contacts-phone contacts-style"
                maskChar={null}
                placeholder="+7"
              >
                {(inputProps) => <input {...inputProps} type="text" />}
              </InputMask>
            </>
          ) : (
            <>
              <InputMask
                mask="+7 999 999 99 99"
                value={ordersData.phone}
                onChange={onChangePhoneNumber}
                className="contacts-phone contacts-style"
                maskChar={null}
                placeholder="+7"
              >
                {(inputProps) => <input {...inputProps} type="text" />}
              </InputMask>
            </>
          )}
        </div>

        <div className="contacts-container-right">
          <p className="contacts-text">{t("contactsEmail")}</p>

          <input className="contacts-email contacts-style" type="text" defaultValue={user.email} />

          {user ? (
            <>
              <p className="contacts-text-disabled">{t("contactsPassword")}</p>
              <input className="contacts-password contacts-style" type="text" disabled />

              <p className="contacts-text-disabled">{t("contactsRepeatPassword")}</p>
              <input className="contacts-confirm-password contacts-style" type="text" disabled />
            </>
          ) : (
            <>
              <p className="contacts-text">{t("contactsPassword")}</p>
              <input className="contacts-password contacts-style" type="text" />

              <p className="contacts-text">{t("contactsRepeatPassword")}</p>
              <input className="contacts-confirm-password contacts-style" type="text" />
            </>
          )}
          <div className="contacts-button-container">
            <ButtonStandard name={t("confirmButton")} className="contactsCartComponent" clickHandler={proceed} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactDetails
