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
import main_logo from "../../images/logo.png"
import main_logo_dark from "../../images/logo2.png"
import { useTranslation } from "../../hooks/useTranslation.jsx"

function Header() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const tokenInfo = useSelector((state) => state.auth.tokenInfo)
  const totalCount = useSelector((state) => state.counter.counter)
  const displayName = user ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) : ""
  const navigate = useNavigate()

  const { t } = useTranslation()

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
    <div className="header dark:border-b-[#222222] dark:bg-[#222222] dark:text-white">
      <div className="header__wrap">
        <div className="header__logo-container">
          <a href={`/`}>
            {theme === "dark" ? (
              <img className="header__logo" src={main_logo_dark} alt="Logo" />
            ) : (
              <img className="header__logo" src={main_logo} alt="Logo" />
            )}
          </a>
        </div>

        {user !== null && tokenInfo ? (
          // Profile
          <div className="header__dash">
            <div className="header__username" onClick={() => navigate("/account")}>
              {displayName}
            </div>

            {/* Choose language */}
            <LocaleDropdown />

            {/*Dark or light theme*/}
            <div className="mx-[5px] h-[40px] w-[40px] cursor-pointer p-[10px]">
              <button onClick={handleToggle}>
                {theme === "dark" ? (
                  <svg className="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M12 2v1m0 18v1m10-10h-1M3 12H2m17.07-7.07l-.392.393M5.322 18.678l-.393.393m14.141-.001l-.392-.393M5.322 5.322l-.393-.393M6.341 10A6 6 0 1 0 10 6.341"/>
                  </svg>
                ) : (
                  <svg className="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m21.067 11.857l-.642-.388zm-8.924-8.924l-.388-.642zm-4.767 17.08a.75.75 0 1 0-.752 1.298zm-4.687-2.638a.75.75 0 1 0 1.298-.75zM21.25 12A9.25 9.25 0 0 1 12 21.25v1.5c5.937 0 10.75-4.813 10.75-10.75zm-18.5 0A9.25 9.25 0 0 1 12 2.75v-1.5C6.063 1.25 1.25 6.063 1.25 12zm12.75 2.25A5.75 5.75 0 0 1 9.75 8.5h-1.5a7.25 7.25 0 0 0 7.25 7.25zm4.925-2.781A5.75 5.75 0 0 1 15.5 14.25v1.5a7.25 7.25 0 0 0 6.21-3.505zM9.75 8.5a5.75 5.75 0 0 1 2.781-4.925l-.776-1.284A7.25 7.25 0 0 0 8.25 8.5zM12 2.75a.38.38 0 0 1-.268-.118a.3.3 0 0 1-.082-.155c-.004-.031-.002-.121.105-.186l.776 1.284c.503-.304.665-.861.606-1.299c-.062-.455-.42-1.026-1.137-1.026zm9.71 9.495c-.066.107-.156.109-.187.105a.3.3 0 0 1-.155-.082a.38.38 0 0 1-.118-.268h1.5c0-.717-.571-1.075-1.026-1.137c-.438-.059-.995.103-1.299.606zM12 21.25a9.2 9.2 0 0 1-4.624-1.237l-.752 1.298A10.7 10.7 0 0 0 12 22.75zm-8.013-4.625A9.2 9.2 0 0 1 2.75 12h-1.5a10.7 10.7 0 0 0 1.439 5.375z"/>
                  </svg>
                )}
              </button>
            </div>

            {/*Cart*/}
            <div
              className={totalCount > 0 ? "cart-page-active" : "cart-page"}
              data-count={totalCount > 0 ? totalCount : null}
              onClick={handleCartClick}
            >
              <img className="header__cart-icon dark:invert" src={cart} alt="Cart icon" />
            </div>

            {/*Log out*/}
            <div className="header__logout dark:invert">
              <img className="header__logout-icon" src={logout} alt="logout icon" onClick={handleSignOut} />
            </div>
          </div>
        ) : (
          // not authorized
          <div className="header__authorization">
            {!tokenInfo ? (
              <>
                <LocaleDropdown />

                <div className="mx-[5px] h-[40px] w-[40px] cursor-pointer p-[10px]">
                  <button onClick={handleToggle}>
                    {theme === "dark" ? (
                      <svg className="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M12 2v1m0 18v1m10-10h-1M3 12H2m17.07-7.07l-.392.393M5.322 18.678l-.393.393m14.141-.001l-.392-.393M5.322 5.322l-.393-.393M6.341 10A6 6 0 1 0 10 6.341"/>
                      </svg>
                    ) : (
                      <svg className="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m21.067 11.857l-.642-.388zm-8.924-8.924l-.388-.642zm-4.767 17.08a.75.75 0 1 0-.752 1.298zm-4.687-2.638a.75.75 0 1 0 1.298-.75zM21.25 12A9.25 9.25 0 0 1 12 21.25v1.5c5.937 0 10.75-4.813 10.75-10.75zm-18.5 0A9.25 9.25 0 0 1 12 2.75v-1.5C6.063 1.25 1.25 6.063 1.25 12zm12.75 2.25A5.75 5.75 0 0 1 9.75 8.5h-1.5a7.25 7.25 0 0 0 7.25 7.25zm4.925-2.781A5.75 5.75 0 0 1 15.5 14.25v1.5a7.25 7.25 0 0 0 6.21-3.505zM9.75 8.5a5.75 5.75 0 0 1 2.781-4.925l-.776-1.284A7.25 7.25 0 0 0 8.25 8.5zM12 2.75a.38.38 0 0 1-.268-.118a.3.3 0 0 1-.082-.155c-.004-.031-.002-.121.105-.186l.776 1.284c.503-.304.665-.861.606-1.299c-.062-.455-.42-1.026-1.137-1.026zm9.71 9.495c-.066.107-.156.109-.187.105a.3.3 0 0 1-.155-.082a.38.38 0 0 1-.118-.268h1.5c0-.717-.571-1.075-1.026-1.137c-.438-.059-.995.103-1.299.606zM12 21.25a9.2 9.2 0 0 1-4.624-1.237l-.752 1.298A10.7 10.7 0 0 0 12 22.75zm-8.013-4.625A9.2 9.2 0 0 1 2.75 12h-1.5a10.7 10.7 0 0 0 1.439 5.375z"/>
                      </svg>
                    )}
                  </button>
                </div>

                <div className="header__login">
                  <LogInModal
                    title={t("loginSignUp")}
                    onClick={openLogIn}
                    isOpen={isOpenLogIn}
                    close={closeLogIn}
                    goToSignUpFromLogIn={goToSignUpFromLogIn}
                  />
                </div>

                <div className="header__signup">
                  <SignUpModal
                    // title="Регистрация"
                    title={t("signUpSignIn")}
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
