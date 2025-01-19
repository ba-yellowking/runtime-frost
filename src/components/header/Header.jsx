import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import useModal from "../../hooks/useModal.jsx"
import LogInModal from "../modals/logInModal/LogInModal.jsx"
import SignUpModal from "../modals/signUpModal/SignUpModal.jsx"
import cart from "../../images/cart.png"
import logout from "../../images/logout.png"
import { checkTokenAndGetUser, signOut } from "../../slices/authSlice.jsx"
import "./Header.css"
import { toggleTheme } from "../../slices/themeSlice.jsx"
import LocaleDropdown from "../../ui/dropDown/LocaleDropdown.jsx"
import theme_sun from "../../images/theme_sun.png"
import theme_moon from "../../images/theme_moon.png"

function Header() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const tokenInfo = useSelector((state) => state.auth.tokenInfo)
  const totalCount = useSelector((state) => state.counter.counter)
  const displayName = user ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) : ""
  const navigate = useNavigate()

  // Modal state hooks
  const [isOpenLogIn, openLogIn, closeLogIn] = useModal()
  const [isOpenSignUp, openSignUp, closeSignUp] = useModal()
  const [isOpenEndRegistration, openEndRegistration, closeEndRegistration] = useModal()

  // Transition between modals
  const goToSignUpFromLogIn = () => {
    openSignUp()
    closeLogIn()
  }

  const goToLogInFromSignUp = () => {
    openLogIn()
    closeSignUp()
  }

  // Updating redux state if "tokenInfo" is in local storage, but "user" is not set
  useEffect(() => {
    if (!user && tokenInfo) {
      dispatch(checkTokenAndGetUser())
      closeLogIn()
    }
  }, [dispatch, tokenInfo])

  // Redirecting a user to main page after log out
  const handleSignOut = () => {
    navigate("/")
    dispatch(signOut())
  }

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  // Dark/light theme
  const theme = useSelector((state) => state.theme.theme)

  // Transition to cart
  const handleCartClick = () => {
    const path = `/cart`
    navigate(path)
  }

  return (
    <div className="header-container dark:border-b-[#222222] dark:bg-[#222222] dark:text-white">
      <div className="header-wrap">
        <div className="header-left">
          <a href={`/`}>
            {theme === "dark" ? (
              <img className="header-left-logo" src="/src/images/logo2.png" alt="Logo" />
            ) : (
              <img className="header-left-logo" src="/src/images/logo.png" alt="Logo" />
            )}
          </a>
        </div>

        {user !== null && tokenInfo ? (
          // Profile
          <div className="header-right-profile">
            <div className="header-right-username" onClick={() => navigate("/account")}>
              {displayName}
            </div>

            {/* Choose language */}
            <LocaleDropdown />

            {/*Dark or light theme*/}
            <div className="mx-[5px] h-[40px] w-[40px] cursor-pointer p-[10px]">
              <button onClick={handleToggle}>
                {theme === "dark" ? (
                  <img
                    className="h-[20px] w-[20px] rotate-0 transform invert transition-transform duration-300 ease-in-out"
                    src={theme_sun}
                    alt="sun icon"
                  />
                ) : (
                  <img
                    className="h-[20px] w-[20px] rotate-180 transform transition-transform duration-300 ease-in-out"
                    src={theme_moon}
                    alt="moon icon"
                  />
                )}
              </button>
            </div>

            {/*Cart*/}
            <div
              className={totalCount > 0 ? "cart-page-active" : "cart-page"}
              data-count={totalCount > 0 ? totalCount : null}
              onClick={handleCartClick}
            >
              <img className="cart-logo dark:invert" src={cart} alt="cart-logo" />
            </div>

            {/*Log out*/}
            <div className="logout dark:invert">
              <img className="logout-logo" src={logout} alt="logout-logo" onClick={handleSignOut} />
            </div>
          </div>
        ) : (
          // not authorized
          <div className="header-right">
            {!tokenInfo ? (
              <>
                <div className="mx-[5px] h-[40px] w-[40px] cursor-pointer p-[10px]">
                  <button onClick={handleToggle}>
                    {theme === "dark" ? (
                      <img
                        className="h-[20px] w-[20px] rotate-0 transform invert transition-transform duration-300 ease-in-out"
                        src="src/images/theme_sun.png"
                        alt="sun icon"
                      />
                    ) : (
                      <img
                        className="h-[20px] w-[20px] rotate-180 transform transition-transform duration-300 ease-in-out"
                        src="src/images/theme_moon.png"
                        alt="moon icon"
                      />
                    )}
                  </button>
                </div>

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
                      openEndRegistration()
                      setTimeout(() => {
                        closeEndRegistration()
                      }, 3000)
                    }}
                  />
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
