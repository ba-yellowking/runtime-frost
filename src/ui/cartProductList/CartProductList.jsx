import React, { useEffect } from "react";
import "./CartProductList.css";
import Spinner from "../spinner/Spinner.jsx";
import ButtonStandard from "../buttonStandard/ButtonStandard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setTotalCount} from "../../slices/counterSlice.jsx"
import {setLoading} from "../../slices/loadingSlice.jsx";
import {decreaseCartItems, deleteCartItems, fetchCartItems, increaseCartItems} from "../../slices/cartSlice.jsx";

function CartProductList( {setCurrentComponent} ) {

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.loading.isLoading);
  const cartItems = useSelector(state => state.cart.cartItems);

  // fetching all cart items
  useEffect(function () {
    dispatch(fetchCartItems())
      .then(() => dispatch(setLoading(false)))
      .catch((error) => {
        console.error(error);
        dispatch(setLoading(false));
      })
  }, [dispatch]);

  // total number of cart items
  useEffect(() => {
    const totalItems = cartItems.reduce((total, item) => total + item.count, 0);
    dispatch(setTotalCount(totalItems));
  }, [dispatch]);

  // deleting an item from cart
  const deleteItem = function(productId) {
    dispatch(deleteCartItems(productId));
  }

  // total number of cart items
  const totalAmount = cartItems.reduce(function(total, item) {
    return total + item.product.price * item.count
  }, 0)

  // increasing the quantity of items in cart
  const increaseQuantity = function increase(productId) {
    dispatch(increaseCartItems(productId));
  }

  // decreasing the quantity of items in cart
  const decreaseQuantity = function decrease(productId) {
    dispatch(decreaseCartItems(productId));
  }

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner-wrapper">
            <Spinner/>
          </div>
        </div>
      ) : (
        <>
          <span className="cart-text">Корзина</span>
          {cartItems.length > 0 ? (
            <>
              <div className="cart-header">
                <div className="cart-header-item title">Наименование товара</div>
                <div className="cart-header-item">Количество</div>
                <div className="cart-header-item">Цена</div>
              </div>

              <div className="cart-body">
                {cartItems.map(item => (
                  <div className="cart-item" key={item.product.id}>
                    <div className="cart-item-column">
                      <div className="cart-item-detail">{item.product.name}</div>

                      <div className="cart-item-bottom">
                        <div className="cart-item-number">Артикул: {item.product.code}</div>

                        <div
                          className="cart-item-delete"
                          onClick={function () {
                            deleteItem(item.product.id)
                          }}
                        >
                          Удалить из корзины
                        </div>
                      </div>
                    </div>

                    <div className="cart-item-column">
                      <button
                        className="cart-item-btn"
                        onClick={() => decreaseQuantity(item.product.id)}
                      >-</button>

                      {item.count}

                      <button
                        className="cart-item-btn"
                        onClick={() => increaseQuantity(item.product.id)}
                      >+</button>
                    </div>
                    <div className="cart-item-column">
                      {(item.product.price * item.count).toLocaleString("ru-RU")} ₸
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-footer-item">Итого к оплате:</div>
                <div className="cart-footer-item"></div>
                <div className="cart-footer-item">{totalAmount.toLocaleString("ru-RU")} ₸</div>
              </div>

              <div className="cart-button-container">
                <ButtonStandard
                  name="Оформить заказ"
                  className="cartProductList"
                  clickHandler={() => setCurrentComponent("contacts")}
                />
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <span>Ваша корзина пуста.
                <a href="/" className="empty-cart-add-products">Добавить товары</a>
              </span>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default CartProductList;
