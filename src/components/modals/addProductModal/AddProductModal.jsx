import Modal from "../../../ui/modal/Modal.jsx"
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard.jsx"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import "./AddProductModal.css"
import { useTranslation } from "../../../hooks/useTranslation.jsx"

// Модальное окно при добавлении товара в корзину
// cart/add?productId=...&count=...

function AddProductModal({ isOpen, close, newProductName, newProductPrice, newProductId }) {
  const user = useSelector((state) => state.auth.user)
  const [counter, setCounter] = useState(1)

  // useTranslation.jsx
  const { t } = useTranslation()

  useEffect(
    function () {
      if (isOpen) {
        setCounter(1)
      }
    },
    [isOpen]
  )

  function clickHandler() {
    // console.log("Headers:", headers); // Логирование заголовков
    // increase?productId=... (GET) -> 200|404
    // decrease?productId=... (GET) -> 200|404
    axios
      .get(`https://frost.runtime.kz/api/cart/add?productId=${newProductId}&count=${counter}`)
      .then(function (response) {
        console.log(response.data)
      })
      .catch((error) => console.error(error))
    close()
  }

  function increase() {
    setCounter(counter + 1)
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
    if (counter > 1) {
      setCounter(counter - 1)
    }
  }

  return (
    <div className="modal-containe">
      <Modal open={isOpen} close={close}>
        <div className="modal-content-top dark:bg-[#252525]">
          <span>{t("addProductAddingToCart")}</span>
        </div>

        <div className="modal-content-center dark:bg-[#252525]">
          <div className="modal-content-name">{newProductName}</div>

          <div className="modal-content-quantity">
            <button className="modal-content-button dark:bg-[#252525]" onClick={decrease}>
              -
            </button>
            {counter}
            <button className="modal-content-button dark:bg-[#252525]" onClick={increase}>
              +
            </button>
          </div>

          <div className="modal-content-price">{`${(newProductPrice * counter).toLocaleString("ru-RU")} ₸`}</div>
        </div>

        <div className="modal-content-bottom dark:bg-[#252525]">
          <ButtonStandard
            name={t("addToCartButton")}
            className="productInCartModal"
            clickHandler={clickHandler}
            isDisabled={!user}
          />

          <span className="continue-shopping dark:text-white" onClick={close}>
            {t("addProductContinueShopping")}
          </span>
        </div>
      </Modal>
    </div>
  )
}

export default AddProductModal
