import { useEffect } from "react"

export function useClickOutsideDropDown(ref, callback) {
  useEffect(() => {
    function clickOutsideHandler(event) {
      if (ref.current !== event.target) {
        callback()
      }
    }
    document.addEventListener("click", clickOutsideHandler)
    return function () {
      document.removeEventListener("click", clickOutsideHandler)
    }
  }, [])
}
