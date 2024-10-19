import Modal from "../../../ui/modal/Modal.jsx";
import "./LogInModal.css";
import {useState} from "react";
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard.jsx";
import {useDispatch} from "react-redux";
import {signIn} from "../../../slices/authSlice.jsx";

function LogInModal({ isOpen, close, onClick, title, goToSignUpFromLogIn }) {

  const dispatch = useDispatch();

  // Состояние для почты и пароля
  const[emailInput, setEmailInput] = useState("");
  const[passInput, setPassInput] = useState("");

  // Почта для авторизации
  const handleEmailInput = function(content) {
    setEmailInput(content.target.value);
  }

  // Пароль для авторизации
  const handlePassInput = function(content) {
    setPassInput(content.target.value);
  }

  const handleClick = function() {
    dispatch(signIn(emailInput, passInput))
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

  return (
    <div className="modal-container">
      <span className="modal-title" onClick={onClick}>{title}</span>

      <Modal open={isOpen} close={handleClose}>
        <div className="modal-content-top">
          <p>Вход в учетную запись</p>
        </div>

        <div className="modal-content-center">
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
        </div>

        <div className="modal-content-bottom">
          <ButtonStandard
            name="Войти"
            style={{width: "400px", height: "40px", margin: "10px"}}
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