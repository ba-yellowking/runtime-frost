import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import CartRoute from "../ui/cartRoute/CartRoute.jsx";
import {useState} from "react";
import CartComponent from "../components/cartRouteComponents/cartComponent/CartComponent.jsx";
import ContactDetails from "../components/cartRouteComponents/contactDetails/ContactDetails.jsx";
import DeliveryDetails from "../components/cartRouteComponents/deliveryDetails/DeliveryDetails.jsx";
import OrderComplete from "../components/cartRouteComponents/orderComplete/OrderComplete.jsx";
import UserProfile from "../components/userProfile/UserProfile.jsx";
import {useSelector} from "react-redux";

function CartPage() {

  const user = useSelector(state => state.auth.user);

  const totalCount = useSelector((state) => state.counter.counter);

  const [currentComponent, setCurrentComponent] = useState("cart");
  const [orderNumber, setOrderNumber] = useState(null);

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
  const renderContent = function() {

    if (isProfilePage) {
      return <UserProfile/>
    }

    if (currentComponent === "cart") {
      return (
        <CartComponent
          setCurrentComponent={setCurrentComponent}
        />
      )
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
  const [isProfilePage, setIsProfilePage] = useState(false);

  // Для <Header/>
  function openProfilePage() {
    setIsProfilePage(true);
  }

  return (
    <div className="main-page-container">
      {isProfilePage && user ? (
       <UserProfile/>
      ) : (
        <>
          <Header
            openProfilePage={openProfilePage}
            totalCount={totalCount}
          />

          <div className="cart-route">
            <p className="cart-route-text">Оформление заказа</p>

            <CartRoute
              currentComponent={currentComponent}
              setCurrentComponent={setCurrentComponent}
            />
          </div>

          {renderContent()}

          <Footer/>
        </>
      )}
    </div>
  )
}

export default CartPage;