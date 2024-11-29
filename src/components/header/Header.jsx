import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import useModal from "../../hooks/useModal.jsx";
import LogInModal from "../modals/logInModal/LogInModal.jsx";
import SignUpModal from "../modals/signUpModal/SignUpModal.jsx";
import cart from '../../images/cart.png';
import logout from '../../images/logout.png';
import {checkTokenAndGetUser, signOut} from "../../slices/authSlice.jsx";
import "./Header.css";

function Header({ openProfilePage }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const tokenInfo = useSelector((state) => state.auth.tokenInfo);
  const totalCount = useSelector((state) => state.counter.counter);
  const displayName = user ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) : "";

  const navigate = useNavigate();

  // Modal state hooks
  const [isOpenLogIn, openLogIn, closeLogIn] = useModal();
  const [isOpenSignUp, openSignUp, closeSignUp] = useModal();
  const [isOpenEndRegistration, openEndRegistration, closeEndRegistration] = useModal();

  // Transition between modals
  const goToSignUpFromLogIn = () => {
    openSignUp();
    closeLogIn();
  };

  const goToLogInFromSignUp = () => {
    openLogIn();
    closeSignUp();
  };

  // Updating redux state if "tokenInfo" is in local storage, but "user" is not set
  useEffect(() => {
    if (!user && tokenInfo) {
      dispatch(checkTokenAndGetUser());
      closeLogIn();
    }
  }, [dispatch, tokenInfo]);

  // Redirecting a user to main page after log out
  const handleSignOut = () => {
    navigate("/");
    dispatch(signOut());
  };

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
            <div className="header-right-username" onClick={openProfilePage}>
              {displayName}
            </div>

            <a
              href="/cart"
              className={totalCount > 0 ? "cart-page-active" : "cart-page"}
              data-count={totalCount > 0 ? totalCount : null}
            >
              <img className="cart-logo" src={cart} alt="cart-logo"/>
            </a>

            <div className="logout">
              <img className="logout-logo" src={logout} alt="logout-logo" onClick={handleSignOut}/>
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
                    onClickLogIn={goToLogInFromSignUp}
                    openEndRegistration={() => {
                      openEndRegistration();
                      setTimeout(() => {
                        closeEndRegistration();
                      }, 3000);
                    }}
                  />
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
