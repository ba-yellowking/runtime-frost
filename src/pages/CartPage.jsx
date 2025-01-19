import Header from "../components/header/Header.jsx"
import Footer from "../components/footer/Footer.jsx"
import CartRoute from "../ui/cartRoute/CartRoute.jsx"
import { useState } from "react"
import CartComponent from "../components/cartRouteComponents/cartComponent/CartComponent.jsx"
import ContactDetails from "../components/cartRouteComponents/contactDetails/ContactDetails.jsx"
import DeliveryDetails from "../components/cartRouteComponents/deliveryDetails/DeliveryDetails.jsx"
import OrderComplete from "../components/cartRouteComponents/orderComplete/OrderComplete.jsx"
import UserProfile from "./UserProfile.jsx"
import { useSelector } from "react-redux"
import { useTranslation } from "../hooks/useTranslation.jsx"

function CartPage() {
  const user = useSelector((state) => state.auth.user)

  const totalCount = useSelector((state) => state.counter.counter)

  const [currentComponent, setCurrentComponent] = useState("cart")
  const [orderNumber, setOrderNumber] = useState(null)

  const [ordersData, setOrdersData] = useState({
    phone: "",
    area: "",
    city: "",
    street: "",
    house: "",
    apartment: "",
  })

  const [errorMessages, setErrorMessages] = useState({
    apartment: "",
    area: "",
    city: "",
    house: "",
    phone: "",
    street: "",
  })

  // См. компонент <CartRoute>
  const renderContent = function () {
    if (isProfilePage) {
      return <UserProfile />
    }

    if (currentComponent === "cart") {
      return <CartComponent setCurrentComponent={setCurrentComponent} />
    } else if (currentComponent === "contacts") {
      return (
        <ContactDetails
          setCurrentComponent={setCurrentComponent}
          ordersData={ordersData}
          setOrdersData={setOrdersData}
          errorMessages={errorMessages}
        />
      )
    } else if (currentComponent === "delivery") {
      return (
        <DeliveryDetails
          setCurrentComponent={setCurrentComponent}
          ordersData={ordersData}
          setOrdersData={setOrdersData}
          setOrderNumber={setOrderNumber}
          errorMessages={errorMessages}
          setErrorMessages={setErrorMessages}
        />
      )
    } else if (currentComponent === "final") {
      return (
        <OrderComplete
          setCurrentComponent={setCurrentComponent}
          ordersData={ordersData}
          setOrdersData={setOrdersData}
          orderNumber={orderNumber}
          setIsProfilePage={setIsProfilePage}
        />
      )
    }
  }

  // Состояние для открытия личного кабинета
  const [isProfilePage, setIsProfilePage] = useState(false)

  // useTranslation.jsx
  const { t } = useTranslation()

  return (
    <div className="main-page-container dark:bg-[#393939]">
      {isProfilePage && user ? (
        <UserProfile />
      ) : (
        <>
          <Header totalCount={totalCount} />

          <div className="cart-route dark:bg-[#393939]">
            <p className="cart-route-text">{t("cartPageHeader")}</p>

            <CartRoute currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} />
          </div>

          {renderContent()}

          <Footer />
        </>
      )}
    </div>
  )
}

export default CartPage
