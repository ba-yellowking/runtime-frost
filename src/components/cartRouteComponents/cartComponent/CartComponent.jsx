import CartProductList from "../../../ui/cartProductList/CartProductList.jsx";
import "./CartComponent.css";

function CartComponent( {setCurrentComponent} ) {

  return (
    <div className="cart-menu-container">
      <CartProductList setCurrentComponent={setCurrentComponent}/>
    </div>
  )
}

export default CartComponent;