import { Outlet, useParams } from "react-router-dom"
import { useContext, useEffect } from "react"
import { LocalizationContext } from "./contexts/localizationContext/LocalizationContext"
import { APP_LOCALES } from "./locales/locales.jsx"

function App() {
  const { currentLanguage, setCurrentLanguage } = useContext(LocalizationContext)
  const { locale } = useParams()

  useEffect(() => {
    if (locale) {
      const validLocale = APP_LOCALES.find((lang) => lang.serviceName === locale)
      if (validLocale !== currentLanguage) {
        setCurrentLanguage(locale)
      }
    }
  }, [locale, currentLanguage, setCurrentLanguage])

  return (
    <>
      {/*Рендер дочерних компонентов children (см. main)*/}
      <Outlet />
    </>
  )
}

export default App
