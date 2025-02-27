import Modal from "../../../ui/modal/Modal.jsx"
import "./SignUpModal.css"
import React, { useState } from "react"
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard.jsx"
import axios from "axios"
import Spinner from "../../../ui/spinner/Spinner.jsx"
import { useDispatch, useSelector } from "react-redux"
import { signIn } from "../../../slices/authSlice.jsx"
import { setLoading } from "../../../slices/loadingSlice.jsx"
import { useTranslation } from "../../../hooks/useTranslation.jsx"

function SignUpModal({ isOpen, close, onClick, title, onClickLogIn, openEndRegistration }) {
  // useTranslation.jsx
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.loading.isLoading)

  // Состояния для имени, фамилии, почты, пароля и его подтверждения
  const [firstNameInput, setFirstNameInput] = useState("")
  const [lastNameInput, setLastNameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [passInput, setPassInput] = useState("")
  const [confirmPassInput, setConfirmPassInput] = useState("")

  // Состояние для уведомления об ошибке
  const [errorMessage, setErrorMessage] = useState({})

  const handleClick = function () {
    dispatch(setLoading(true))

    axios
      .post("https://frost.runtime.kz/api/registration", {
        first_name: firstNameInput,
        last_name: lastNameInput,
        email: emailInput,
        password: passInput,
      })

      .then(function (response) {
        console.log(response.data)
        dispatch(setLoading(false))
        close()
        openEndRegistration()
        dispatch(signIn(emailInput, passInput))
      })

      .catch(function (error) {
        const errors = error.response.data.errors

        // Если ошибка не найдена, errorMessage будет пустой строкой
        setErrorMessage({
          first_name: errors.first_name ? errors.first_name[0] : "",
          last_name: errors.last_name ? errors.last_name[0] : "",
          email: errors.email ? errors.email[0] : "",
          password: errors.password ? errors.password[0] : "",
        })

        dispatch(setLoading(false))
      })
  }

  // При отправке запроса необязательно использовать useEffect, поскольку здесь не нужны dependencies
  // Нам необходимо отправлять данные по клику на "Зарегистрироваться", поэтому axios необходимо прописать
  // в функции handleClick

  const handleFirstNameInput = function (content) {
    setFirstNameInput(content.target.value)
  }

  const handleLastNameInput = function (content) {
    setLastNameInput(content.target.value)
  }

  const handleEmailInput = function (content) {
    setEmailInput(content.target.value)
  }

  const handlePassInput = function (content) {
    setPassInput(content.target.value)
  }

  const handleConfirmPassInput = function (content) {
    setConfirmPassInput(content.target.value)
  }

  // Обновление формы регистрации при закрытии
  const resetForm = function () {
    setFirstNameInput("")
    setLastNameInput("")
    setEmailInput("")
    setPassInput("")
    setConfirmPassInput("")
  }

  const handleClose = function () {
    close()
    resetForm()
  }

  return (
    <div className="modal__container">
      <span className="modal__title dark:text-white" onClick={onClick}>
        {title}
      </span>

      <Modal open={isOpen} close={handleClose}>
        <div className="modal__header dark:bg-[#393939] dark:text-white">
          <p>{t("signUpCreate")}</p>
        </div>

        {isLoading ? (
          <div className="spinner-container">
            <div className="spinner-wrapper">
              <Spinner />
            </div>
          </div>
        ) : (
          <>
            <div className="modal__body dark:bg-[#252525]">
              <div className="modal__full-name">
                <div className="modal__first-name">
                  <div className="modal__signup--error">
                    <span>{errorMessage.first_name}</span>
                  </div>

                  <input
                    className={`modal__input firstNameLastName dark:border-[#393939] dark:bg-[#393939] dark:text-white`}
                    type="text"
                    value={firstNameInput}
                    onChange={handleFirstNameInput}
                    placeholder={t("signUpFirstName")}
                  />
                </div>

                <div className="modal__last-name">
                  <div className="modal__signup--error">
                    <span>{errorMessage.last_name}</span>
                  </div>

                  <input
                    className="modal__input firstNameLastName dark:border-[#393939] dark:bg-[#393939] dark:text-white"
                    type="text"
                    value={lastNameInput}
                    onChange={handleLastNameInput}
                    placeholder={t("signUpLastName")}
                  />
                </div>
              </div>

              <div className="modal__signup--error">
                <span>{errorMessage.email}</span>
              </div>

              <input
                className="modal__input dark:border-[#393939] dark:bg-[#393939] dark:text-white"
                type="email"
                value={emailInput}
                onChange={handleEmailInput}
                placeholder={t("signUpEmail")}
              />

              <div className="modal__signup--error">
                <span>{errorMessage.password}</span>
              </div>

              <input
                className="modal__input dark:border-[#393939] dark:bg-[#393939] dark:text-white"
                type="password"
                value={passInput}
                onChange={handlePassInput}
                placeholder={t("signUpPassword")}
              />

              <input
                className="modal__input dark:border-[#393939] dark:bg-[#393939] dark:text-white"
                type="password"
                value={confirmPassInput}
                onChange={handleConfirmPassInput}
                placeholder={t("signUpRepeatPassword")}
              />
            </div>

            <div className="modal__footer dark:bg-[#252525]">
              <ButtonStandard name="Зарегистрироваться" clickHandler={handleClick} className="signUpModal" />

              <span className="modal__signup dark:text-white">
                {t("signUpProfileExists")}{" "}
                <span className="modal__signup--link" onClick={onClickLogIn}>
                  {t("signUpSignIn")}
                </span>
              </span>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}

export default SignUpModal
