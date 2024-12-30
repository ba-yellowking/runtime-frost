import { createContext, useEffect, useState } from "react"

export const LocalizationContext = createContext()

export const LocalizationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("selectedLanguage") || "ru"
  })

  useEffect(() => {
    localStorage.setItem("selectedLanguage", currentLanguage)
  }, [currentLanguage])

  return (
    <LocalizationContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LocalizationContext.Provider>
  )
}
