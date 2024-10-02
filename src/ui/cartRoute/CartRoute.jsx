import "./CartRoute.css";


function CartRoute({ currentComponent, setCurrentComponent }) {


  function handleCurrentComponent(component) {

    const cartRouteArr = ["cart", "contacts", "delivery", "final"];
    const currentStep = cartRouteArr.indexOf(currentComponent);
    const previousStep = cartRouteArr.indexOf(component);

    if (previousStep <= currentStep && currentStep !== 3) {
      setCurrentComponent(component)
    }

  }


  return (

    <div className="route-container">

      <div
        className={`route-cart ${currentComponent === "cart" ? "activeRoute" : ""}`}
        onClick={function() {
          handleCurrentComponent("cart");
        }}
      >
        <span>Корзина</span>
      </div>


      <div
        className={`route-contacts ${currentComponent === "contacts" ? "activeRoute" : ""}`}
        onClick={function() {
          handleCurrentComponent("contacts");
        }}
      >
        <span>Контакты</span>
      </div>


      <div
        className={`route-delivery ${currentComponent === "delivery" ? "activeRoute" : ""}`}
        onClick={function() {
          handleCurrentComponent("delivery");
        }}
      >
        <span>Доставка</span>
      </div>


      <div
        className={`route-final ${currentComponent === "final" ? "activeRoute" : ""}`}
        onClick={function() {
          handleCurrentComponent("final");
        }}
      >
        <span>Завершение</span>
      </div>

    </div>
  )
}

export default CartRoute;