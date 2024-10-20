import Modal from "../../../ui/modal/Modal.jsx";
import "./SignUpModal.css";
import {useContext, useState} from "react";
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard.jsx";
import axios from "axios";
import Spinner from "../../../ui/spinner/Spinner.jsx";
import {AuthContext} from "../../../contexts/AuthContextProvider.jsx";


function SignUpModal({ isOpen, close, onClick, title, style, onClickLogIn, openEndRegistration }) {


  const [, signIn, , ] = useContext(AuthContext);


  // Состояния для имени, фамилии, почты, пароля и его подтверждения
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [confirmPassInput, setConfirmPassInput] = useState("");


  // Состояние для загрузки <Spinner/>
  const [loading, setLoading] = useState(false);


  // Состояние для уведомления об ошибке
  const [errorMessage, setErrorMessage] = useState({});


  const handleClick = function() {
    setLoading(true);

    axios
      .post("https://frost.runtime.kz/api/registration", {
        first_name: firstNameInput,
        last_name: lastNameInput,
        email: emailInput,
        password: passInput,
      })

      .then(function(response) {
        console.log(response.data);
        setLoading(false);
        close();
        openEndRegistration();
        signIn(emailInput, passInput);
      })

      .catch(function (error) {
        const errors = error.response.data.errors;

        // Если ошибка не найдена, errorMessage будет пустой строкой
        setErrorMessage({
          first_name: errors.first_name ? errors.first_name[0] : "",
          last_name: errors.last_name ? errors.last_name[0] : "",
          email: errors.email ? errors.email[0] : "",
          password: errors.password ? errors.password[0] : "",
        });

        setLoading(false);
      });
  }


  // При отправке запроса необязательно использовать useEffect, поскольку здесь не нужны dependencies
  // Нам необходимо отправлять данные по клику на "Зарегистрироваться", поэтому axios необходимо прописать
  // в функции handleClick


  const handleFirstNameInput = function(content) {
    setFirstNameInput(content.target.value);
  }


  const handleLastNameInput = function(content) {
    setLastNameInput(content.target.value);
  }


  const handleEmailInput = function(content) {
    setEmailInput(content.target.value);
  }


  const handlePassInput = function(content) {
    setPassInput(content.target.value);
  }


  const handleConfirmPassInput = function(content) {
    setConfirmPassInput(content.target.value);
  }


  // Обновление формы регистрации при закрытии
  const resetForm = function() {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setPassInput("");
    setConfirmPassInput("");
  };

  const handleClose = function() {
    close();
    resetForm();
  };


  return (

    <div className="modal-container">

      <span className="modal-title" onClick={onClick}>
        {title}
      </span>

      <Modal open={isOpen} close={handleClose}>

        {loading ? (<Spinner/>) : (

          <>

            <div className="modal-content-top">
              <p>Создание учетной записи</p>
            </div>

            <div className="modal-content-center">

              <div className="authorization-full-name">

                <div className="authorization-first-name">

                  <div className="invalid">
                    <span>{errorMessage.first_name}</span>
                  </div>

                  <input
                    className="authorization-input"
                    type="text"
                    value={firstNameInput}
                    onChange={handleFirstNameInput}
                    placeholder="Имя"
                    style={style}
                  />

                </div>

                <div className="authorization-last-name">

                  <div className="invalid">
                    <span>{errorMessage.last_name}</span>
                  </div>

                  <input
                    className="authorization-input"
                    type="text"
                    value={lastNameInput}
                    onChange={handleLastNameInput}
                    placeholder="Фамилия"
                    style={style}
                  />

                </div>

              </div>

              <div className="invalid">
                <span>{errorMessage.email}</span>
              </div>

              <input
                className="authorization-input"
                type="email"
                value={emailInput}
                onChange={handleEmailInput}
                placeholder="Электронная почта"
              />

              <div className="invalid">
                <span>{errorMessage.password}</span>
              </div>

              <input
                className="authorization-input"
                type="password"
                value={passInput}
                onChange={handlePassInput}
                placeholder="Пароль"
              />

              <input
                className="authorization-input"
                type="password"
                value={confirmPassInput}
                onChange={handleConfirmPassInput}
                placeholder="Повторите пароль"
              />

            </div>

            <div className="modal-content-bottom">
              <ButtonStandard
                name="Зарегистрироваться"
                clickHandler={handleClick}
                style={{width: "400px", height: "40px", margin: "10px"}}
              />

              <span
                className="signin-signup"
                onClick={onClickLogIn}
              >
                Войти в существующую учетную запись
              </span>

            </div>
          </>
        )}

      </Modal>

    </div>
  )
}


export default SignUpModal;