import Modal from "../../../ui/modal/Modal.jsx"
import "./LogInModal.css"
import React, { useState } from "react"
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard.jsx"
import { useDispatch, useSelector } from "react-redux"
import { signIn } from "../../../slices/authSlice.jsx"
import Spinner from "../../../ui/spinner/Spinner.jsx"
import { setLoading } from "../../../slices/loadingSlice.jsx"
import { useTranslation } from "../../../hooks/useTranslation.jsx"
import { useMediaQuery } from "react-responsive"
import loginSvg from "/src/images/login.svg"

function LogInModal({ isOpen, close, onClick, title, goToSignUpFromLogIn }) {
  // useTranslation.jsx
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.loading.isLoading)

  // States for login.svg and password
  const [emailInput, setEmailInput] = useState("")
  const [passInput, setPassInput] = useState("")

  // Errors for wrong login.svg and password
  const [errorLogin, setErrorLogin] = useState("")
  const [errorPassword, setErrorPassword] = useState("")

  // Email (login.svg)
  const handleEmailInput = function (content) {
    setEmailInput(content.target.value)
  }

  // Password
  const handlePassInput = function (content) {
    setPassInput(content.target.value)
  }

  const handleClick = function () {
    dispatch(setLoading(true))
    dispatch(signIn(emailInput, passInput))
      .then(function () {
        dispatch(setLoading(false))
      })
      .catch(function () {
        dispatch(setLoading(false))
        setErrorLogin(t("loginInvalidEmail"))
        setErrorPassword(t("loginInvalidPassword"))
      })
  }

  // Reseting inputs when closed
  const resetForm = function () {
    setEmailInput("")
    setPassInput("")
  }

  const handleClose = function () {
    close()
    resetForm()
  }

  // React-responsive
  const responsiveMobile = useMediaQuery({ maxWidth: 640 })

  return (
    <>
      <span className="modal__title dark:text-white" onClick={onClick}>
        {responsiveMobile ? <img className="header__login--icon dark:invert" src={loginSvg} alt="login icon" /> : title}
      </span>

      <Modal open={isOpen} close={handleClose}>
        <div className="modal__header dark:bg-[#393939]">
          <p className="dark:text-white">{t("loginSignIn")}</p>
        </div>

        {isLoading ? (
          <div className="spinner-container">
            <div className="spinner-container__wrap">
              <Spinner />
            </div>
          </div>
        ) : (
          <div className="modal__body dark:bg-[#252525]">
            {errorLogin && <div className="modal__error">{errorLogin}</div>}

            <input
              className="modal__input dark:border-[#393939] dark:bg-[#393939] dark:text-white"
              type="text"
              value={emailInput}
              onChange={handleEmailInput}
              placeholder={t("loginEmail")}
            />

            {errorPassword && <div className="modal__error">{errorPassword}</div>}

            <input
              className="modal__input dark:border-[#393939] dark:bg-[#393939] dark:text-white"
              type="password"
              value={passInput}
              onChange={handlePassInput}
              placeholder={t("loginPassword")}
            />
          </div>
        )}

        <div className="modal__footer dark:bg-[#252525]">
          <ButtonStandard name={t("loginSignInButton")} className="logInModal" clickHandler={handleClick} />

          <span className="modal__signup dark:text-white">
            {t("loginNoProfile")}{" "}
            <span className="modal__signup--link" onClick={goToSignUpFromLogIn}>
              {t("loginSignUp")}
            </span>
          </span>
        </div>
      </Modal>
    </>
  )
}

export default LogInModal
