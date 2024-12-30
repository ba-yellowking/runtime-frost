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
    <div className="route-container">
      <div
        className={`route-cart ${currentComponent === "cart" ? "activeRoute" : ""}`}
        onClick={function () {
          handleCurrentComponent("cart")
        }}
      >
        <span>{t("cartRouteCart")}</span>
      </div>

      <div
        className={`route-contacts ${currentComponent === "contacts" ? "activeRoute" : ""}`}
        onClick={function () {
          handleCurrentComponent("contacts")
        }}
      >
        <span>{t("cartRouteContacts")}</span>
      </div>

      <div
        className={`route-delivery ${currentComponent === "delivery" ? "activeRoute" : ""}`}
        onClick={function () {
          handleCurrentComponent("delivery")
        }}
      >
        <span>{t("cartRouteDelivery")}</span>
      </div>

      <div
        className={`route-final ${currentComponent === "final" ? "activeRoute" : ""}`}
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
