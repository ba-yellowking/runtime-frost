import Modal from "../../ui/modal/Modal.jsx";
import ButtonStandard from "../../ui/buttonStandard/ButtonStandard.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

// Модальное окно при добавлении товара в корзину
// cart/add?productId=...&count=...

function ProductInCartModal({ isOpen, close, newProductName, newProductPrice, newProductId, available }) {

  const [counter, setCounter] = useState(1);

  useEffect(function() {
    if (isOpen) {
      setCounter(1);
    }
  }, [isOpen]);

  function clickHandler() {
    // console.log("Headers:", headers); // Логирование заголовков
    // increase?productId=... (GET) -> 200|404
    // decrease?productId=... (GET) -> 200|404
    axios
      .get(`https://frost.runtime.kz/api/cart/add?productId=${newProductId}&count=${counter}`)
      .then(function(response) {
        console.log("Товар успешно добавлен в корзину", response.data);
      })
      .catch((error) => console.error(error));
    close();
  }

  function increase() {
    setCounter(counter + 1);
  }

  // Жизненный цикл компонента – состояние компонента в определенный момент
  // времени и поведение (функции) способное на это состаяние влиять.

  // Актуальное состояние на момент вызова ассинхронной функции:
  // Например count был 1.

  // Актуальное состояние на момент срабатывания выполнения функции (может
  // сработать как через секунду так ки через 10 секунд):
  // Например count был при вызове функции 1.
  // А стал в момент выполнения 5.

  // ЗАМЫКАНИЕ !!!

  function decrease() {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  }

  return (
    <div className="modal-container">
      <Modal open={isOpen} close={close}>
        <div className="modal-content-top">
          <span>Добавление товара в корзину</span>
        </div>

        <div className="modal-content-center">
          <div className="modal-content-name">
            {newProductName}
          </div>

          <div className="modal-content-quantity">
            <button className="modal-content-button" onClick={decrease}>-</button>
            {counter}
            <button className="modal-content-button" onClick={increase}>+</button>
          </div>

          <div className="modal-content-price">
            {`${(newProductPrice * counter).toLocaleString("ru-RU")} ₸`}
          </div>
        </div>

        <div className="modal-content-bottom">

          {available === 1 ? (
            <ButtonStandard
              name="Оформить заказ"
              style={{width: "400px", height: "40px"}}
              clickHandler={clickHandler}
            />
          ) : (
            <ButtonStandard
              name="Купить"
              style={{width: "400px", height: "40px"}}
              clickHandler={clickHandler}
            />
          )}

          <span className="continue-shopping" onClick={close}>
            Продолжить покупки
          </span>
        </div>
      </Modal>
    </div>
  )
}

export default ProductInCartModal;