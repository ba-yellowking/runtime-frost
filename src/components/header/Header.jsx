import "./Header.css";
import useModal from "../../hooks/useModal.jsx";
import LogInModal from "../modals/logInModal/LogInModal.jsx";
import SignUpModal from "../modals/signUpModal/SignUpModal.jsx";
import EndRegistrationModal from "../modals/EndRegistrationModal.jsx";
import cart from '../../images/cart.png';
import logout from '../../images/logout.png';
import {checkTokenAndGetUser, signOut} from "../../slices/authSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

function Header({ openProfilePage }) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const tokenInfo = useSelector((state) => state.auth.tokenInfo);
  const totalCount = useSelector((state) => state.counter.counter);
  const displayName = user ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) : "";

  // Открыто ли модальное окно?
  const [isOpenLogIn, openLogIn, closeLogIn] = useModal();
  const [isOpenSignUp, openSignUp, closeSignUp] = useModal();
  const [isOpenEndRegistration, openEndRegistration, closeEndRegistration] = useModal();

  // Переход из <LogIn/> в <SignUp/>
  const goToSignUpFromLogIn = function() {
    openSignUp();
    closeLogIn();
  }

  // Переход из <SignUp/> в <LogIn/>
  const goToLogInFromSignUp = function() {
    openLogIn();
    closeSignUp();
  }

  // Updating redux state if "tokenInfo" is in local storage, but "user" is not set
  useEffect(function() {
    if (!user && tokenInfo) {
      dispatch(checkTokenAndGetUser());
      closeLogIn();
    }
  }, [dispatch, tokenInfo]);

  return (
    <div className="header-container">
      <div className="header-wrap">

        <div className="header-left">
          <a href="/">
            <img className="header-left-logo" src="/src/images/logo.png" alt="Logo"/>
          </a>
        </div>

        {user !== null && tokenInfo ? (
          <div className="header-right-profile">
            <div
              className="header-right-username"
              onClick={openProfilePage}
            >
              {displayName}
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
              <img className="logout-logo" src={logout} alt="cart-logo" onClick={() => dispatch(signOut())}/>
            </div>
          </div>
        ) : (
          <div className="header-right">
            {!tokenInfo ? (
              <>
                <div className="log-in-section">
                  <LogInModal
                    title="Войти"
                    onClick={openLogIn}
                    isOpen={isOpenLogIn}
                    close={closeLogIn}
                    goToSignUpFromLogIn={goToSignUpFromLogIn}
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
              </>
            ) : (
              <>
              </>
            )}
          </div>
        )}
      </div>

      <EndRegistrationModal
        isOpen={isOpenEndRegistration}
        close={closeEndRegistration}
        openLogIn={openLogIn}
      />
    </div>
  )
}

export default Header;