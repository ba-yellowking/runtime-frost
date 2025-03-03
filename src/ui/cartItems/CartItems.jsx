import React, { useEffect } from "react"
import "./CartItems.css"
import Spinner from "../spinner/Spinner.jsx"
import ButtonStandard from "../buttonStandard/ButtonStandard.jsx"
import { useDispatch, useSelector } from "react-redux"
import { setTotalCount } from "../../slices/counterSlice.jsx"
import { setLoading } from "../../slices/loadingSlice.jsx"
import { decreaseCartItems, deleteCartItems, fetchCartItems, increaseCartItems } from "../../slices/cartSlice.jsx"
import { useTranslation } from "../../hooks/useTranslation.jsx"

function CartItems({ setCurrentComponent }) {
  const dispatch = useDispatch()

  const isLoading = useSelector((state) => state.loading.isLoading)
  const cartItems = useSelector((state) => state.cart.cartItems)

  // fetching all cart items
  useEffect(
    function () {
      dispatch(fetchCartItems())
        .then(() => dispatch(setLoading(false)))
        .catch((error) => {
          console.error(error)
          dispatch(setLoading(false))
        })
    },
    [dispatch]
  )

  // total number of cart items
  useEffect(() => {
    const totalItems = cartItems.reduce((total, item) => total + item.count, 0)
    dispatch(setTotalCount(totalItems))
  }, [dispatch])

  // deleting an item from cart
  const deleteItem = function (productId) {
    dispatch(deleteCartItems(productId))
  }

  // total number of cart items
  const totalAmount = cartItems.reduce(function (total, item) {
    return total + item.product.price * item.count
  }, 0)

  // increasing the quantity of items in cart
  const increaseQuantity = function increase(productId) {
    dispatch(increaseCartItems(productId))
  }

  // decreasing the quantity of items in cart
  const decreaseQuantity = function decrease(productId) {
    dispatch(decreaseCartItems(productId))
  }

  // useTranslation.jsx
  const { t } = useTranslation()

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner-container__wrap">
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          <span className="cart__header">{t("cartItemsCart")}</span>
          {cartItems.length > 0 ? (
            <>
              <div className="cart-item__header dark:bg-[#393939]">
                <div className="cart-item__th">{t("cartItemsItem")}</div>
                <div className="cart-item__th">{t("cartItemsQuantity")}</div>
                <div className="cart-item__th">{t("cartItemsPrice")}</div>
              </div>

              <div className="cart-item__body">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.product.id}>
                    <div className="cart-item__column">
                      <div className="cart-item__name">{item.product.name}</div>

                      <div className="cart-item__info">
                        <div className="cart-item__number">
                          {t("cartItemsItemNo")} {item.product.code}
                        </div>

                        <div
                          className="cart-item__delete"
                          onClick={function () {
                            deleteItem(item.product.id)
                          }}
                        >
                          {t("cartItemsRemoveItem")}
                        </div>
                      </div>
                    </div>

                    <div className="cart-item__column">
                      <button className="cart-item__button" onClick={() => decreaseQuantity(item.product.id)}>
                        –
                      </button>

                      {item.count}

                      <button className="cart-item__button" onClick={() => increaseQuantity(item.product.id)}>
                        +
                      </button>
                    </div>
                    <div className="cart-item__column">
                      {(item.product.price * item.count).toLocaleString("ru-RU")} ₸
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-item__footer dark:bg-[#393939]">
                <div className="cart-item__summary">{t("cartItemsTotalPrice")}</div>
                <div className="cart-item__summary"></div>
                <div className="cart-item__summary">{totalAmount.toLocaleString("ru-RU")} ₸</div>
              </div>

              <div className="cart-details__button">
                <ButtonStandard
                  name={t("cartItemsConfirmButton")}
                  className="cartProductList"
                  clickHandler={() => setCurrentComponent("contacts")}
                />
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <span>
                {t("cartItemsEmpty")}
                <a href="/" className="profile__empty--add">
                  {t("cartItemsAddItems")}
                </a>
              </span>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default CartItems
