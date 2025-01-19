import { createContext, useEffect, useState, startTransition } from "react"

export const LocalizationContext = createContext()

export const LocalizationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("selectedLanguage") || "ru"
  })

  useEffect(() => {
    startTransition(() => {
      localStorage.setItem("selectedLanguage", currentLanguage)
    })
  }, [currentLanguage])

  return (
    <LocalizationContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LocalizationContext.Provider>
  )
}
