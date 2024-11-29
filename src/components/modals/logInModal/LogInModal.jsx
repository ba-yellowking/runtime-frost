import Modal from "../../../ui/modal/Modal.jsx";
import "./LogInModal.css";
import React, {useState} from "react";
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../../slices/authSlice.jsx";
import Spinner from "../../../ui/spinner/Spinner.jsx";
import {setLoading} from "../../../slices/loadingSlice.jsx";

function LogInModal({ isOpen, close, onClick, title, goToSignUpFromLogIn }) {

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loading.isLoading);

  // States for login and password
  const[emailInput, setEmailInput] = useState("");
  const[passInput, setPassInput] = useState("");

  // Errors for wrong login and password
  const [errorLogin, setErrorLogin] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  // Email (login)
  const handleEmailInput = function(content) {
    setEmailInput(content.target.value);
  }

  // Password
  const handlePassInput = function(content) {
    setPassInput(content.target.value);
  }

  const handleClick = function() {
    dispatch(setLoading(true))
    dispatch(signIn(emailInput, passInput))
      .then(function () {
        dispatch(setLoading(false));
      })
      .catch(function () {
        dispatch(setLoading(false));
        setErrorLogin("Неверно введена почта")
        setErrorPassword("Неверно введен пароль")
      });
  }

  // Reseting inputs when closed
  const resetForm = function() {
    setEmailInput("");
    setPassInput("");
  }

  const handleClose = function() {
    close();
    resetForm();
  }

  return (
    <div className="modal-container">
      <span className="modal-title" onClick={onClick}>{title}</span>

      <Modal open={isOpen} close={handleClose}>
        <div className="modal-content-top">
          <p>Вход в учетную запись</p>
        </div>

        {isLoading ? (
          <div className="spinner-container">
            <div className="spinner-wrapper">
              <Spinner/>
            </div>
          </div>
        ) : (
          <div className="modal-content-center">

            {errorLogin && (
              <div className="error-container">
                {errorLogin}
              </div>
            )}

            <input
              // className={`authorization-input ${errorLogin ? 'error' : ''}`}
              className="authorization-input"
              type="text"
              value={emailInput}
              onChange={handleEmailInput}
              placeholder={"Электронная почта"}
            />

            {errorPassword && (
              <div className="error-container">
                {errorPassword}
              </div>
            )}

            <input
              // className={`authorization-input ${errorPassword ? 'error' : ''}`}
              className="authorization-input"
              type="password"
              value={passInput}
              onChange={handlePassInput}
              placeholder={"Пароль"}
            />
          </div>
        )}

        <div className="modal-content-bottom">
          <ButtonStandard
            name="Войти в учетную запись"
            className="logInModal"
            clickHandler={handleClick}
          />

          <span className="signin-signup">
            Нет учетной записи? <span className="signin-signup-style" onClick={goToSignUpFromLogIn}>Зарегистрироваться</span>
          </span>
        </div>
      </Modal>
    </div>
  )
}

export default LogInModal;