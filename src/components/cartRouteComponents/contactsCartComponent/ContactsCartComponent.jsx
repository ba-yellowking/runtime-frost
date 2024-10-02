import "./ContactsCartComponent.css";
import {AuthContext} from "../../../contexts/AuthContextProvider.jsx";
import React, {useContext, useState} from "react";
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard.jsx";
import InputMask from 'react-input-mask';


function ContactsCartComponent({ setCurrentComponent, ordersData, setOrdersData }) {


  const [user, , , , ,] = useContext(AuthContext);
  const [errorPhone, setErrorPhone] = useState("");


  function onChangePhoneNumber(event) {
    setOrdersData({
      ...ordersData,
      phone: event.target.value
    });
  }


  // Проверка на заполнение телефонной строки
  function isPhoneComplete(phone) {
    return phone.length === 16;
  }


  function proceed() {
    if (isPhoneComplete(ordersData.phone)) {
      setCurrentComponent("delivery");
    } else {
      setErrorPhone("Введите номер телефона");
    }
  }


  return (

    <div className="cart-menu-container">

      <span className="cart-text">
        Контактные данные
      </span>

      <div className="contacts-container">

        <div className="contacts-container-left">

          <p className="contacts-text">Фамилия</p>
          {/*Input value всегда сопровождается onChange*/}
          <input
            className="contacts-last-name contacts-style"
            type="text"
            // defaultValue вместо Value
            defaultValue={user.lastName}
          />

          <p className="contacts-text">Имя</p>
          <input
            className="contacts-first-name contacts-style"
            type="text"
            defaultValue={user.firstName}
          />

          <p className="contacts-text">Отчество <span className="optional-text">(необязательно)</span></p>
          <input
            className="contacts-patronymic contacts-style"
            type="text"
          />


          {/*InputMask для номера телефона*/}
          {errorPhone ? (
            <>
              <p className="error-message">{errorPhone}</p>
              <InputMask
                mask="+7 999 999 99 99"
                value={ordersData.phone}
                onChange={onChangePhoneNumber}
                className="contacts-phone contacts-style"
                maskChar={null}
                placeholder="+7"
              >
                {(inputProps) => <input {...inputProps} type="text"/>}
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
                {(inputProps) => <input {...inputProps} type="text"/>}
              </InputMask>
            </>
          )}

        </div>


        <div className="divider"></div>


        <div className="contacts-container-right">

          <p className="contacts-text">Электронная почта</p>
          <input
            className="contacts-email contacts-style"
            type="text"
            defaultValue={user.email}
          />

          {user ? (
            <>
              <p className="contacts-text-disabled">Пароль</p>
              <input
                className="contacts-password contacts-style"
                type="text"
                disabled
              />

              <p className="contacts-text-disabled">Повторите пароль</p>
              <input
                className="contacts-confirm-password contacts-style"
                type="text"
                disabled
              />
            </>

          ) : (
            <>
              <p className="contacts-text">Пароль</p>
              <input
                className="contacts-password contacts-style"
                type="text"
              />

              <p className="contacts-text">Повторите пароль</p>
              <input
                className="contacts-confirm-password contacts-style"
                type="text"
              />
            </>
          )}

          <div className="contacts-button-container">
            <ButtonStandard
              name="Подтвердить"
              style={{marginTop: "26px", width: "200px"}}
              clickHandler={proceed}
            />
          </div>

        </div>
      </div>
    </div>
  )
}


export default ContactsCartComponent;