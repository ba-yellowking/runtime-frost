import Modal from "../../../ui/modal/Modal.jsx";
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard.jsx";
import "./ForgotPasswordModal.css";


function ForgotPasswordModal({ isOpen, close, goToSignUpFromForgotPassword, style }) {


  return (

    <div className="modal-container">

      <Modal
        open={isOpen}
        close={close}
      >

        <div className="modal-content-top">
          <span>Восстановление пароля</span>
        </div>

        <div className="modal-content-center">

          <span className="modal-content-center-text">
            Для получения нового пароля необходимо вписать
            в поле ниже адрес электронной почты, указанный при
            регистрации
          </span>

          <input
            className="authorization-input"
            type="text"
            // value={emailInput}
            // onChange={handleEmailInput}
            placeholder="Электронная почта"
          />

        </div>

        <div className="modal-content-bottom">
          <ButtonStandard
            name="Отправить подтверждение"
            style={style}
          />

          <span
            className="signin-signup"
            onClick={goToSignUpFromForgotPassword}
          >
            Создать новую учетную запись
          </span>
        </div>

      </Modal>

    </div>
  )
}


export default ForgotPasswordModal;