import Modal from "../../../ui/modal/Modal.jsx";
import "./LogInModal.css";
import {useContext, useState} from "react";
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard.jsx";
import {AuthContext} from "../../../contexts/AuthContextProvider.jsx";
import Spinner from "../../../ui/spinner/Spinner.jsx";


function LogInModal({ isOpen, close, onClick, title, goToSignUpFromLogIn, goToForgotPassword }) {


  // AuthContext
  const [, signIn, , loading] = useContext(AuthContext);


  const handleClick = function() {
    signIn(emailInput, passInput);
  }


  // Обновление формы авторизации при закрытии
  const resetForm = function() {
    setEmailInput("");
    setPassInput("");
  }


  const handleClose = function() {
    close();
    resetForm();
  }


  // Состояние для почты и пароля
  const[emailInput, setEmailInput] = useState("");
  const[passInput, setPassInput] = useState("");


  // Текст пользователя для почты
  const handleEmailInput = function(content) {
    setEmailInput(content.target.value);
  }


  // Текст пользователя для пароля
  const handlePassInput = function(content) {
    setPassInput(content.target.value);
  }


  return (

    <div className="modal-container">

      <span className="modal-title" onClick={onClick}>
        {title}
      </span>

      <Modal open={isOpen} close={handleClose}>

        <div className="modal-content-top">
          <p>Вход в учетную запись</p>
        </div>

        <div className="modal-content-center">

          {loading ? (<Spinner/>) : (
            <>

              <input
                className="authorization-input"
                type="text"
                value={emailInput}
                onChange={handleEmailInput}
                placeholder="Электронная почта"
              />

              <input
                className="authorization-input"
                type="password"
                value={passInput}
                onChange={handlePassInput}
                placeholder="Пароль"
              />

              <div className="forgot-password-wrap">
                <span
                  className="forgot-password-text"
                  onClick={goToForgotPassword}
                >
                  Забыли пароль?
                </span>
              </div>

            </>
          )}

        </div>

        <div className="modal-content-bottom">

          <ButtonStandard
            name="Войти"
            style={{width: "400px", height: "40px", margin: "10px"}}
            // AuthContext
            clickHandler={handleClick}
          />

          <span className="signin-signup" onClick={goToSignUpFromLogIn}>
            Создать новую учетную запись
          </span>

        </div>
      </Modal>
    </div>
  )
}


export default LogInModal;