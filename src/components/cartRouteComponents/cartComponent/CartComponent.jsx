import CartItems from "../../../ui/cartItems/CartItems.jsx"
import "./CartComponent.css"

function CartComponent({ setCurrentComponent }) {
  return (
    <div className="cart-menu-container dark:border-[#252525] dark:bg-[#252525]">
      <CartItems setCurrentComponent={setCurrentComponent} />
    </div>
  )
}

export default CartComponent
