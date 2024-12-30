import { useContext, useRef, useState } from "react"
import { APP_LOCALES } from "../../locales/locales.jsx"
import { LocalizationContext } from "../../contexts/localizationContext/LocalizationContext.jsx"
import { useClickOutsideDropDown } from "../../hooks/useClickOutsideDropDown.jsx"

function LocaleDropdown() {
  const { currentLanguage, setCurrentLanguage } = useContext(LocalizationContext)
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = APP_LOCALES.find((locale) => locale.serviceName === currentLanguage)?.displayName || "Language"

  const localeDropdownRef = useRef()
  useClickOutsideDropDown(localeDropdownRef, function () {
    setIsOpen(false)
  })

  function toggleDropdown() {
    setIsOpen(!isOpen)
  }

  function handleOptionClick(serviceName) {
    setCurrentLanguage(serviceName)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        className="h-auto w-[120px] rounded-[5px] bg-gray-200 px-4 py-2 text-[#222222]"
        onClick={toggleDropdown}
        ref={localeDropdownRef}
      >
        {selectedOption}
      </button>

      {isOpen && (
        <ul className="absolute left-0 z-10 mt-2 w-full overflow-hidden rounded-[5px] border border-gray-300 bg-white">
          {APP_LOCALES.filter((locale) => locale.serviceName !== currentLanguage).map((locale) => (
            <li
              key={locale.serviceName}
              onClick={() => handleOptionClick(locale.serviceName)}
              className="cursor-pointer px-4 py-2 text-[#222222] hover:bg-gray-100"
            >
              {locale.displayName}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LocaleDropdown
