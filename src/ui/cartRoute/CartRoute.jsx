import "./CartRoute.css"
import { useTranslation } from "../../hooks/useTranslation.jsx"

function CartRoute({ currentComponent, setCurrentComponent }) {
  function handleCurrentComponent(component) {
    const cartRouteArr = ["cart", "contacts", "delivery", "final"]
    const currentStep = cartRouteArr.indexOf(currentComponent)
    const previousStep = cartRouteArr.indexOf(component)

    if (previousStep <= currentStep && currentStep !== 3) {
      setCurrentComponent(component)
    }
  }

  // useTranslation.jsx
  const { t } = useTranslation()

  return (
    <div className="route dark:border-[#252525]">
      <div
        className={`route-cart dark:bg-[#252525] ${currentComponent === "cart" ? "activeRoute dark:text-white" : "dark:text-[#393939]"}`}
        onClick={function () {
          handleCurrentComponent("cart")
        }}
      >
        <span>{t("cartRouteCart")}</span>
      </div>

      <div
        className={`route-contacts dark:bg-[#252525] ${currentComponent === "contacts" ? "activeRoute dark:text-white" : "dark:text-[#393939]"}`}
        onClick={function () {
          handleCurrentComponent("contacts")
        }}
      >
        <span>{t("cartRouteContacts")}</span>
      </div>

      <div
        className={`route-delivery dark:bg-[#252525] ${currentComponent === "delivery" ? "activeRoute dark:text-white" : "dark:text-[#393939]"}`}
        onClick={function () {
          handleCurrentComponent("delivery")
        }}
      >
        <span>{t("cartRouteDelivery")}</span>
      </div>

      <div
        className={`route-completed dark:bg-[#252525] ${currentComponent === "final" ? "activeRoute dark:text-white" : "dark:text-[#393939]"}`}
        onClick={function () {
          handleCurrentComponent("final")
        }}
      >
        <span>{t("cartRouteComplete")}</span>
      </div>
    </div>
  )
}

export default CartRoute
