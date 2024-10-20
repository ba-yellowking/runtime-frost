import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileComponent.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Spinner from "../../ui/spinner/Spinner.jsx";


function ProfileComponent() {


  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


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
    setLoading(true);

    axios
      .get("https://frost.runtime.kz/api/orders")
      .then(response => {
        setOrders(response.data);
        setLoading(false);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  return (

    <>

      <Header/>

      <div className="profile-top">
        <p className="profile-top-text">Личный кабинет</p>
      </div>

      {loading ? (

        <>
          <div className="profile-wrap">
            <span className="profile-text">Мои заказы</span>
            <div className="profile-center-spinner">
              <Spinner/>
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

            <div className="empty-orders">
            <span>У Вас нет заказов</span>
            </div>

          )}
        </>
      )}

      <Footer/>

    </>
  );
}


export default ProfileComponent;
