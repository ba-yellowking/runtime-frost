import "./Header.css";
import useModal from "../../hooks/useModal.jsx";
import LogInModal from "../modals/logInModal/LogInModal.jsx";
import SignUpModal from "../modals/signUpModal/SignUpModal.jsx";
import ForgotPasswordModal from "../modals/forgotPasswordModal/ForgotPasswordModal.jsx";
import EndRegistrationModal from "../modals/endRegistrationModal/EndRegistrationModal.jsx";
import {AuthContext} from "../../contexts/AuthContextProvider.jsx";
import {useContext} from "react";
import cart from './images/cart.png';
import logout from './images/logout.png';


function Header({ openProfilePage, totalCount }) {


  // AuthContext
  const [user, , signOut, loading, ] = useContext(AuthContext);

  // Открыто ли модальное окно?
  const [isOpenLogIn, openLogIn, closeLogIn] = useModal();
  const [isOpenSignUp, openSignUp, closeSignUp] = useModal();
  const [isOpenForgotPassword, openForgotPassword, closeForgotPassword] = useModal();
  const [isOpenEndRegistration, openEndRegistration, closeEndRegistration] = useModal();


  // Переход из <LogIn/> в <SignUp/>
  const goToSignUpFromLogIn = function() {
    openSignUp();
    closeLogIn();
  }

  // Переход из <SignUp/> в <ForgotPassword/>
  const goToSignUpFromForgotPassword = function() {
    openSignUp();
    closeForgotPassword();
  }

  // Переход в <ForgotPassword/>
  const goToForgotPassword = function() {
    openForgotPassword();
    closeLogIn();
  }

  // Переход из <SignUp/> в <LogIn/>
  const goToLogInFromSignUp = function() {
    openLogIn();
    closeSignUp();
  }


  return (

    <div className="header-container">

      <div className="header-wrap">

        <div className="header-left">
          <a href="/">
            <img className="header-left-logo" src="/src/components/header/images/logo.png" alt="Logo"/>
          </a>
        </div>


        {user ? (
          <div className="header-right-profile">

            <div
              className="header-right-username"
              onClick={openProfilePage}
            >
              {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
            </div>

            <a
              href="/cart"
              className={totalCount > 0 ? "cart-page-active" : "cart-page"}
              // content: attr(data-count) (см. css)
              data-count={totalCount > 0 ? totalCount : null}
            >
              <img className="cart-logo" src={cart} alt="cart-logo"/>
            </a>

            <div className="logout">
              <img className="logout-logo" src={logout} alt="cart-logo" onClick={signOut}/>
            </div>

          </div>
        ) : (
          <div className="header-right">

            <div className="log-in-section">

              <LogInModal
                title="Войти"
                onClick={openLogIn}
                isOpen={isOpenLogIn}
                close={closeLogIn}
                goToSignUpFromLogIn={goToSignUpFromLogIn}
                goToForgotPassword={goToForgotPassword}
              />

            </div>

            <div className="sign-up-section">

              <SignUpModal
                title="Регистрация"
                onClick={openSignUp}
                isOpen={isOpenSignUp}
                close={closeSignUp}
                style={{width: "195px"}}
                onClickLogIn={goToLogInFromSignUp}

                // Закрытие моального окна через 5 сек
                openEndRegistration={function () {
                  openEndRegistration()
                  setTimeout(function () {
                    closeEndRegistration()
                  }, 3_000)
                }}
              />

            </div>

            {/*<a href="/cart" className="cart-page">*/}
            {/*  <span>Корзина</span>*/}
            {/*</a>*/}

          </div>
        )}

      </div>

      <ForgotPasswordModal
        isOpen={isOpenForgotPassword}
        close={closeForgotPassword}
        goToSignUpFromForgotPassword={goToSignUpFromForgotPassword}
        style={{width: "400px", height: "40px"}}
      />

      <EndRegistrationModal
        isOpen={isOpenEndRegistration}
        close={closeEndRegistration}
        openLogIn={openLogIn}
      />

    </div>
  )
}


export default Header;