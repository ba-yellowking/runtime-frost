import { useContext } from "react"
import { LocalizationContext } from "../contexts/localizationContext/LocalizationContext"
import { translate } from "../locales/locales.jsx"

export function useTranslation() {
  const { currentLanguage } = useContext(LocalizationContext)

  return {
    t: (key) => translate(currentLanguage, key),
  }
}
