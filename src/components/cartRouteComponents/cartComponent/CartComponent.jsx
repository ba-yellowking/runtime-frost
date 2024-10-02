import CartProductList from "../../../ui/cartProductList/CartProductList.jsx";
import "./CartComponent.css";


function CartComponent( {setCurrentComponent, setTotalCount} ) {

  return (

    <div className="cart-menu-container">

      <span className="cart-text">
        Корзина
      </span>

      <CartProductList
        setCurrentComponent={setCurrentComponent}
        setTotalCount={setTotalCount}
      />

    </div>

  )
}

export default CartComponent;