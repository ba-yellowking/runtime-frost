import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileComponent.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Spinner from "../../ui/spinner/Spinner.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../slices/loadingSlice.jsx";

function ProfileComponent() {

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);

  const [orders, setOrders] = useState([]);

  function dateFormatting(date) {
    return new Date(date).toLocaleString("ru-RU", {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  useEffect(function() {
    dispatch(setLoading(true));

    axios
      .get("https://frost.runtime.kz/api/orders")

      .then(response => {
        setOrders(response.data);
        dispatch(setLoading(false));
      })

      .catch(error => {
        console.log(error);
        dispatch(setLoading(false));
      });
  }, []);

  return (
    <>
      <Header/>

      <div className="profile-top">
        <p className="profile-top-text">Личный кабинет</p>
      </div>

      {isLoading ? (
        <>
          <div className="profile-wrap">
            <div className="spinner-container">
              <div className="spinner-wrapper">
                <Spinner/>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {orders.length > 0 ? (
            <div className="profile-wrap">
              <span className="profile-text">Мои заказы</span>

              <div className="profile-header">
                <div className="profile-header-item">Номер заказа</div>
                <div className="profile-header-item">Наименование товара</div>
                <div className="profile-header-item">Количество</div>
                <div className="profile-header-item">Стоимость</div>
                <div className="profile-header-item">Дата заказа</div>
              </div>

              <div className="profile-body">
                {orders.map(function (order) {
                  return order.items.map(function (item, index) {
                    return (
                      <div className="profile-item" key={index}>

                        <div className="profile-item-column">
                          {order.id}
                        </div>

                        <div className="profile-item-column">
                          {item.product.name}
                        </div>

                        <div className="profile-item-column">
                          {item.count}
                        </div>

                        <div className="profile-item-column">
                          {(item.count * item.product.price).toLocaleString("ru-RU")} тг.
                        </div>

                        <div className="profile-item-column">
                          {dateFormatting(order.created_at)}
                        </div>
                      </div>
                    )
                  })
                })}
              </div>
            </div>
          ) : (
            <div className="cart-menu-container">
              <span className="profile-text">Мои заказы</span>
              <div className="empty-orders">
                <span>У Вас еще нет заказов.
                  <a href="/" className="empty-cart-add-products">Добавить товары</a>
                </span>
              </div>
            </div>
          )}
        </>
      )}

      <Footer/>
    </>
  );
}

export default ProfileComponent;
