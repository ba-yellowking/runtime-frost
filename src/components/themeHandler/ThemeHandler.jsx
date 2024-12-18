import { useEffect } from "react"
import { useSelector } from "react-redux"

function ThemeHandler() {
  const theme = useSelector((state) => state.theme.theme)

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [theme])

  return null
}

export default ThemeHandler
