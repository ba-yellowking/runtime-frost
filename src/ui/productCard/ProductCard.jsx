import React from "react"
import ButtonStandard from "../buttonStandard/ButtonStandard.jsx"
import useModal from "../../hooks/useModal.jsx"
import AddProductModal from "../../components/modals/addProductModal/AddProductModal.jsx"
import "./ProductCard.css"
import { useNavigate } from "react-router-dom"
import engine from "../../images/engine.png"
import engine1 from "../../images/engine1.png"
import engine2 from "../../images/engine2.png"
import engine3 from "../../images/engine3.png"
import engine4 from "../../images/engine4.png"
import { useTranslation } from "../../hooks/useTranslation.jsx"

function ProductCard({ id, name, price }) {
  const navigate = useNavigate()

  // useTranslation.jsx
  const { t } = useTranslation()

  // useModal.jsx
  const [isOpenProductInCartModal, openProductInCartModal, closeProductInCartModal] = useModal()

  const handleClick = () => {
    openProductInCartModal()
  }

  // Transition to <ProductCardPage/>
  function productCard() {
    const path = `/products/${id}`
    navigate(path)
  }

  const imagesArr = {
    0: engine,
    1: engine1,
    2: engine2,
    3: engine3,
    4: engine4,
  }

  const productImage = imagesArr[id] || engine

  return (
    <div className="product-container dark:border-[#393939]">
      <div className="product-wrapper bg-white dark:bg-[#393939]">
        <div className="product-image bg-white dark:bg-[#393939]">
          <img className="engine" src={productImage} alt={name} />
        </div>

        <div
          className="ml-2 cursor-pointer text-[#505050] hover:text-[#1c1c1c] hover:underline dark:text-white"
          onClick={productCard}
        >
          {name}
        </div>

        <div className="product-price-container">
          <div className="product-price dark:text-white">
            <b>{price.toLocaleString("ru-RU")} ₸</b>
          </div>

          <ButtonStandard name={t("buyButton")} clickHandler={handleClick} />
        </div>
      </div>

      <AddProductModal
        isOpen={isOpenProductInCartModal}
        close={closeProductInCartModal}
        newProductName={name}
        newProductPrice={price}
        newProductId={id}
      />
    </div>
  )
}

export default ProductCard
