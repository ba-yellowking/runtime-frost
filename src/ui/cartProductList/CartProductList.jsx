import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CartProductList.css";
import Spinner from "../spinner/Spinner.jsx";
import ButtonStandard from "../buttonStandard/ButtonStandard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setTotalCount} from "../../slices/counterSlice.jsx"
import {setLoading} from "../../slices/loadingSlice.jsx";

function CartProductList( {setCurrentComponent} ) {

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.loading.isLoading);

  const [cartItems, setCartItems] = useState([]);

  // Запрос на получение товаров, добавленных пользователем в корзину
  useEffect(function () {
    dispatch(setLoading(true));
    axios
      .get("https://frost.runtime.kz/api/cart")
      .then(function (response) {
        setCartItems(response.data.items);

        console.log(response.data.items)

        dispatch(setLoading(false));
      })
      .catch((error) => console.error(error));
  }, []);

  // Вычисление общего количества товаров для иконки корзины
  useEffect(() => {
    const totalItems = cartItems.reduce((total, item) => total + item.count, 0);
    dispatch(setTotalCount(totalItems));
  }, [cartItems]);

  // Запрос на удаление из корзины
  const deleteItem = function(productId) {
    axios
      .get(`https://frost.runtime.kz/api/cart/delete?productId=${productId}`)
      .then(function() {
        // const updatedCartItems = cartItems.filter(function(item) {
        //   return item.product.id !== productId
        // });
        const updatedCartItems = [...cartItems];
        const deleteIndex = updatedCartItems.findIndex(function(item) {
          return item.product.id === productId
        })
        updatedCartItems.splice(deleteIndex, 1);
        setCartItems(updatedCartItems);
      })
      .catch(function(error) {
        console.log(`Ошибка при удалении товара из корзины: ${error}`)
      })
  }

  const totalAmount = cartItems.reduce(function(total, item) {
    return total + item.product.price * item.count
  }, 0)

  const increaseQuantity = function increase(productId) {
    axios
      .get(`https://frost.runtime.kz/api/cart/increase?productId=${productId}`)
      .then(function() {
        const updatedCartItems = [...cartItems];
        for (let i = 0; i < updatedCartItems.length; i++) {
          if (updatedCartItems[i].product.id === productId) {
            updatedCartItems[i].count += 1;
          }
        }
        setCartItems(updatedCartItems)
      })
      .catch((error) => console.error(error));
  }

  const decreaseQuantity = function decrease(productId) {
    axios
      .get(`https://frost.runtime.kz/api/cart/decrease?productId=${productId}`)
      .then(function() {
        let updatedCartItems = [...cartItems];
        for (let i = 0; i < updatedCartItems.length; i++) {
          if (updatedCartItems[i].product.id === productId) {
            if (updatedCartItems[i].count > 1) {
              updatedCartItems[i].count -= 1;
            } else {
              deleteItem(productId)
              return;
            }
          }
        }
        setCartItems(updatedCartItems)
      })
      .catch(function(error) {
        console.log(`Количество не может быть меньше нуля: ${error}`)
      })
  }

  return (
    <>
      {isLoading ? (
        <div className="cart-product-list-center-spinner">
          <Spinner/>
        </div>
      ) : (
        <>
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
                      <button className="cart-item-btn"
                              onClick={function() {
                                decreaseQuantity(item.product.id)
                              }}
                      >-</button>

                      {item.count}

                      <button className="cart-item-btn"
                              onClick={function() {
                                increaseQuantity(item.product.id)
                              }}
                      >+</button>
                    </div>
                    <div className="cart-item-column">{(item.product.price * item.count).toLocaleString("ru-RU")} ₸</div>
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
                  style={{marginTop: "10px", width: "200px"}}
                  clickHandler={function() {
                    setCurrentComponent("contacts");
                  }}
                />
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <span>Корзина пуста.
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
