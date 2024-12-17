import CartItems from "../../../ui/cartItems/CartItems.jsx"
import "./CartComponent.css"

function CartComponent({ setCurrentComponent }) {
  return (
    <div className="cart-menu-container">
      <CartItems setCurrentComponent={setCurrentComponent} />
    </div>
  )
}

export default CartComponent
